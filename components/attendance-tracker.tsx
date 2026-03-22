'use client';

import { useState, useEffect } from 'react';
import { QrCode, CheckCircle, Clock, XCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { Event } from '@/lib/types';

interface AttendanceRecord {
  id: string;
  eventId: string;
  alumniId: string;
  alumniName: string;
  status: string;
  registeredAt: string;
  checkedInAt?: string;
}

export function AttendanceTracker() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alumniId, setAlumniId] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      loadAttendance();
    }
  }, [selectedEvent]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getUpcomingEvents();
      setEvents(response.data || []);
    } catch (err) {
      console.error('Failed to load events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const loadAttendance = async () => {
    if (!selectedEvent) return;
    
    try {
      const response = await apiClient.getEventAttendance(selectedEvent);
      setAttendanceRecords(response.data || []);
    } catch (err) {
      console.error('Failed to load attendance:', err);
    }
  };

  const handleRegister = async () => {
    if (!selectedEvent || !alumniId) return;

    try {
      await apiClient.registerForEvent(selectedEvent, alumniId);
      setAlumniId('');
      loadAttendance();
    } catch (err) {
      console.error('Failed to register:', err);
      alert('Failed to register alumni for event');
    }
  };

  const handleCheckIn = async (alumniId: string) => {
    if (!selectedEvent) return;

    try {
      await apiClient.markAttendance(selectedEvent, alumniId);
      loadAttendance();
    } catch (err) {
      console.error('Failed to check in:', err);
      alert('Failed to mark attendance');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading attendance tracker...</p>
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

  const attendedCount = attendanceRecords.filter(r => r.status === 'attended').length;
  const pendingCount = attendanceRecords.filter(r => r.status === 'registered' || r.status === 'confirmed').length;
  const noShowCount = attendanceRecords.filter(r => r.status === 'no-show').length;

  const selectedEventData = events.find(e => e.id === selectedEvent);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Event Attendance</h1>
        <p className="text-gray-600">Track alumni attendance</p>
      </div>

      {/* Event Selection */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Event</label>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Choose an Event --</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>
              {event.title} - {new Date(event.date).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      {selectedEvent && selectedEventData && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-gray-600 text-sm font-medium">Total Registered</p>
              <p className="text-2xl font-bold mt-2">{attendanceRecords.length}</p>
            </div>
            <div className="bg-white rounded-lg border border-green-200 p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-gray-600 text-sm font-medium">Attended</p>
                  <p className="text-2xl font-bold">{attendedCount}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-yellow-200 p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-gray-600 text-sm font-medium">Pending</p>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-red-200 p-4">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-gray-600 text-sm font-medium">No-Show</p>
                  <p className="text-2xl font-bold">{noShowCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Manual Check-In */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
            <div className="flex items-start gap-3 mb-4">
              <QrCode className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-blue-900">Manual Check-In</h2>
                <p className="text-sm text-blue-800">Scan QR code or enter alumni ID to check someone in</p>
              </div>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter Alumni ID or scan QR code..."
                value={alumniId}
                onChange={(e) => setAlumniId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
                className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <button
                onClick={handleRegister}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Check In
              </button>
            </div>
          </div>

          {/* Attendees List */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Attendance List</h2>
            </div>
            {attendanceRecords.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Alumni ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Alumni Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Registered</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Checked In</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {attendanceRecords.map(reg => (
                      <tr key={reg.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{reg.alumniId}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{reg.alumniName}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(reg.registeredAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            reg.status === 'attended' ? 'bg-green-100 text-green-800' :
                            reg.status === 'no-show' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {reg.checkedInAt ? new Date(reg.checkedInAt).toLocaleTimeString() : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {reg.status !== 'attended' && (
                              <button
                                onClick={() => handleCheckIn(reg.alumniId)}
                                className="text-green-600 hover:text-green-800 font-medium text-sm"
                              >
                                Check In
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No registrations for this event</p>
              </div>
            )}
          </div>
        </>
      )}

      {!selectedEvent && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <QrCode className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="text-gray-600 text-lg">Select an event to view attendance</p>
        </div>
      )}
    </div>
  );
}
