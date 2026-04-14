import {
  Alumni,
  ImportError,
  ENGINEERING_BRANCHES,
  EngineeringBranch,
} from "./types";

// Excel processing utility - uses client-side parsing
export class ExcelProcessor {
  private static cleanString(str: string): string {
    return str?.toString().trim().toLowerCase() || "";
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static isValidYear(year: any): boolean {
    // Handle both "2012-13" and "2020" formats
    const yearStr = year?.toString().trim() || "";
    const yearNum = parseInt(yearStr);
    const currentYear = new Date().getFullYear();
    return !isNaN(yearNum) && yearNum >= 1950 && yearNum <= currentYear + 5;
  }

  private static isValidBranch(branch: string): branch is EngineeringBranch {
    return Object.keys(ENGINEERING_BRANCHES).includes(branch.toUpperCase());
  }

  private static getBranchCode(input: string): EngineeringBranch | null {
    const upperInput = input.toUpperCase().trim();
    if (Object.keys(ENGINEERING_BRANCHES).includes(upperInput)) {
      return upperInput as EngineeringBranch;
    }
    // Try to match by full name
    for (const [code, fullName] of Object.entries(ENGINEERING_BRANCHES)) {
      if (fullName.toUpperCase() === upperInput) {
        return code as EngineeringBranch;
      }
    }
    return null;
  }

  static parseCSV(csvContent: string): {
    records: Partial<Alumni>[];
    errors: ImportError[];
  } {
    const lines = csvContent.split("\n").filter((line) => line.trim());
    const records: Partial<Alumni>[] = [];
    const errors: ImportError[] = [];

    if (lines.length < 2) {
      return {
        records: [],
        errors: [
          { row: 0, field: "file", value: "", error: "CSV file is empty" },
        ],
      };
    }

    // Parse headers - handle quoted values
    const headerLine = lines[0];
    const headers = this.parseCSVLine(headerLine).map((h) =>
      this.cleanString(h),
    );
    const requiredFields = ["s_name", "email"];

    // Validate headers
    const hasRequiredFields = requiredFields.every((field) =>
      headers.includes(field),
    );

    if (!hasRequiredFields) {
      return {
        records: [],
        errors: [
          {
            row: 0,
            field: "headers",
            value: headers.join(", "),
            error: `Missing required fields: ${requiredFields.join(", ")}`,
          },
        ],
      };
    }

    // Process data rows
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = this.parseCSVLine(line);
      const record: Partial<Alumni> = {};
      const employment: Record<string, any> = {};
      const higherStudies: Record<string, any> = {};
      let hasError = false;

      headers.forEach((header, index) => {
        const value = (values[index] || "").trim();

        switch (header) {
          case "s_id":
            if (value) {
              record.sId = value;
            }
            break;
          case "s_name":
            if (!value) {
              errors.push({
                row: i + 1,
                field: "s_name",
                value,
                error: "Name is required",
              });
              hasError = true;
            } else {
              record.sName = value;
            }
            break;
          case "email":
            if (!value || !this.isValidEmail(value)) {
              errors.push({
                row: i + 1,
                field: "email",
                value,
                error: "Invalid email format",
              });
              hasError = true;
            } else {
              record.email = value.toLowerCase();
            }
            break;
          case "phone_no":
            if (value) {
              record.phoneNo = value;
            }
            break;
          case "graduation_year":
            if (value) {
              if (!this.isValidYear(value)) {
                errors.push({
                  row: i + 1,
                  field: "graduation_year",
                  value,
                  error: "Invalid graduation year",
                });
                hasError = true;
              } else {
                // Handle both "2012-13" and "2020" formats
                const yearStr = value.toString().replace(/[^0-9]/g, "");
                const year = parseInt(yearStr.substring(0, 4));
                record.graduationYear = !isNaN(year)
                  ? year
                  : new Date().getFullYear();
              }
            }
            break;
          case "branch":
            if (!value) {
              errors.push({
                row: i + 1,
                field: "branch",
                value,
                error:
                  "Branch is required. Valid options: CS, IT, ENTC, ECE, AIDS",
              });
              hasError = true;
            } else {
              const branchCode = this.getBranchCode(value);
              if (branchCode) {
                record.branch = branchCode;
              } else {
                errors.push({
                  row: i + 1,
                  field: "branch",
                  value,
                  error:
                    "Invalid branch. Valid options: CS, IT, ENTC, ECE, AIDS",
                });
                hasError = true;
              }
            }
            break;
          case "linkedin_profile":
            if (value) {
              record.linkedinProfile = value;
            }
            break;
          case "gender":
            if (value) {
              record.gender = value;
            }
            break;
          // Employment fields
          case "company_name":
            if (value) {
              employment.companyName = value;
            }
            break;
          case "company_location":
            if (value) {
              employment.location = value;
            }
            break;
          case "position":
            if (value) {
              employment.position = value;
            }
            break;
          case "start_date":
            if (value) {
              employment.startDate = value;
            }
            break;
          case "end_date":
            if (value) {
              employment.endDate = value;
            }
            break;
          // Higher Studies fields
          case "college_name":
            if (value) {
              higherStudies.collegeName = value;
            }
            break;
          case "college_location":
            if (value) {
              higherStudies.location = value;
            }
            break;
          case "domain_of_study":
            if (value) {
              higherStudies.domainOfStudy = value;
            }
            break;
          case "start_year":
            if (value) {
              const yearStr = value.toString().replace(/[^0-9]/g, "");
              const year = parseInt(yearStr.substring(0, 4));
              if (!isNaN(year)) {
                higherStudies.startYear = year;
              }
            }
            break;
          case "end_year":
            if (value) {
              const yearStr = value.toString().replace(/[^0-9]/g, "");
              const year = parseInt(yearStr.substring(0, 4));
              if (!isNaN(year)) {
                higherStudies.endYear = year;
              }
            }
            break;
        }
      });

      // Validate minimum required fields
      if (!record.sName || !record.email) {
        hasError = true;
      }

      // Validate branch and graduation year
      if (!record.branch) {
        hasError = true;
      }
      if (!record.graduationYear) {
        hasError = true;
      }

      // Only add record if it has no errors
      if (
        !hasError &&
        record.sName &&
        record.email &&
        record.branch &&
        record.graduationYear
      ) {
        // Attach employment data only if it has values
        if (Object.keys(employment).length > 0) {
          (record as any).employment = employment;
        }

        // Attach higher studies data only if it has values
        if (Object.keys(higherStudies).length > 0) {
          (record as any).higherStudies = higherStudies;
        }

        records.push(record);
      }
    }

    return { records, errors };
  }

  private static parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = "";
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i++;
        } else {
          // Toggle quote state
          insideQuotes = !insideQuotes;
        }
      } else if (char === "," && !insideQuotes) {
        // End of field
        result.push(current.trim().replace(/^"|"$/g, ""));
        current = "";
      } else {
        current += char;
      }
    }

    // Add last field
    result.push(current.trim().replace(/^"|"$/g, ""));
    return result;
  }

  static generateCSVTemplate(): string {
    const headers = [
      "S_ID",
      "S_Name",
      "Branch",
      "Graduation_Year",
      "Phone_No",
      "Email",
      "LinkedIn_Profile",
      "Gender",
      "Company_Name",
      "Company_Location",
      "Position",
      "Employment_Start_Date",
      "Employment_End_Date",
      "College_Name",
      "College_Location",
      "Domain_Of_Study",
      "HS_Start_Year",
      "HS_End_Year",
    ];
    const fieldDescriptions = [
      "ALUMNI INFO (Required)",
      "ALUMNI INFO (Required)",
      "ALUMNI INFO (Required)",
      "ALUMNI INFO (Required)",
      "ALUMNI INFO (Optional)",
      "ALUMNI INFO (Required)",
      "ALUMNI INFO (Optional)",
      "ALUMNI INFO (Optional)",
      "EMPLOYMENT (Optional)",
      "EMPLOYMENT (Optional)",
      "EMPLOYMENT (Optional)",
      "EMPLOYMENT (Optional)",
      "EMPLOYMENT (Optional - blank for current job)",
      "HIGHER STUDIES (Optional)",
      "HIGHER STUDIES (Optional)",
      "HIGHER STUDIES (Optional)",
      "HIGHER STUDIES (Optional)",
      "HIGHER STUDIES (Optional)",
    ];
    const sampleRows = [
      [
        "ALM001",
        "Rajesh Kumar",
        "CS",
        "2018",
        "+91-9876-543210",
        "rajesh.kumar@example.com",
        "https://linkedin.com/in/rajesh-kumar",
        "Male",
        "TCS",
        "Bangalore, India",
        "Senior Software Engineer",
        "2018-06-01",
        "2020-12-31",
        "IIT Bombay",
        "Mumbai, India",
        "Computer Science",
        "2015",
        "2017",
      ],
      [
        "ALM002",
        "Priya Sharma",
        "AIDS",
        "2019",
        "+91-9876-543211",
        "priya.sharma@example.com",
        "https://linkedin.com/in/priya-sharma",
        "Female",
        "Google",
        "Mountain View, CA",
        "Data Scientist",
        "2019-07-15",
        "2021-08-30",
        "Stanford University",
        "Palo Alto, CA",
        "Data Science",
        "2017",
        "2019",
      ],
      [
        "ALM003",
        "Amit Patel",
        "IT",
        "2020",
        "+91-9876-543212",
        "amit.patel@example.com",
        "https://linkedin.com/in/amit-patel",
        "Male",
        "Infosys",
        "Pune, India",
        "Network Administrator",
        "2020-08-01",
        "",
        "Delhi University",
        "Delhi, India",
        "Information Technology",
        "2016",
        "2020",
      ],
      [
        "ALM004",
        "Sneha Desai",
        "ECE",
        "2017",
        "+91-9876-543213",
        "sneha.desai@example.com",
        "https://linkedin.com/in/sneha-desai",
        "Female",
        "Qualcomm",
        "San Diego, CA",
        "Hardware Design Engineer",
        "2017-09-01",
        "",
        "NIT Surathkal",
        "Karnataka, India",
        "Electronics & Communication Engineering",
        "2013",
        "2017",
      ],
      [
        "ALM005",
        "Vikram Singh",
        "ENTC",
        "2019",
        "+91-9876-543214",
        "vikram.singh@example.com",
        "https://linkedin.com/in/vikram-singh",
        "Male",
        "Vodafone",
        "Mumbai, India",
        "Telecom Engineer",
        "2019-06-15",
        "2022-03-30",
        "IIT Delhi",
        "Delhi, India",
        "Electronics & Telecommunication Engineering",
        "2015",
        "2019",
      ],
      [
        "ALM006",
        "Ananya Gupta",
        "CS",
        "2020",
        "+91-9876-543215",
        "ananya.gupta@example.com",
        "https://linkedin.com/in/ananya-gupta",
        "Female",
        "Microsoft",
        "Bangalore, India",
        "Cloud Solutions Architect",
        "2020-07-01",
        "",
        "BITS Pilani",
        "Pilani, India",
        "Computer Science",
        "2018",
        "2020",
      ],
      [
        "ALM007",
        "Rohan Verma",
        "ENTC",
        "2018",
        "+91-9876-543216",
        "rohan.verma@example.com",
        "https://linkedin.com/in/rohan-verma",
        "Male",
        "Intel",
        "Santa Clara, CA",
        "Chip Design Engineer",
        "2018-08-01",
        "2022-06-30",
        "COEP Pune",
        "Pune, India",
        "Electronics & Telecommunication Engineering",
        "2014",
        "2018",
      ],
      [
        "ALM008",
        "Divya Malhotra",
        "AIDS",
        "2021",
        "+91-9876-543217",
        "divya.malhotra@example.com",
        "https://linkedin.com/in/divya-malhotra",
        "Female",
        "IBM",
        "New York, NY",
        "AI Research Specialist",
        "2021-06-01",
        "",
        "ISI Kolkata",
        "Kolkata, India",
        "Artificial Intelligence & Data Science",
        "2019",
        "2021",
      ],
      [
        "ALM009",
        "Sanjay Nair",
        "ECE",
        "2019",
        "+91-9876-543218",
        "sanjay.nair@example.com",
        "https://linkedin.com/in/sanjay-nair",
        "Male",
        "Nvidia",
        "Austin, TX",
        "GPU Architect",
        "2019-09-15",
        "",
        "NIT Rourkela",
        "Rourkela, India",
        "Electronics & Communication Engineering",
        "2017",
        "2019",
      ],
      [
        "ALM010",
        "Tanya Joshi",
        "IT",
        "2020",
        "+91-9876-543219",
        "tanya.joshi@example.com",
        "https://linkedin.com/in/tanya-joshi",
        "Female",
        "Adobe",
        "San Jose, CA",
        "Software Engineer",
        "2020-08-01",
        "",
        "Anna University",
        "Chennai, India",
        "Information Technology",
        "2018",
        "2020",
      ],
      [
        "ALM011",
        "Nikhil Deshmukh",
        "CS",
        "2019",
        "+91-9876-543220",
        "nikhil.deshmukh@example.com",
        "https://linkedin.com/in/nikhil-deshmukh",
        "Male",
        "Goldman Sachs",
        "Mumbai, India",
        "Senior Developer",
        "2019-07-01",
        "",
        "IIT Madras",
        "Chennai, India",
        "Computer Science",
        "2017",
        "2019",
      ],
      [
        "ALM012",
        "Harsh Patel",
        "IT",
        "2021",
        "+91-9876-543221",
        "harsh.patel@example.com",
        "https://linkedin.com/in/harsh-patel",
        "Male",
        "Accenture",
        "Bangalore, India",
        "IT Consultant",
        "2021-09-01",
        "",
        "VIT Vellore",
        "Vellore, India",
        "Information Technology",
        "2019",
        "2021",
      ],
    ];

    return [headers, fieldDescriptions, ...sampleRows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
  }

  static downloadCSVTemplate(): void {
    const csv = this.generateCSVTemplate();
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "alumni-import-template.csv";
    link.click();
  }
}
