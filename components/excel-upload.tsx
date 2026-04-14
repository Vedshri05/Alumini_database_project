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

  const convertExcelToCSV = async (excelFile: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Convert to CSV
          const csv = XLSX.utils.sheet_to_csv(worksheet);

          // Create CSV file
          const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
          const csvFile = new File(
            [csvBlob],
            excelFile.name.replace(/\.[^.]+$/, ".csv"),
            { type: "text/csv" },
          );

          resolve(csvFile);
        } catch (error) {
          reject(new Error(`Failed to convert Excel file: ${error}`));
        }
      };

      reader.onerror = () => {
        reject(new Error("Failed to read Excel file"));
      };

      reader.readAsBinaryString(excelFile);
    });
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      // Convert Excel to CSV if needed
      let uploadFile = file;
      if (
        file.type.includes("spreadsheet") ||
        file.type.includes("excel") ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls")
      ) {
        uploadFile = await convertExcelToCSV(file);
      }

      const response = await apiClient.uploadAlumniCSV(uploadFile);

      const successMessage =
        response.message ||
        response.error ||
        "Successfully uploaded alumni data! Refresh to see updates.";

      setUploadResult({
        success: response.success || !response.error,
        message: successMessage,
      });

      if (response.success || !response.error) {
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setTimeout(onUploadComplete, 1500);
      }
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
      // Sample data matching the actual Excel sheet structure
      const sampleData = [
        {
          s_id: 1,
          s_name: "MONALI MUKUND ABDULE",
          branch: "Computer Science",
          graduation_year: "2012-13",
          phone_no: "7709359048",
          email: "abdulemonali123@gmail.com",
          linkedin_profile: "https://linkedin.com/in/monali",
          gender: "F",
          company_name: "TCS",
          company_location: "Mumbai",
          position: "Senior Software Engineer",
          start_date: "2015-07-01",
          end_date: "",
          college_name: "IIT Bombay",
          college_location: "Mumbai",
          domain_of_study: "M.Tech Computer Science",
          start_year: 2013,
          end_year: 2015,
        },
        {
          s_id: 2,
          s_name: "VINIT SHARAD AGARWAL",
          branch: "Information Technology",
          graduation_year: "2012-13",
          phone_no: "9028790386",
          email: "vinit.agarwal.pict@gmail.com",
          linkedin_profile: "https://linkedin.com/in/vinit",
          gender: "M",
          company_name: "Infosys",
          company_location: "Bangalore",
          position: "Data Scientist",
          start_date: "2015-08-01",
          end_date: "",
          college_name: "IISc Bangalore",
          college_location: "Bangalore",
          domain_of_study: "M.Tech AI",
          start_year: 2013,
          end_year: 2015,
        },
        {
          s_id: 11,
          s_name: "ANANYA SHARMA",
          branch: "Computer Science",
          graduation_year: "2019-20",
          phone_no: "9876500001",
          email: "ananya.sharma@gmail.com",
          linkedin_profile: "https://linkedin.com/in/ananya",
          gender: "F",
          company_name: "TCS",
          company_location: "Mumbai",
          position: "Software Engineer",
          start_date: "2020-06-01",
          end_date: "",
          college_name: "",
          college_location: "",
          domain_of_study: "",
          start_year: "",
          end_year: "",
        },
      ];

      // Create workbook
      const ws = XLSX.utils.json_to_sheet(sampleData);

      // Set column widths
      ws["!cols"] = [
        { wch: 8 }, // s_id
        { wch: 25 }, // s_name
        { wch: 20 }, // branch
        { wch: 16 }, // graduation_year
        { wch: 15 }, // phone_no
        { wch: 30 }, // email
        { wch: 35 }, // linkedin_profile
        { wch: 8 }, // gender
        { wch: 20 }, // company_name
        { wch: 20 }, // company_location
        { wch: 25 }, // position
        { wch: 15 }, // start_date
        { wch: 15 }, // end_date
        { wch: 25 }, // college_name
        { wch: 20 }, // college_location
        { wch: 25 }, // domain_of_study
        { wch: 12 }, // start_year
        { wch: 12 }, // end_year
      ];

      // Freeze header row
      ws["!freeze"] = { xSplit: 0, ySplit: 1 };

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Alumni_Full_Data");

      // Create instructions sheet
      const instructions = [
        ["Alumni Database Import Template - Column Reference"],
        [""],
        ["EMPLOYMENT INFORMATION:"],
        ["Column", "Required", "Description", "Example"],
        ["s_id", "YES", "Student ID (Unique)", "1"],
        ["s_name", "YES", "Full name of alumni", "MONALI MUKUND ABDULE"],
        ["branch", "YES", "Engineering branch", "Computer Science"],
        ["graduation_year", "YES", "Graduation year", "2012-13"],
        ["phone_no", "NO", "Contact number (10 digits)", "7709359048"],
        ["email", "YES", "Valid email address", "name@example.com"],
        [
          "linkedin_profile",
          "NO",
          "LinkedIn profile URL",
          "https://linkedin.com/in/name",
        ],
        ["gender", "NO", "M/F/Other", "F"],
        ["company_name", "NO", "Current company name", "TCS"],
        ["company_location", "NO", "Company location", "Mumbai"],
        ["position", "NO", "Job position", "Senior Software Engineer"],
        ["start_date", "NO", "Job start date (YYYY-MM-DD)", "2015-07-01"],
        ["end_date", "NO", "Job end date (YYYY-MM-DD)", ""],
        [""],
        ["HIGHER STUDIES INFORMATION:"],
        ["Column", "Required", "Description", "Example"],
        ["college_name", "NO", "College/University name", "IIT Bombay"],
        ["college_location", "NO", "College location", "Mumbai"],
        [
          "domain_of_study",
          "NO",
          "Degree and field",
          "M.Tech Computer Science",
        ],
        ["start_year", "NO", "Study start year", "2013"],
        ["end_year", "NO", "Study end year", "2015"],
        [""],
        ["BRANCH OPTIONS:"],
        [
          "Computer Science",
          "Information Technology",
          "Electronics & Telecommunication",
          "Electronics & Communication",
        ],
        ["Artificial Intelligence & Data Science", "", "", ""],
        [""],
        ["IMPORTANT NOTES:"],
        ["- Do not modify or delete the header row"],
        ["- s_id must be unique for each record"],
        ["- Email must be unique and valid"],
        ["- Phone number should be 10 digits"],
        ["- Dates should be in YYYY-MM-DD format"],
        ["- Leave optional fields empty if data is not available"],
        ["- Save file as .xlsx format (Excel 2007+)"],
        ["- Maximum file size: 10MB"],
        ["- All data will be visible in the Alumni Database after upload"],
        [""],
        ["TIPS:"],
        [
          "- You can use the sample data in Alumni_Full_Data sheet as reference",
        ],
        ["- Leave employment fields empty if currently not employed"],
        ["- Leave higher studies fields empty if no further studies"],
        ["- Ensure consistent formatting across all rows"],
      ];

      const ws_instructions = XLSX.utils.aoa_to_sheet(instructions);
      ws_instructions["!cols"] = [
        { wch: 25 },
        { wch: 15 },
        { wch: 50 },
        { wch: 35 },
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
    const csvContent = `s_id,s_name,branch,graduation_year,phone_no,email,linkedin_profile,gender,company_name,company_location,position,start_date,end_date,college_name,college_location,domain_of_study,start_year,end_year
1,MONALI MUKUND ABDULE,Computer Science,2012-13,7709359048,abdulemonali123@gmail.com,https://linkedin.com/in/monali,F,TCS,Mumbai,Senior Software Engineer,2015-07-01,,IIT Bombay,Mumbai,M.Tech Computer Science,2013,2015
2,VINIT SHARAD AGARWAL,Information Technology,2012-13,9028790386,vinit.agarwal.pict@gmail.com,https://linkedin.com/in/vinit,M,Infosys,Bangalore,Data Scientist,2015-08-01,,IISc Bangalore,Bangalore,M.Tech AI,2013,2015
11,ANANYA SHARMA,Computer Science,2019-20,9876500001,ananya.sharma@gmail.com,https://linkedin.com/in/ananya,F,TCS,Mumbai,Software Engineer,2020-06-01,,,,,
12,RAJESH KUMAR,Information Technology,2018-19,9123456789,rajesh.kumar@example.com,https://linkedin.com/in/rajesh,M,Google,Bangalore,Software Engineer,2019-07-01,,,,,`;

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
                    <strong>s_id</strong> - Student ID (unique identifier)
                  </li>
                  <li>
                    <strong>s_name</strong> - Full name of alumni
                  </li>
                  <li>
                    <strong>branch</strong> - Engineering branch name
                  </li>
                  <li>
                    <strong>graduation_year</strong> - Year (e.g., 2012-13,
                    2020-21)
                  </li>
                  <li>
                    <strong>email</strong> - Valid email address (must be
                    unique)
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
                  ✨ Optional Fields - Employment
                </h3>
                <ul className="text-sm text-purple-800 space-y-1 ml-4 list-disc">
                  <li>phone_no, gender, linkedin_profile</li>
                  <li>company_name, company_location, position</li>
                  <li>start_date, end_date (format: YYYY-MM-DD)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Higher Studies Fields */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex gap-3">
              <FileText className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">
                  🎓 Optional Fields - Higher Studies
                </h3>
                <ul className="text-sm text-amber-800 space-y-1 ml-4 list-disc">
                  <li>college_name, college_location</li>
                  <li>domain_of_study (e.g., M.Tech AI, MBA, PhD)</li>
                  <li>start_year, end_year (4-digit year)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Engineering Branches Guide */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h3 className="font-semibold text-indigo-900 mb-3">
              🏗️ Engineering Branches
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-indigo-800">
              <div className="bg-white p-2 rounded">✓ Computer Science</div>
              <div className="bg-white p-2 rounded">
                ✓ Information Technology
              </div>
              <div className="bg-white p-2 rounded">
                ✓ Electronics & Telecommunication
              </div>
              <div className="bg-white p-2 rounded">
                ✓ Electronics & Communication
              </div>
              <div className="bg-white p-2 rounded">
                ✓ Artificial Intelligence & Data Science
              </div>
              <div className="bg-white p-2 rounded">
                ✓ Any other branch name
              </div>
            </div>
            <p className="text-xs text-indigo-700 mt-3 italic">
              Enter full branch name as shown above
            </p>
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
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            )}
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold mb-2 ${uploadResult.success ? "text-green-900" : "text-red-900"}`}
              >
                {uploadResult.success
                  ? "✅ Upload Successful"
                  : "❌ Upload Failed"}
              </h3>
              <p
                className={`text-sm ${uploadResult.success ? "text-green-800" : "text-red-800"} whitespace-pre-wrap break-words`}
              >
                {uploadResult.message}
              </p>
              {!uploadResult.success && (
                <div className="mt-3 text-xs text-red-700 bg-red-100 p-2 rounded max-h-48 overflow-y-auto font-mono">
                  <p className="font-semibold mb-1">Details:</p>
                  <p>Check that all records have:</p>
                  <ul className="ml-4 list-disc space-y-0.5">
                    <li>Unique email addresses (no duplicates)</li>
                    <li>Valid branch names</li>
                    <li>Proper date formats (YYYY-MM-DD)</li>
                    <li>All required fields filled in</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
