'use client';

import { useEffect, useState } from 'react';
import { Users, Calendar, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { ENGINEERING_BRANCHES } from '@/lib/types';

interface DashboardStats {
  totalAlumni: number;
  totalEvents: number;
  upcomingEvents: number;
  attendanceRate: number;
  branchBreakdown: Record<string, number>;
  yearBreakdown: Record<string, number>;
}

export function DashboardView() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch statistics from API
      const [alumniStats, eventStats] = await Promise.all([
        apiClient.getAlumniStatistics(),
        apiClient.getEventStatistics(),
      ]);

      setStats({
        totalAlumni: alumniStats.data?.totalAlumni || 0,
        totalEvents: eventStats.data?.totalEvents || 0,
        upcomingEvents: eventStats.data?.upcomingEvents || 0,
        attendanceRate: eventStats.data?.averageAttendanceRate || 0,
        branchBreakdown: alumniStats.data?.branchBreakdown || {},
        yearBreakdown: alumniStats.data?.yearBreakdown || {},
      });
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError('Failed to load dashboard data. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
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
              <h3 className="font-semibold text-red-900 mb-1">Connection Error</h3>
              <p className="text-red-700 text-sm mb-3">{error}</p>
              <button
                onClick={loadDashboardData}
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

  if (!stats) {
    return <div className="text-center py-8">No data available</div>;
  }

  const statCards = [
    {
      label: 'Total Alumni',
      value: stats.totalAlumni,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Total Events',
      value: stats.totalEvents,
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Attendance Rate',
      value: `${Math.round(stats.attendanceRate)}%`,
      icon: CheckCircle,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Overview of your alumni network</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{card.label}</p>
                  <p className="text-3xl font-bold mt-2">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Branch Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Alumni by Engineering Branch</h2>
          <div className="space-y-3">
            {Object.entries(stats.branchBreakdown).length > 0 ? (
              Object.entries(stats.branchBreakdown).map(([branch, count]: [string, any]) => (
                <div key={branch} className="flex items-center justify-between">
                  <span className="text-gray-700">
                    <span className="font-semibold">{branch}</span> - {ENGINEERING_BRANCHES[branch as keyof typeof ENGINEERING_BRANCHES]}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(count / stats.totalAlumni) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="font-semibold w-12 text-right">{count}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No branch data yet</p>
            )}
          </div>
        </div>

        {/* Graduation Year Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Alumni by Graduation Year</h2>
          <div className="space-y-3">
            {Object.entries(stats.yearBreakdown).length > 0 ? (
              Object.entries(stats.yearBreakdown)
                .sort((a: any, b: any) => b[0] - a[0])
                .map(([year, count]: [string, any]) => (
                  <div key={year} className="flex items-center justify-between">
                    <span className="text-gray-700">Class of {year}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${(count / stats.totalAlumni) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="font-semibold w-12 text-right">{count}</span>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500 text-center py-4">No graduation year data yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
