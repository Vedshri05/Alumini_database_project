'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { apiClient } from '@/lib/api-client';
import { Alumni, Event, ENGINEERING_BRANCHES } from '@/lib/types';

export function AnalyticsReports() {
  const [stats, setStats] = useState<any>(null);
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [alumniResponse, eventsResponse, alumniStatsResponse, eventStatsResponse] = await Promise.all([
        apiClient.getAllAlumni(),
        apiClient.getAllEvents(),
        apiClient.getAlumniStatistics(),
        apiClient.getEventStatistics(),
      ]);

      setAlumni(alumniResponse.data || []);
      setEvents(eventsResponse.data || []);
      
      setStats({
        totalAlumni: alumniStatsResponse.data?.totalAlumni || 0,
        totalEvents: eventStatsResponse.data?.totalEvents || 0,
        upcomingEvents: eventStatsResponse.data?.upcomingEvents || 0,
        attendanceRate: eventStatsResponse.data?.averageAttendanceRate || 0,
        branchBreakdown: alumniStatsResponse.data?.branchBreakdown || {},
        yearBreakdown: alumniStatsResponse.data?.yearBreakdown || {},
        departmentBreakdown: alumniStatsResponse.data?.branchBreakdown || {},
      });
    } catch (err) {
      console.error('Failed to load analytics data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  // Prepare chart data
  const branchData = Object.entries(stats.branchBreakdown || {}).map(([code, value]) => ({
    name: `${code} - ${ENGINEERING_BRANCHES[code as keyof typeof ENGINEERING_BRANCHES]}`,
    value,
    code,
  }));

  const yearData = Object.entries(stats.yearBreakdown)
    .sort((a: any, b: any) => a[0] - b[0])
    .map(([year, count]) => ({
      year,
      count,
    }));

  const eventTypeData = events.reduce((acc: any, event) => {
    const existing = acc.find((e: any) => e.name === event.eventType);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: event.eventType, count: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

  const locationData = alumni.reduce((acc: any, alumnus) => {
    const location = alumnus.location || 'Not Specified';
    const existing = acc.find((l: any) => l.location === location);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ location, count: 1 });
    }
    return acc;
  }, []).sort((a: any, b: any) => b.count - a.count).slice(0, 8);

  const departmentData = Object.entries(stats.departmentBreakdown || {}).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="text-gray-600">Data visualization and insights</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Total Alumni</p>
          <p className="text-3xl font-bold mt-2">{stats.totalAlumni}</p>
          <p className="text-xs text-gray-500 mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Events Created</p>
          <p className="text-3xl font-bold mt-2">{stats.totalEvents}</p>
          <p className="text-xs text-gray-500 mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Upcoming Events</p>
          <p className="text-3xl font-bold mt-2">{stats.upcomingEvents}</p>
          <p className="text-xs text-gray-500 mt-2">Next 30 days</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Avg Attendance</p>
          <p className="text-3xl font-bold mt-2">{Math.round(stats.attendanceRate)}%</p>
          <p className="text-xs text-gray-500 mt-2">Overall rate</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch Breakdown */}
        {branchData.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Alumni by Engineering Branch</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={branchData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {branchData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Graduation Year Trend */}
        {yearData.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Alumni Distribution by Year</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" name="Alumni Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Event Type Distribution */}
        {eventTypeData.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Events by Type</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={eventTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ef4444" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Location Distribution */}
        {locationData.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Top Locations</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="location" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" name="Alumni" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Detailed Statistics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-gray-600 text-sm">Active Alumni</p>
            <p className="text-2xl font-bold mt-1">{stats.totalAlumni}</p>
          </div>
          <div className="border-l-4 border-green-600 pl-4">
            <p className="text-gray-600 text-sm">Engineering Branches</p>
            <p className="text-2xl font-bold mt-1">{Object.keys(stats.branchBreakdown || {}).length}</p>
          </div>
          <div className="border-l-4 border-purple-600 pl-4">
            <p className="text-gray-600 text-sm">Graduation Years Represented</p>
            <p className="text-2xl font-bold mt-1">{Object.keys(stats.yearBreakdown).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
