"use client";

import React from "react";
import { useState, useRef } from "react";
import {
  Upload,
  AlertCircle,
  CheckCircle,
  FileText,
  Download,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { ENGINEERING_BRANCHES } from "@/lib/types";
import * as XLSX from "xlsx";

interface ExcelUploadProps {
  onUploadComplete: () => void;
}

export function ExcelUploadEnhanced({ onUploadComplete }: ExcelUploadProps) {
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
        message:
          response.message ||
          "Successfully uploaded alumni data! Refresh to see updates.",
      });

      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setTimeout(onUploadComplete, 1500);
    } catch (error) {
      setUploadResult({
        success: false,
        message: `Error uploading file: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadExcelTemplate = () => {
    try {
      // Sample data with realistic alumni information
      // Column names MUST match backend expectations exactly (case-insensitive)
      const sampleData = [
        {
          s_name: "John Doe",
          email: "john.doe@example.com",
          s_id: "2020001",
          phone_no: "9876543210",
          graduation_year: "2020",
          branch: "CS",
          linkedin_profile: "https://linkedin.com/in/johndoe",
          gender: "Male",
          company_name: "Tech Corp",
          company_location: "Mumbai",
          position: "Senior Software Engineer",
          start_date: "2021-07-15",
          college_name: "Stanford University",
          domain_of_study: "MS Computer Science",
          start_year: "2020",
          end_year: "2022",
        },
        {
          s_name: "Jane Smith",
          email: "jane.smith@example.com",
          s_id: "2021001",
          phone_no: "9123456789",
          graduation_year: "2021",
          branch: "AIDS",
          linkedin_profile: "https://linkedin.com/in/janesmith",
          gender: "Female",
          company_name: "AI Solutions",
          company_location: "Bangalore",
          position: "Data Scientist",
          start_date: "2022-08-20",
          college_name: "IIT Delhi",
          domain_of_study: "M.Tech AI",
          start_year: "2021",
          end_year: "2023",
        },
        {
          s_name: "Rahul Desai",
          email: "rahul.desai@example.com",
          s_id: "2019001",
          phone_no: "8456789123",
          graduation_year: "2019",
          branch: "ECE",
          linkedin_profile: "https://linkedin.com/in/rahuldesai",
          gender: "Male",
          company_name: "Semiconductor Corp",
          company_location: "Pune",
          position: "Electronics Design Engineer",
          start_date: "2019-09-01",
          college_name: "BITS Pilani",
          domain_of_study: "PhD Electronics",
          start_year: "2019",
          end_year: "2024",
        },
        {
          s_name: "Priya Nair",
          email: "priya.nair@example.com",
          s_id: "2022001",
          phone_no: "7789456123",
          graduation_year: "2022",
          branch: "IT",
          linkedin_profile: "https://linkedin.com/in/priyanair",
          gender: "Female",
          company_name: "Web Innovations",
          company_location: "Delhi",
          position: "Full Stack Developer",
          start_date: "2022-07-01",
        },
        {
          s_name: "Arjun Kumar",
          email: "arjun.kumar@example.com",
          s_id: "2018001",
          phone_no: "9654321789",
          graduation_year: "2018",
          branch: "ENTC",
          linkedin_profile: "https://linkedin.com/in/arjunkumar",
          gender: "Male",
          company_name: "Network Systems",
          company_location: "Hyderabad",
          position: "Telecommunication Specialist",
          start_date: "2018-09-15",
          college_name: "ISB Hyderabad",
          domain_of_study: "MBA",
          start_year: "2018",
          end_year: "2020",
        },
      ];

      // Create workbook
      const ws = XLSX.utils.json_to_sheet(sampleData);

      // Set column widths
      ws["!cols"] = [
        { wch: 20 }, // s_name
        { wch: 25 }, // email
        { wch: 12 }, // s_id
        { wch: 15 }, // phone_no
        { wch: 16 }, // graduation_year
        { wch: 12 }, // branch
        { wch: 40 }, // linkedin_profile
        { wch: 10 }, // gender
        { wch: 20 }, // company_name
        { wch: 18 }, // company_location
        { wch: 25 }, // position
        { wch: 15 }, // start_date
        { wch: 20 }, // college_name
        { wch: 25 }, // domain_of_study
        { wch: 12 }, // start_year
        { wch: 12 }, // end_year
      ];

      // Freeze header row
      ws["!freeze"] = { xSplit: 0, ySplit: 1 };

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Alumni");

      // Create instructions sheet
      const instructions = [
        ["Alumni Database Import Template - Instructions"],
        [""],
        ["COLUMN DEFINITIONS:"],
        ["Column", "Required", "Description", "Example"],
        ["s_name", "YES", "Full name of alumni", "John Doe"],
        ["email", "YES", "Valid email address", "john.doe@example.com"],
        ["s_id", "NO", "Student/Alumni ID", "2020001"],
        ["phone_no", "NO", "Contact number (10 digits)", "9876543210"],
        ["graduation_year", "YES", "Year of graduation (4 digits)", "2020"],
        [
          "branch",
          "YES",
          "Engineering branch code",
          "CS / IT / ENTC / ECE / AIDS",
        ],
        [
          "linkedin_profile",
          "NO",
          "LinkedIn profile URL",
          "https://linkedin.com/in/johndoe",
        ],
        ["gender", "NO", "Male/Female/Other", "Male"],
        ["company_name", "NO", "Current company name", "Tech Corp"],
        ["company_location", "NO", "Current location/City", "Mumbai"],
        ["position", "NO", "Current job position", "Senior Software Engineer"],
        [
          "start_date",
          "NO",
          "Employment start date (YYYY-MM-DD)",
          "2021-07-15",
        ],
        ["end_date", "NO", "Employment end date (YYYY-MM-DD)", ""],
        [
          "college_name",
          "NO",
          "College/University name for higher studies",
          "Stanford University",
        ],
        ["domain_of_study", "NO", "Degree and domain", "MS Computer Science"],
        ["start_year", "NO", "Higher studies start year", "2020"],
        ["end_year", "NO", "Higher studies end year", "2022"],
        [""],
        ["BRANCH CODES:"],
        ["Code", "Full Name"],
        ["CS", "Computer Science"],
        ["IT", "Information Technology"],
        ["ENTC", "Electronics & Telecommunication"],
        ["ECE", "Electronics & Communication Engineering"],
        ["AIDS", "Artificial Intelligence & Data Science"],
        [""],
        ["IMPORTANT NOTES:"],
        ["- Do not modify or delete the header row"],
        ["- Use correct branch codes as listed above"],
        ["- Graduation Year must be a 4-digit number (2018, 2019, 2020, etc.)"],
        ["- Email must be unique and valid"],
        ["- Phone number should be 10 digits"],
        ["- Save file as .xlsx format"],
        ["- Maximum file size: 10MB"],
        ["- All data will be visible in the Alumni Database after upload"],
        [""],
        ["USEFUL TIPS:"],
        [
          "- You can use the sample data provided in the Alumni sheet as reference",
        ],
        ["- Leave optional fields empty if data is not available"],
        ["- Use consistent formatting for dates and phone numbers"],
        ["- Verify email addresses before uploading"],
        ["- Test with sample data first before bulk upload"],
      ];

      const ws_instructions = XLSX.utils.aoa_to_sheet(instructions);
      ws_instructions["!cols"] = [
        { wch: 40 },
        { wch: 12 },
        { wch: 50 },
        { wch: 40 },
      ];

      XLSX.utils.book_append_sheet(wb, ws_instructions, "Instructions");

      // Merge cells for title in instructions sheet
      ws_instructions["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];

      XLSX.writeFile(wb, "alumni-import-template.xlsx");
    } catch (error) {
      console.error("Error generating Excel template:", error);
      alert("Error generating template. Please try again.");
    }
  };

  const downloadSampleCSV = () => {
    const csvContent = `Name,Email,Phone,Graduation Year,Branch,Position,Company,Location,LinkedIn,Gender,Higher Studies
John Doe,john.doe@example.com,9876543210,2020,CS,Senior Software Engineer,Tech Corp,Mumbai,https://linkedin.com/in/johndoe,Male,MS Computer Science - Stanford University
Jane Smith,jane.smith@example.com,9123456789,2021,AIDS,Data Scientist,AI Solutions,Bangalore,https://linkedin.com/in/janesmith,Female,M.Tech AI - IIT Delhi
Rahul Desai,rahul.desai@example.com,8456789123,2019,ECE,Electronics Design Engineer,Semiconductor Corp,Pune,https://linkedin.com/in/rahuldesai,Male,PhD Electronics - BITS Pilani
Priya Nair,priya.nair@example.com,7789456123,2022,IT,Full Stack Developer,Web Innovations,Delhi,https://linkedin.com/in/priyanair,Female,
Arjun Kumar,arjun.kumar@example.com,9654321789,2018,ENTC,Telecommunication Specialist,Network Systems,Hyderabad,https://linkedin.com/in/arjunkumar,Male,MBA - ISB Hyderabad`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "alumni-import-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">📊 Upload Alumni Data</h2>

        {/* File Input */}
        <div className="mb-6">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-lg font-medium mb-2">
              {file ? file.name : "Click to upload or drag and drop"}
            </p>
            <p className="text-sm text-gray-500">
              CSV or Excel files (with headers)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <button
            onClick={handleUpload}
            disabled={!file || isProcessing}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            {isProcessing ? "Processing..." : "Upload & Process"}
          </button>
          <button
            onClick={downloadExcelTemplate}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Excel Template
          </button>
          <button
            onClick={downloadSampleCSV}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            CSV Sample
          </button>
        </div>

        {/* Template Info */}
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  📝 Required Fields
                </h3>
                <ul className="text-sm text-blue-800 space-y-1 ml-4 list-disc">
                  <li>
                    <strong>Name</strong> - Full name of alumni
                  </li>
                  <li>
                    <strong>Email</strong> - Valid email address (must be
                    unique)
                  </li>
                  <li>
                    <strong>Graduation Year</strong> - Year as 4-digit number
                    (e.g., 2020)
                  </li>
                  <li>
                    <strong>Branch</strong> - Use one of the codes below
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Optional Fields */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex gap-3">
              <FileText className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-purple-900 mb-2">
                  ✨ Optional Fields
                </h3>
                <ul className="text-sm text-purple-800 space-y-1 ml-4 list-disc">
                  <li>
                    Phone, Position, Company, Location, LinkedIn, Gender, Higher
                    Studies
                  </li>
                  <li>Leave empty if data not available</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Engineering Branches Guide */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h3 className="font-semibold text-indigo-900 mb-3">
              🏗️ Engineering Branches
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(ENGINEERING_BRANCHES).map(([code, name]) => (
                <div
                  key={code}
                  className="flex items-start gap-2 bg-white p-2 rounded"
                >
                  <span className="inline-block bg-indigo-600 text-white px-3 py-1 rounded font-bold text-xs whitespace-nowrap">
                    {code}
                  </span>
                  <span className="text-sm text-indigo-900 self-center">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Data Visibility Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">
              ✅ After Upload
            </h3>
            <p className="text-sm text-green-800">
              All uploaded data will be immediately visible in the Alumni
              Database section. You can search, filter, and export the data. Use
              filters by graduation year, branch, location, and more!
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      {uploadResult && (
        <div
          className={`rounded-lg border p-6 ${uploadResult.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
        >
          <div className="flex gap-3">
            {uploadResult.success ? (
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            )}
            <div className="flex-1">
              <h3
                className={`font-semibold ${uploadResult.success ? "text-green-900" : "text-red-900"}`}
              >
                {uploadResult.message}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
