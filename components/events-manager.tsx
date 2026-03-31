'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, MapPin, Users, RefreshCw, AlertCircle } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { Event } from '@/lib/types';

export function EventsManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'REUNION' as const,
    date: '',
    startTime: '10:00',
    endTime: '12:00',
    location: '',
    capacity: '',
  });
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getAllEvents();
      setEvents(response.data || []);
    } catch (err) {
      console.error('Failed to load events:', err);
      setError('Failed to load events data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Combine date and startTime into a single ISO datetime string
      const eventDateTime = `${formData.date}T${formData.startTime}:00`;
      
      const newEvent = {
        title: formData.title,
        description: formData.description,
        eventType: formData.eventType,
        eventDate: eventDateTime,
        location: formData.location,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        status: 'DRAFT',
      };

      const response = await apiClient.createEvent(newEvent);
      setEvents([...events, response.data]);
      setFormData({
        title: '',
        description: '',
        eventType: 'REUNION',
        date: '',
        startTime: '10:00',
        endTime: '12:00',
        location: '',
        capacity: '',
      });
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create event:', err);
      alert(`Failed to create event: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      await apiClient.deleteEvent(id);
      setEvents(events.filter(e => e.id !== id));
    } catch (err) {
      console.error('Failed to delete event:', err);
      alert('Failed to delete event');
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const event = events.find(e => e.id === id);
      if (!event) return;
      await apiClient.updateEvent(id, {
        title: event.title,
        description: event.description,
        eventDate: event.eventDate || event.date,
        eventType: event.eventType,
        location: event.location,
        capacity: event.capacity,
        status,
      });
      setEvents(events.map(e => (e.id === id ? { ...e, status } : e)));
    } catch (err) {
      console.error('Failed to update event status:', err);
      alert('Failed to update event status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error Loading Data</h3>
              <p className="text-red-700 text-sm mb-3">{error}</p>
              <button
                onClick={loadEvents}
                className="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const upcomingEvents = events.filter(e => new Date(e.eventDate || e.date) > new Date()).sort((a, b) => 
    new Date(a.eventDate || a.date).getTime() - new Date(b.eventDate || b.date).getTime()
  );

  const pastEvents = events.filter(e => new Date(e.eventDate || e.date) <= new Date()).sort((a, b) => 
    new Date(b.eventDate || b.date).getTime() - new Date(a.eventDate || a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Events</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </button>
      </div>

      {/* Create Event Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Event Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value as any })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="REUNION">Reunion</option>
                <option value="WORKSHOP">Workshop</option>
                <option value="WEBINAR">Webinar</option>
                <option value="NETWORKING">Networking</option>
                <option value="SEMINAR">Seminar</option>
              </select>
            </div>

            <textarea
              placeholder="Event Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Capacity"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Create Event
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events Grid */}
      <div className="space-y-6">
        {upcomingEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-sm text-blue-600 capitalize">{event.eventType}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.eventDate || event.date).toLocaleDateString()} • {event.startTime}-{event.endTime}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="w-4 h-4" />
                      <span>{event.registeredCount}{event.capacity ? `/${event.capacity}` : ''} registered</span>
                    </div>
                  </div>

                  <select
                    value={event.status}
                    onChange={(e) => handleStatusChange(event.id, e.target.value as Event['status'])}
                    className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ONGOING">Ongoing</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {pastEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-75">
              {pastEvents.map(event => (
                <div key={event.id} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{new Date(event.eventDate || event.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{event.description}</p>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {events.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-600 text-lg">No events created yet</p>
            <p className="text-gray-500">Create your first event to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
