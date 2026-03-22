import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useApi<T = any>(options?: UseApiOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (apiCall: () => Promise<any>) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiCall();
        const result = response.data || response;
        setData(result);
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        options?.onError?.(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}

// Specific hooks for common operations
export function useAlumni() {
  const { data, loading, error, execute } = useApi();

  const fetchAll = useCallback(() => execute(() => apiClient.getAllAlumni()), [execute]);
  const fetchById = useCallback((id: string) => execute(() => apiClient.getAlumniById(id)), [execute]);
  const create = useCallback((data: any) => execute(() => apiClient.createAlumni(data)), [execute]);
  const update = useCallback((id: string, data: any) => execute(() => apiClient.updateAlumni(id, data)), [execute]);
  const remove = useCallback((id: string) => execute(() => apiClient.deleteAlumni(id)), [execute]);
  const search = useCallback((query: string) => execute(() => apiClient.searchAlumni(query)), [execute]);

  return { data, loading, error, fetchAll, fetchById, create, update, remove, search };
}

export function useEvents() {
  const { data, loading, error, execute } = useApi();

  const fetchAll = useCallback(() => execute(() => apiClient.getAllEvents()), [execute]);
  const fetchById = useCallback((id: string) => execute(() => apiClient.getEventById(id)), [execute]);
  const fetchUpcoming = useCallback(() => execute(() => apiClient.getUpcomingEvents()), [execute]);
  const fetchPast = useCallback(() => execute(() => apiClient.getPastEvents()), [execute]);
  const create = useCallback((data: any) => execute(() => apiClient.createEvent(data)), [execute]);
  const update = useCallback((id: string, data: any) => execute(() => apiClient.updateEvent(id, data)), [execute]);
  const remove = useCallback((id: string) => execute(() => apiClient.deleteEvent(id)), [execute]);
  const search = useCallback((query: string) => execute(() => apiClient.searchEvents(query)), [execute]);

  return { data, loading, error, fetchAll, fetchById, fetchUpcoming, fetchPast, create, update, remove, search };
}

export function useAttendance() {
  const { data, loading, error, execute } = useApi();

  const register = useCallback(
    (eventId: string, alumniId: string) => execute(() => apiClient.registerForEvent(eventId, alumniId)),
    [execute]
  );
  const markAttendance = useCallback(
    (eventId: string, alumniId: string) => execute(() => apiClient.markAttendance(eventId, alumniId)),
    [execute]
  );
  const fetchEventAttendance = useCallback(
    (eventId: string) => execute(() => apiClient.getEventAttendance(eventId)),
    [execute]
  );
  const fetchAlumniEvents = useCallback(
    (alumniId: string) => execute(() => apiClient.getAttendedEventsByAlumni(alumniId)),
    [execute]
  );

  return { data, loading, error, register, markAttendance, fetchEventAttendance, fetchAlumniEvents };
}
