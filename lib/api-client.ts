/**
 * API Client for Spring Boot Backend
 * Handles all HTTP requests to the Spring Boot server
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

const DEBUG = process.env.NEXT_PUBLIC_DEBUG === "true";

const log = (message: string, data?: any) => {
  if (DEBUG) {
    console.log(`[ApiClient] ${message}`, data || "");
  }
};

const logError = (message: string, error?: any) => {
  console.error(`[ApiClient ERROR] ${message}`, error || "");
};

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    log("ApiClient initialized", { baseUrl: this.baseUrl });
  }

  // Health check - tests backend connectivity
  async checkHealth(): Promise<boolean> {
    try {
      log("Checking backend health...");
      const response = await fetch(`${this.baseUrl}/alumni`, {
        method: "HEAD",
      });
      const isHealthy = response.ok;
      log("Health check result:", { isHealthy, status: response.status });
      return isHealthy;
    } catch (e) {
      logError("Health check failed - Backend may not be running", e);
      return false;
    }
  }

  private async handleResponse<T>(
    response: Response,
    endpoint: string,
  ): Promise<T> {
    log(`Response received from ${endpoint}`, {
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get("content-type"),
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const error = await response.json();
        errorMessage = error.error || error.message || errorMessage;
      } catch (e) {
        logError(`Failed to parse error response from ${endpoint}`, e);
      }
      logError(`Endpoint ${endpoint} failed`, errorMessage);
      throw new Error(errorMessage);
    }

    try {
      const data = await response.json();
      log(`Successfully parsed response from ${endpoint}`);
      return data;
    } catch (e) {
      logError(`Failed to parse JSON response from ${endpoint}`, e);
      throw new Error("Invalid response format from server");
    }
  }

  // Alumni Endpoints
  async getAllAlumni() {
    const endpoint = "/alumni";
    log(`Fetching ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch alumni from ${endpoint}`, e);
      throw e;
    }
  }

  async getAlumniById(id: string) {
    const endpoint = `/alumni/${id}`;
    log(`Fetching ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch alumni from ${endpoint}`, e);
      throw e;
    }
  }

  async createAlumni(data: any) {
    const endpoint = "/alumni";
    log(`Creating alumni at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to create alumni at ${endpoint}`, e);
      throw e;
    }
  }

  async updateAlumni(id: string, data: any) {
    const endpoint = `/alumni/${id}`;
    log(`Updating alumni at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to update alumni at ${endpoint}`, e);
      throw e;
    }
  }

  async deleteAlumni(id: string) {
    const endpoint = `/alumni/${id}`;
    log(`Deleting alumni at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to delete alumni at ${endpoint}`, e);
      throw e;
    }
  }

  async uploadAlumniCSV(file: File) {
    const endpoint = "/alumni/upload";
    log(`Uploading file to ${endpoint}...`, {
      fileName: file.name,
      size: file.size,
    });
    try {
      const formData = new FormData();
      formData.append("files", file);

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        body: formData,
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to upload file to ${endpoint}`, e);
      throw e;
    }
  }

  // Events Endpoints
  async getAllEvents() {
    const endpoint = "/events";
    log(`Fetching ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch events from ${endpoint}`, e);
      throw e;
    }
  }

  async getEventById(id: string) {
    const endpoint = `/events/${id}`;
    log(`Fetching ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch event from ${endpoint}`, e);
      throw e;
    }
  }

  async createEvent(data: any) {
    const endpoint = "/events";
    log(`Creating event at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to create event at ${endpoint}`, e);
      throw e;
    }
  }

  async updateEvent(id: string, data: any) {
    const endpoint = `/events/${id}`;
    log(`Updating event at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to update event at ${endpoint}`, e);
      throw e;
    }
  }

  async deleteEvent(id: string) {
    const endpoint = `/events/${id}`;
    log(`Deleting event at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to delete event at ${endpoint}`, e);
      throw e;
    }
  }

  async getAlumniByBranch(branch: string) {
    const endpoint = `/alumni/branch/${branch}`;
    log(`Fetching alumni by branch at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch alumni by branch from ${endpoint}`, e);
      throw e;
    }
  }

  async getAlumniByYear(year: number) {
    const endpoint = `/alumni/year/${year}`;
    log(`Fetching alumni by year at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch alumni by year from ${endpoint}`, e);
      throw e;
    }
  }

  async searchAlumni(query: string) {
    const endpoint = `/alumni/search?query=${encodeURIComponent(query)}`;
    log(`Searching alumni at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to search alumni from ${endpoint}`, e);
      throw e;
    }
  }

  async getAlumniStatistics() {
    const endpoint = "/alumni/stats/overview";
    log(`Fetching alumni statistics at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch alumni statistics from ${endpoint}`, e);
      throw e;
    }
  }

  // Events Endpoints (Extended)
  async getUpcomingEvents() {
    const endpoint = "/events/upcoming";
    log(`Fetching upcoming events at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch upcoming events from ${endpoint}`, e);
      throw e;
    }
  }

  async getPastEvents() {
    const endpoint = "/events/past";
    log(`Fetching past events at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch past events from ${endpoint}`, e);
      throw e;
    }
  }

  async getEventsByType(type: string) {
    const endpoint = `/events/type/${type}`;
    log(`Fetching events by type at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch events by type from ${endpoint}`, e);
      throw e;
    }
  }

  async getEventsByStatus(status: string) {
    const endpoint = `/events/status/${status}`;
    log(`Fetching events by status at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch events by status from ${endpoint}`, e);
      throw e;
    }
  }

  async searchEvents(query: string) {
    const endpoint = `/events/search?query=${encodeURIComponent(query)}`;
    log(`Searching events at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to search events from ${endpoint}`, e);
      throw e;
    }
  }

  async getEventStatistics() {
    const endpoint = "/events/stats/overview";
    log(`Fetching event statistics at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch event statistics from ${endpoint}`, e);
      throw e;
    }
  }

  // Attendance Endpoints
  async registerForEvent(eventId: string, alumniId: string) {
    const endpoint = `/attendance/register?eventId=${eventId}&alumniId=${alumniId}`;
    log(`Registering alumni for event at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to register for event at ${endpoint}`, e);
      throw e;
    }
  }

  async markAttendance(eventId: string, alumniId: string) {
    const endpoint = `/attendance/check-in?eventId=${eventId}&alumniId=${alumniId}`;
    log(`Marking attendance at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to mark attendance at ${endpoint}`, e);
      throw e;
    }
  }

  async getEventAttendance(eventId: string) {
    const endpoint = `/attendance/event/${eventId}`;
    log(`Fetching event attendance at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch event attendance from ${endpoint}`, e);
      throw e;
    }
  }

  async getAttendedEventsByAlumni(alumniId: string) {
    const endpoint = `/attendance/alumni/${alumniId}`;
    log(`Fetching attended events for alumni at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch attended events from ${endpoint}`, e);
      throw e;
    }
  }

  async getAttendanceRate(eventId: string) {
    const endpoint = `/attendance/event/${eventId}/rate`;
    log(`Fetching attendance rate at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch attendance rate from ${endpoint}`, e);
      throw e;
    }
  }

  async getEventAttendanceStats(eventId: string) {
    const endpoint = `/attendance/event/${eventId}/stats`;
    log(`Fetching event attendance stats at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch event attendance stats from ${endpoint}`, e);
      throw e;
    }
  }

  async getAllAttendance() {
    const endpoint = "/attendance";
    log(`Fetching all attendance at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch all attendance from ${endpoint}`, e);
      throw e;
    }
  }

  async updateAttendanceStatus(id: string, status: string) {
    const endpoint = `/attendance/${id}/status?status=${status}`;
    log(`Updating attendance status at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to update attendance status at ${endpoint}`, e);
      throw e;
    }
  }

  // Jobs Endpoints
  async getJobs() {
    const endpoint = "/jobs";
    log(`Fetching all jobs at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch jobs from ${endpoint}`, e);
      throw e;
    }
  }

  async getJobById(id: string) {
    const endpoint = `/jobs/${id}`;
    log(`Fetching job at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch job from ${endpoint}`, e);
      throw e;
    }
  }

  async createJob(data: any) {
    const endpoint = "/jobs";
    log(`Creating job at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to create job at ${endpoint}`, e);
      throw e;
    }
  }

  async updateJob(id: string, data: any) {
    const endpoint = `/jobs/${id}`;
    log(`Updating job at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to update job at ${endpoint}`, e);
      throw e;
    }
  }

  async deleteJob(id: string) {
    const endpoint = `/jobs/${id}`;
    log(`Deleting job at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to delete job at ${endpoint}`, e);
      throw e;
    }
  }

  async applyJob(jobId: string, studentEmail: string) {
    const endpoint = `/jobs/${jobId}/apply`;
    log(`Applying to job at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentEmail }),
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to apply to job at ${endpoint}`, e);
      throw e;
    }
  }

  async getAlumniJobs(alumniEmail: string) {
    const endpoint = `/jobs/alumni/${encodeURIComponent(alumniEmail)}`;
    log(`Fetching alumni jobs at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch alumni jobs from ${endpoint}`, e);
      throw e;
    }
  }

  // Employment Endpoints
  async getAllEmployment() {
    const endpoint = "/employment";
    log(`Fetching all employment records at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch employment records from ${endpoint}`, e);
      throw e;
    }
  }

  async getEmploymentById(id: string) {
    const endpoint = `/employment/${id}`;
    log(`Fetching employment record at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch employment record from ${endpoint}`, e);
      throw e;
    }
  }

  async createEmployment(data: any) {
    const endpoint = "/employment";
    log(`Creating employment record at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to create employment record at ${endpoint}`, e);
      throw e;
    }
  }

  async updateEmployment(id: string, data: any) {
    const endpoint = `/employment/${id}`;
    log(`Updating employment record at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to update employment record at ${endpoint}`, e);
      throw e;
    }
  }

  async deleteEmployment(id: string) {
    const endpoint = `/employment/${id}`;
    log(`Deleting employment record at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to delete employment record at ${endpoint}`, e);
      throw e;
    }
  }

  async getStudentEmployment(studentEmail: string) {
    const endpoint = `/employment/student/${encodeURIComponent(studentEmail)}`;
    log(`Fetching student employment at ${endpoint}...`);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return this.handleResponse(response, endpoint);
    } catch (e) {
      logError(`Failed to fetch student employment from ${endpoint}`, e);
      throw e;
    }
  }
}

export const apiClient = new ApiClient();
