'use client';

import { useState, useEffect } from 'react';
import { Search, Trash2, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { Alumni, ENGINEERING_BRANCHES } from '@/lib/types';

export function AlumniDatabase() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAlumni();
  }, []);

  const loadAlumni = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getAllAlumni();
      setAlumni(response.data || []);
    } catch (err) {
      console.error('Failed to load alumni:', err);
      setError('Failed to load alumni data');
    } finally {
      setLoading(false);
    }
  };

  const filteredAlumni = alumni.filter(a => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.company?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    const matchesBranch = !filterBranch || a.branch === filterBranch;
    
    return matchesSearch && matchesBranch;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this alumni record?')) return;
    
    try {
      await apiClient.deleteAlumni(id);
      setAlumni(alumni.filter(a => a.id !== id));
    } catch (err) {
      console.error('Failed to delete alumni:', err);
      alert('Failed to delete alumni record');
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm('Are you sure you want to delete ALL alumni records? This action cannot be undone.')) return;
    
    try {
      // Delete all alumni one by one (since there's no bulk delete endpoint)
      for (const alumnus of alumni) {
        await apiClient.deleteAlumni(alumnus.id);
      }
      setAlumni([]);
      alert('All alumni records have been deleted.');
    } catch (err) {
      console.error('Failed to delete alumni records:', err);
      alert('Failed to delete some alumni records');
      loadAlumni(); // Reload to see what's left
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading alumni...</p>
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
                onClick={loadAlumni}
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Alumni Database</h1>
        <div className="flex items-center gap-3">
          <p className="text-gray-600">Manage all alumni records</p>
          {alumni.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Clear All ({alumni.length})
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Branches</option>
            {Object.entries(ENGINEERING_BRANCHES).map(([code, name]) => (
              <option key={code} value={code}>{code} - {name}</option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-600">{filteredAlumni.length} records found</p>
      </div>

      {/* Alumni Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredAlumni.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Branch</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Grad Year</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Company</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Position</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAlumni.map(alumnus => (
                  <tr key={alumnus.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{alumnus.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{alumnus.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {alumnus.branch}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{alumnus.graduationYear}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{alumnus.company || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{alumnus.currentPosition || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {alumnus.linkedinUrl && (
                          <a
                            href={alumnus.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => handleDelete(alumnus.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No alumni records found</p>
            <p className="text-gray-500">Upload a CSV file to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
