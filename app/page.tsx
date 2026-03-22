'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/admin-sidebar';
import { DashboardView } from '@/components/dashboard-view';
import { ExcelUpload } from '@/components/excel-upload';
import { AlumniDatabase } from '@/components/alumni-database';
import { AnalyticsReports } from '@/components/analytics-reports';
import { EventsManager } from '@/components/events-manager';
import { AttendanceTracker } from '@/components/attendance-tracker';
import { SettingsPage } from '@/components/settings-page';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView key={refreshKey} />;
      case 'upload':
        return <ExcelUpload onUploadComplete={() => setRefreshKey(prev => prev + 1)} />;
      case 'alumni':
        return <AlumniDatabase key={refreshKey} />;
      case 'reports':
        return <AnalyticsReports key={refreshKey} />;
      case 'events':
        return <EventsManager key={refreshKey} />;
      case 'attendance':
        return <AttendanceTracker key={refreshKey} />;
      case 'settings':
        return <SettingsPage key={refreshKey} />;
      default:
        return <DashboardView key={refreshKey} />;
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 lg:ml-0">
        <main className="p-4 lg:p-8 pt-20 lg:pt-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
