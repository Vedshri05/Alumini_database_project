'use client';

import React from "react"

import { useState, useRef } from 'react';
import { Upload, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { ENGINEERING_BRANCHES } from '@/lib/types';

interface ExcelUploadProps {
  onUploadComplete: () => void;
}

export function ExcelUpload({ onUploadComplete }: ExcelUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const response = await apiClient.uploadAlumniCSV(file);
      
      setUploadResult({
        success: true,
        message: response.message || 'Successfully uploaded alumni data!',
      });

      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      onUploadComplete();
    } catch (error) {
      setUploadResult({
        success: false,
        message: `Error uploading file: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = 'Name,Email,Phone,Graduation Year,Branch,Current Position,Company,Location,LinkedIn URL\nJohn Doe,john@example.com,1234567890,2020,CS,Software Engineer,Tech Corp,Mumbai,https://linkedin.com/in/johndoe\nJane Smith,jane@example.com,9876543210,2021,IT,Data Analyst,Data Inc,Delhi,https://linkedin.com/in/janesmith';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'alumni-import-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Upload Alumni Data</h2>

        {/* File Input */}
        <div className="mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-lg font-medium mb-2">
              {file ? file.name : 'Click to upload or drag and drop'}
            </p>
            <p className="text-sm text-gray-500">CSV files only (with headers)</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={handleUpload}
            disabled={!file || isProcessing}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {isProcessing ? 'Processing...' : 'Upload & Process'}
          </button>
          <button
            onClick={downloadTemplate}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
          >
            Download Template
          </button>
        </div>

        {/* Template Info */}
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">CSV Format Required</h3>
                <p className="text-sm text-blue-800">Required columns: Name, Email, Branch. Optional: Phone, Graduation Year, Current Position, Company, Location, LinkedIn URL</p>
              </div>
            </div>
          </div>

          {/* Engineering Branches Guide */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h3 className="font-semibold text-indigo-900 mb-3">Engineering Branches</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(ENGINEERING_BRANCHES).map(([code, name]) => (
                <div key={code} className="flex items-start gap-2">
                  <span className="inline-block bg-indigo-200 text-indigo-900 px-2.5 py-0.5 rounded font-semibold text-xs whitespace-nowrap">{code}</span>
                  <span className="text-sm text-indigo-800">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {uploadResult && (
        <div className={`rounded-lg border p-6 ${uploadResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex gap-3 mb-4">
            {uploadResult.success ? (
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            )}
            <div className="flex-1">
              <h3 className={`font-semibold ${uploadResult.success ? 'text-green-900' : 'text-red-900'}`}>
                {uploadResult.message}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
