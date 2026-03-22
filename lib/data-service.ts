// In-memory database for demo purposes
// In production, replace with actual database (Supabase, PostgreSQL, etc.)

import { Alumni, AlumniImportLog, Event, EventRegistration, ImportError } from './types';

class DataService {
  private alumni: Map<string, Alumni> = new Map();
  private events: Map<string, Event> = new Map();
  private registrations: Map<string, EventRegistration> = new Map();
  private importLogs: Map<string, AlumniImportLog> = new Map();

  // Alumni operations
  addAlumni(alumnus: Alumni): void {
    this.alumni.set(alumnus.id, alumnus);
  }

  getAllAlumni(): Alumni[] {
    return Array.from(this.alumni.values());
  }

  getAlumniById(id: string): Alumni | undefined {
    return this.alumni.get(id);
  }

  updateAlumni(id: string, updates: Partial<Alumni>): void {
    const existing = this.alumni.get(id);
    if (existing) {
      this.alumni.set(id, { ...existing, ...updates, updatedAt: new Date() });
    }
  }

  deleteAlumni(id: string): void {
    this.alumni.delete(id);
  }

  // Event operations
  addEvent(event: Event): void {
    this.events.set(event.id, event);
  }

  getAllEvents(): Event[] {
    return Array.from(this.events.values());
  }

  getEventById(id: string): Event | undefined {
    return this.events.get(id);
  }

  updateEvent(id: string, updates: Partial<Event>): void {
    const existing = this.events.get(id);
    if (existing) {
      this.events.set(id, { ...existing, ...updates, updatedAt: new Date() });
    }
  }

  deleteEvent(id: string): void {
    this.events.delete(id);
  }

  // Registration operations
  addRegistration(registration: EventRegistration): void {
    this.registrations.set(registration.id, registration);
  }

  getRegistrationsByEvent(eventId: string): EventRegistration[] {
    return Array.from(this.registrations.values()).filter(r => r.eventId === eventId);
  }

  getRegistrationsByAlumni(alumniId: string): EventRegistration[] {
    return Array.from(this.registrations.values()).filter(r => r.alumniId === alumniId);
  }

  updateRegistration(id: string, updates: Partial<EventRegistration>): void {
    const existing = this.registrations.get(id);
    if (existing) {
      this.registrations.set(id, { ...existing, ...updates });
    }
  }

  // Import log operations
  addImportLog(log: AlumniImportLog): void {
    this.importLogs.set(log.id, log);
  }

  getImportLogs(): AlumniImportLog[] {
    return Array.from(this.importLogs.values()).sort((a, b) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  }

  updateImportLog(id: string, updates: Partial<AlumniImportLog>): void {
    const existing = this.importLogs.get(id);
    if (existing) {
      this.importLogs.set(id, { ...existing, ...updates });
    }
  }

  // Statistics
  getStats() {
    const alumni = this.getAllAlumni();
    const events = this.getAllEvents();
    const now = new Date();
    const upcomingEvents = events.filter(e => new Date(e.date) > now).length;

    const branchBreakdown: Record<string, number> = {};
    const yearBreakdown: Record<number, number> = {};

    alumni.forEach(a => {
      branchBreakdown[a.branch] = (branchBreakdown[a.branch] || 0) + 1;
      yearBreakdown[a.graduationYear] = (yearBreakdown[a.graduationYear] || 0) + 1;
    });

    const attendedCount = Array.from(this.registrations.values()).filter(
      r => r.rsvpStatus === 'attended'
    ).length;
    const totalRegistrations = this.registrations.size;

    return {
      totalAlumni: alumni.length,
      totalEvents: events.length,
      upcomingEvents,
      attendanceRate: totalRegistrations > 0 ? (attendedCount / totalRegistrations) * 100 : 0,
      branchBreakdown,
      yearBreakdown,
    };
  }
}

export const dataService = new DataService();
