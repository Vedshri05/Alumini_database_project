// Engineering branches
export const ENGINEERING_BRANCHES = {
  CS: "Computer Science",
  IT: "Information Technology",
  ENTC: "Electronics & Telecommunication",
  ECE: "Electronics & Communication Engineering",
  AIDS: "Artificial Intelligence & Data Science",
} as const;

export type EngineeringBranch = keyof typeof ENGINEERING_BRANCHES;

// Alumni data types
export interface Alumni {
  sId: string;
  sName: string;
  email: string;
  phoneNo?: string;
  graduationYear: number;
  branch: EngineeringBranch;
  linkedinProfile?: string;
  gender?: string;
  employment?: EmploymentDTO[];
  higherStudies?: HigherStudiesDTO[];
}

// Company data types
export interface Company {
  companyId: number;
  companyName: string;
  location?: string;
}

// Employment data types
export interface Employment {
  empId: number;
  sId: string;
  companyId: number;
  companyName: string;
  position: string;
  startDate: string;
  endDate?: string;
}

// Employment DTO data types (from backend)
export interface EmploymentDTO {
  empId: number;
  sId: string;
  companyId: number;
  companyName: string;
  companyLocation?: string;
  position: string;
  startDate: string;
  endDate?: string;
}

// Higher Studies data types
export interface HigherStudies {
  hsId: number;
  sId: string;
  collegeName: string;
  location?: string;
  domainOfStudy: string;
  startYear: number;
  endYear: number;
}

// Higher Studies DTO data types (from backend)
export interface HigherStudiesDTO {
  hsId: number;
  sId: string;
  collegeName: string;
  location?: string;
  domainOfStudy: string;
  startYear: number;
  endYear: number;
}

export interface AlumniImportLog {
  id: string;
  fileName: string;
  uploadedAt: Date;
  totalRecords: number;
  successfulRecords: number;
  failedRecords: number;
  status: "pending" | "processing" | "completed" | "failed";
  errors?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  eventType: "REUNION" | "WORKSHOP" | "WEBINAR" | "NETWORKING" | "SEMINAR";
  eventDate: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  capacity?: number;
  registeredCount: number;
  status: "DRAFT" | "PUBLISHED" | "ONGOING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  alumniId: string;
  registeredAt: Date;
  rsvpStatus: "registered" | "confirmed" | "attended" | "no-show" | "cancelled";
  attendanceQRCode?: string;
  checkedInAt?: Date;
}

export interface DashboardStats {
  totalAlumni: number;
  totalEvents: number;
  upcomingEvents: number;
  attendanceRate: number;
  branchBreakdown: Record<EngineeringBranch, number>;
  yearBreakdown: Record<number, number>;
}

export interface ImportError {
  row: number;
  field: string;
  value: string;
  error: string;
}
