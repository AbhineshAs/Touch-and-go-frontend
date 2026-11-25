import { Interview, InterviewScorecard } from "@/types";
import { MOCK_INTERVIEWS } from "@/lib/mocks/data";
import { api, ApiError } from "./client";
import { mockDelay } from "./delay";

let mockInterviewsState: Interview[] = [...MOCK_INTERVIEWS];

export interface InterviewFilters {
  applicationId?: string;
  candidateId?: string;
  candidateEmail?: string;
  jobId?: string;
  status?: string;
  search?: string;
}

export async function getInterviews(filters?: InterviewFilters): Promise<Interview[]> {
  try {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.applicationId) params.set("applicationId", filters.applicationId);
      if (filters.candidateId) params.set("candidateId", filters.candidateId);
      if (filters.candidateEmail) params.set("candidateEmail", filters.candidateEmail);
      if (filters.jobId) params.set("jobId", filters.jobId);
      if (filters.status && filters.status !== "All") params.set("status", filters.status);
      if (filters.search) params.set("search", filters.search);
    }

    const query = params.toString() ? `?${params.toString()}` : "";
    const data = await api.get<Interview[]>(`/interviews/${query}`);
    if (Array.isArray(data)) {
      return data;
    }
  } catch (err) {
    // Graceful fallback to mock interviews when backend is offline
    if (err instanceof ApiError && err.status === 0) {
      await mockDelay(100);
      return [...mockInterviewsState];
    }
    console.warn("Falling back to local interviews data:", err);
  }

  await mockDelay(100);
  return [...mockInterviewsState];
}

export async function scheduleInterview(payload: {
  applicationId: string;
  candidateId: string;
  candidateName: string;
  candidateEmail?: string;
  jobId: string;
  jobTitle: string;
  roundName?: string;
  scheduledAt: string;
  durationMinutes: number;
  interviewerName: string;
  interviewerRole: string;
  interviewerEmail: string;
  meetingLink: string;
  meetingPlatform?: string;
  candidateNote?: string;
  internalNotes?: string;
}): Promise<Interview> {
  try {
    const created = await api.post<Interview>("/interviews/", payload);
    if (created && created.id) {
      mockInterviewsState = [created, ...mockInterviewsState];
      return created;
    }
  } catch (err) {
    if (!(err instanceof ApiError && err.status === 0)) {
      console.warn("Backend schedule error, falling back to mock state:", err);
    }
  }

  await mockDelay(150);
  const newInterview: Interview = {
    id: `int_${Date.now()}`,
    applicationId: payload.applicationId,
    candidateId: payload.candidateId,
    candidateName: payload.candidateName,
    jobId: payload.jobId,
    jobTitle: payload.jobTitle,
    scheduledAt: payload.scheduledAt,
    durationMinutes: payload.durationMinutes,
    interviewerName: payload.interviewerName,
    interviewerRole: payload.interviewerRole,
    interviewerEmail: payload.interviewerEmail,
    meetingLink: payload.meetingLink,
    candidateNote: payload.candidateNote,
    status: "Scheduled",
  };

  mockInterviewsState = [newInterview, ...mockInterviewsState];
  return newInterview;
}

export async function rescheduleInterview(
  interviewId: string,
  scheduledAt: string,
  durationMinutes?: number
): Promise<Interview> {
  try {
    const updated = await api.patch<Interview>(`/interviews/${interviewId}/`, {
      scheduledAt,
      ...(durationMinutes ? { durationMinutes } : {}),
      status: "Rescheduled",
    });
    if (updated && updated.id) {
      const idx = mockInterviewsState.findIndex((i) => i.id === interviewId);
      if (idx !== -1) mockInterviewsState[idx] = updated;
      return updated;
    }
  } catch (err) {
    console.warn("Backend reschedule error, updating mock state:", err);
  }

  await mockDelay(100);
  const index = mockInterviewsState.findIndex((i) => i.id === interviewId);
  if (index === -1) throw new Error("Interview not found");

  mockInterviewsState[index] = {
    ...mockInterviewsState[index],
    scheduledAt,
    durationMinutes: durationMinutes || mockInterviewsState[index].durationMinutes,
    status: "Rescheduled",
  };

  return mockInterviewsState[index];
}

export async function cancelInterview(
  interviewId: string,
  cancellationReason: string = "Cancelled by employer"
): Promise<Interview> {
  try {
    const updated = await api.post<Interview>(`/interviews/${interviewId}/cancel/`, {
      cancellationReason,
    });
    if (updated && updated.id) {
      const idx = mockInterviewsState.findIndex((i) => i.id === interviewId);
      if (idx !== -1) mockInterviewsState[idx] = updated;
      return updated;
    }
  } catch (err) {
    console.warn("Backend cancel error, updating mock state:", err);
  }

  await mockDelay(100);
  const index = mockInterviewsState.findIndex((i) => i.id === interviewId);
  if (index === -1) throw new Error("Interview not found");

  mockInterviewsState[index] = {
    ...mockInterviewsState[index],
    status: "Cancelled",
  };

  return mockInterviewsState[index];
}

export async function submitScorecard(
  interviewId: string,
  scorecard: InterviewScorecard
): Promise<Interview> {
  try {
    const updated = await api.post<Interview>(`/interviews/${interviewId}/scorecard/`, scorecard);
    if (updated && updated.id) {
      const idx = mockInterviewsState.findIndex((i) => i.id === interviewId);
      if (idx !== -1) mockInterviewsState[idx] = updated;
      return updated;
    }
  } catch (err) {
    console.warn("Backend scorecard error, updating mock state:", err);
  }

  await mockDelay(150);
  const index = mockInterviewsState.findIndex((i) => i.id === interviewId);
  if (index === -1) throw new Error("Interview not found");

  mockInterviewsState[index] = {
    ...mockInterviewsState[index],
    status: "Completed",
    scorecard,
  };

  return mockInterviewsState[index];
}
