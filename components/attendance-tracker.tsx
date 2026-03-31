'use client';

import { useState, useEffect } from 'react';
import { QrCode, CheckCircle, Clock, XCircle, RefreshCw, AlertCircle, Users } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { interactionApi } from '@/lib/interaction-api';
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

interface EventRegistration {
  id: string;
  userEmail: string;
  userName: string;
  userRole: string;
  registeredAt: string;
}

export function AttendanceTracker() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [activeTab, setActiveTab] = useState<'registrations' | 'attendance'>('registrations');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alumniId, setAlumniId] = useState('');

  useEffect(() => { loadEvents(); }, []);

  useEffect(() => {
    if (selectedEvent) {
      loadAttendance();
      loadRegistrations();
    }
  }, [selectedEvent]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getAllEvents();
      setEvents(response.data || []);
    } catch (err) {
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

  const loadRegistrations = async () => {
    if (!selectedEvent) return;
    try {
      const response = await interactionApi.getEventRegistrations(selectedEvent);
      setRegistrations(response.data || []);
    } catch (err) {
      console.error('Failed to load registrations:', err);
    }
  };

  const handleRegister = async () => {
    if (!selectedEvent || !alumniId) return;
    try {
      await apiClient.registerForEvent(selectedEvent, alumniId);
      setAlumniId('');
      loadAttendance();
    } catch (err) {
      alert('Failed to register alumni for event');
    }
  };

  const handleCheckIn = async (alumniId: string) => {
    if (!selectedEvent) return;
    try {
      await apiClient.markAttendance(selectedEvent, alumniId);
      loadAttendance();
    } catch (err) {
      alert('Failed to mark attendance');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <RefreshCw className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
        <AlertCircle className="w-5 h-5 text-red-600 mb-2" />
        <p className="text-red-700 text-sm mb-3">{error}</p>
        <button onClick={loadEvents} className="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Retry</button>
      </div>
    </div>
  );

  const attendedCount = attendanceRecords.filter(r => r.status === 'ATTENDED').length;
  const pendingCount = attendanceRecords.filter(r => r.status === 'REGISTERED' || r.status === 'CONFIRMED').length;
  const noShowCount = attendanceRecords.filter(r => r.status === 'NO_SHOW').length;
  const studentCount = registrations.filter(r => r.userRole === 'STUDENT').length;
  const alumniCount = registrations.filter(r => r.userRole === 'ALUMNI').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Event Attendance</h1>
        <p className="text-gray-600">Track registrations & attendance</p>
      </div>

      {/* Event Selection */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Event</label>
        <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">-- Choose an Event --</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>
              {event.title} - {new Date(event.eventDate || (event as any).date).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      {selectedEvent && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-blue-200 p-4">
              <p className="text-gray-600 text-sm font-medium">Total Registered</p>
              <p className="text-2xl font-bold mt-1">{registrations.length}</p>
              <p className="text-xs text-gray-400 mt-1">{studentCount} students · {alumniCount} alumni</p>
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

          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200">
            {(['registrations', 'attendance'] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors capitalize ${
                  activeTab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}>
                {t === 'registrations' ? `Registrations (${registrations.length})` : `Attendance (${attendanceRecords.length})`}
              </button>
            ))}
          </div>

          {/* Registrations Tab */}
          {activeTab === 'registrations' && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold text-gray-900">Registered Users</h2>
              </div>
              {registrations.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No registrations yet for this event</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Registered At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {registrations.map(reg => (
                        <tr key={reg.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{reg.userName}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{reg.userEmail}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                              reg.userRole === 'STUDENT' ? 'bg-violet-100 text-violet-700' : 'bg-emerald-100 text-emerald-700'
                            }`}>{reg.userRole}</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(reg.registeredAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
            <>
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                <div className="flex items-start gap-3 mb-4">
                  <QrCode className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900">Manual Check-In</h2>
                    <p className="text-sm text-blue-800">Enter alumni ID to check someone in</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <input type="text" placeholder="Enter Alumni ID..."
                    value={alumniId} onChange={(e) => setAlumniId(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
                    className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                  <button onClick={handleRegister}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                    Check In
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">Attendance List</h2>
                </div>
                {attendanceRecords.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No attendance records for this event</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
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
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{reg.alumniName}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{new Date(reg.registeredAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                reg.status === 'ATTENDED' ? 'bg-green-100 text-green-800' :
                                reg.status === 'NO_SHOW' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>{reg.status}</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {reg.checkedInAt ? new Date(reg.checkedInAt).toLocaleTimeString() : '-'}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {reg.status !== 'ATTENDED' && (
                                <button onClick={() => handleCheckIn(reg.alumniId)}
                                  className="text-green-600 hover:text-green-800 font-medium text-sm">
                                  Check In
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}

      {!selectedEvent && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <QrCode className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="text-gray-600 text-lg">Select an event to view registrations</p>
        </div>
      )}
    </div>
  );
}
