// Engineering branches
export const ENGINEERING_BRANCHES = {
  CS: 'Computer Science',
  IT: 'Information Technology',
  ENTC: 'Electronics & Telecommunication',
  ECE: 'Electronics & Communication Engineering',
  AIDS: 'Artificial Intelligence & Data Science',
} as const;

export type EngineeringBranch = keyof typeof ENGINEERING_BRANCHES;

// Alumni data types
export interface Alumni {
  id: string;
  name: string;
  email: string;
  phone?: string;
  graduationYear: number;
  branch: EngineeringBranch;
  currentPosition?: string;
  company?: string;
  location?: string;
  linkedinUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AlumniImportLog {
  id: string;
  fileName: string;
  uploadedAt: Date;
  totalRecords: number;
  successfulRecords: number;
  failedRecords: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  errors?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  eventType: 'REUNION' | 'WORKSHOP' | 'WEBINAR' | 'NETWORKING' | 'SEMINAR';
  eventDate: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  capacity?: number;
  registeredCount: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  alumniId: string;
  registeredAt: Date;
  rsvpStatus: 'registered' | 'confirmed' | 'attended' | 'no-show' | 'cancelled';
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
