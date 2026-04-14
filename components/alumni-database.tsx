"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  ExternalLink,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { Alumni, ENGINEERING_BRANCHES } from "@/lib/types";

export function AlumniDatabase() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
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
      console.log("Full API Response:", response);
      console.log("Alumni data count:", response.data?.length);
      if (response.data && response.data.length > 0) {
        console.log("First alumni record:", response.data[0]);
        console.log("sName field present:", "sName" in response.data[0]);
      }
      setAlumni(response.data || []);
    } catch (err) {
      console.error("Failed to load alumni:", err);
      setError("Failed to load alumni data");
    } finally {
      setLoading(false);
    }
  };

  const filteredAlumni = alumni.filter((a) => {
    const matchesSearch =
      (a.sName && a.sName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (a.email && a.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesBranch = !filterBranch || a.branch === filterBranch;

    return matchesSearch && matchesBranch;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this alumni record?")) return;

    try {
      await apiClient.deleteAlumni(id);
      setAlumni(alumni.filter((a) => a.sId !== id));
    } catch (err) {
      console.error("Failed to delete alumni:", err);
      alert("Failed to delete alumni record");
    }
  };

  const handleBulkDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete ALL alumni records? This action cannot be undone.",
      )
    )
      return;

    try {
      // Delete all alumni one by one (since there's no bulk delete endpoint)
      for (const alumnus of alumni) {
        await apiClient.deleteAlumni(alumnus.sId);
      }
      setAlumni([]);
      alert("All alumni records have been deleted.");
    } catch (err) {
      console.error("Failed to delete alumni records:", err);
      alert("Failed to delete some alumni records");
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
              <h3 className="font-semibold text-red-900 mb-1">
                Error Loading Data
              </h3>
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
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-600">
          {filteredAlumni.length} records found
        </p>
      </div>

      {/* Alumni Table with Better Formatting */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredAlumni.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 gap-4 p-4">
              {filteredAlumni.map((alumnus) => {
                const employment = alumnus.employment?.[0];
                const higherStudy = alumnus.higherStudies?.[0];

                return (
                  <div
                    key={alumnus.sId}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {alumnus.sName}
                        </h3>
                        <p className="text-sm text-gray-600">{alumnus.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {alumnus.linkedinProfile && (
                          <a
                            href={alumnus.linkedinProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => handleDelete(alumnus.sId)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Education & Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">
                          BRANCH
                        </p>
                        <p className="text-sm text-gray-900 font-medium">
                          {alumnus.branch}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">
                          GRADUATION YEAR
                        </p>
                        <p className="text-sm text-gray-900 font-medium">
                          {alumnus.graduationYear}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">
                          GENDER
                        </p>
                        <p className="text-sm text-gray-900 font-medium">
                          {alumnus.gender || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 font-semibold mb-2">
                        CONTACT
                      </p>
                      <p className="text-sm text-gray-600">
                        {alumnus.phoneNo || "No phone number"}
                      </p>
                    </div>

                    {/* Employment Info */}
                    {employment && (
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <p className="text-xs text-gray-500 font-semibold mb-2">
                          💼 CURRENT EMPLOYMENT
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500">Company</p>
                            <p className="text-sm font-medium text-gray-900">
                              {employment.companyName}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="text-sm font-medium text-gray-900">
                              {employment.companyLocation || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Position</p>
                            <p className="text-sm font-medium text-gray-900">
                              {employment.position || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Duration</p>
                            <p className="text-sm font-medium text-gray-900">
                              {employment.startDate && employment.endDate
                                ? `${employment.startDate} to ${employment.endDate}`
                                : employment.startDate
                                  ? `From ${employment.startDate}`
                                  : "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Higher Studies Info */}
                    {higherStudy && (
                      <div>
                        <p className="text-xs text-gray-500 font-semibold mb-2">
                          🎓 HIGHER STUDIES
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500">College</p>
                            <p className="text-sm font-medium text-gray-900">
                              {higherStudy.collegeName}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="text-sm font-medium text-gray-900">
                              {higherStudy.location || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">
                              Domain/Field
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {higherStudy.domainOfStudy || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Years</p>
                            <p className="text-sm font-medium text-gray-900">
                              {higherStudy.startYear && higherStudy.endYear
                                ? `${higherStudy.startYear} - ${higherStudy.endYear}`
                                : "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">📭 No alumni records found</p>
            <p className="text-gray-500">
              Upload an Excel or CSV file to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
