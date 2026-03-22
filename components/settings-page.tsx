'use client';

import { useState } from 'react';
import { Settings, FileJson, Trash2, CheckCircle } from 'lucide-react';
import { dataService } from '@/lib/data-service';

export function SettingsPage() {
  const [message, setMessage] = useState('');

  const exportData = () => {
    const data = {
      alumni: dataService.getAllAlumni(),
      events: dataService.getAllEvents(),
      importLogs: dataService.getImportLogs(),
      timestamp: new Date().toISOString(),
    };

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `alumni-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    setMessage('Data exported successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to delete all data? This cannot be undone.')) {
      // Clear by reloading - in production, you'd call an API to clear database
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600">System configuration and tools</p>
      </div>

      {/* Success Message */}
      {message && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800">{message}</p>
        </div>
      )}

      {/* Data Management */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FileJson className="w-5 h-5" />
          Data Management
        </h2>
        <p className="text-gray-600 mb-4">Export and manage your alumni data</p>

        <div className="space-y-3">
          <button
            onClick={exportData}
            className="w-full flex items-center justify-between bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 transition-colors text-left"
          >
            <div>
              <p className="font-semibold text-blue-900">Export Data as JSON</p>
              <p className="text-sm text-blue-700">Download all alumni, events, and import logs</p>
            </div>
            <FileJson className="w-6 h-6 text-blue-600 flex-shrink-0" />
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-lg border border-red-200 p-6">
        <h2 className="text-xl font-semibold mb-4 text-red-900">Danger Zone</h2>
        <p className="text-gray-600 mb-4">Irreversible actions</p>

        <button
          onClick={clearAllData}
          className="w-full flex items-center justify-between bg-red-100 hover:bg-red-200 border border-red-300 rounded-lg p-4 transition-colors text-left"
        >
          <div>
            <p className="font-semibold text-red-900">Clear All Data</p>
            <p className="text-sm text-red-700">Delete all alumni records, events, and logs permanently</p>
          </div>
          <Trash2 className="w-6 h-6 text-red-600 flex-shrink-0" />
        </button>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          System Information
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Application</span>
            <span className="font-semibold">Alumni Management Hub</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Version</span>
            <span className="font-semibold">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Database</span>
            <span className="font-semibold">In-Memory (Demo)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Built with</span>
            <span className="font-semibold">Next.js 16 & React 19</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Updated</span>
            <span className="font-semibold">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Available Features</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Excel CSV import and automated data processing</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Comprehensive alumni database with search and filtering</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Event creation and management</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Real-time attendance tracking and check-in system</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Advanced analytics and reporting dashboards</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Department and graduation year analytics</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Data export functionality</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
