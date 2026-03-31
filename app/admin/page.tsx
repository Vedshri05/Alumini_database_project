'use client';

import { useState } from 'react';
import { LogOut, User } from 'lucide-react';
import { AdminSidebar } from '@/components/admin-sidebar';
import { DashboardView } from '@/components/dashboard-view';
import { ExcelUpload } from '@/components/excel-upload';
import { AlumniDatabase } from '@/components/alumni-database';
import { AnalyticsReports } from '@/components/analytics-reports';
import { EventsManager } from '@/components/events-manager';
import { AttendanceTracker } from '@/components/attendance-tracker';
import { SettingsPage } from '@/components/settings-page';
import { useAuth } from '@/hooks/use-auth';

export default function AdminDashboard() {
  const { user, checking, logout } = useAuth('ADMIN');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':   return <DashboardView key={refreshKey} />;
      case 'upload':      return <ExcelUpload onUploadComplete={() => setRefreshKey(p => p + 1)} />;
      case 'alumni':      return <AlumniDatabase key={refreshKey} />;
      case 'reports':     return <AnalyticsReports key={refreshKey} />;
      case 'events':      return <EventsManager key={refreshKey} />;
      case 'attendance':  return <AttendanceTracker key={refreshKey} />;
      case 'settings':    return <SettingsPage key={refreshKey} />;
      default:            return <DashboardView key={refreshKey} />;
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 lg:ml-0">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-end gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{user?.name}</span>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">Admin</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <main className="p-4 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
