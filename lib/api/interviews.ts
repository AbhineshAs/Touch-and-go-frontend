import { Interview, InterviewScorecard } from "@/types";
import { MOCK_INTERVIEWS } from "@/lib/mocks/data";
import { mockDelay } from "./delay";

let interviewsState: Interview[] = [...MOCK_INTERVIEWS];

export async function getInterviews(): Promise<Interview[]> {
  await mockDelay(150);
  return [...interviewsState];
}

export async function scheduleInterview(
  payload: {
    applicationId: string;
    candidateId: string;
    candidateName: string;
    jobId: string;
    jobTitle: string;
    scheduledAt: string;
    durationMinutes: number;
    interviewerName: string;
    interviewerRole: string;
    interviewerEmail: string;
    meetingLink: string;
    candidateNote?: string;
  }
): Promise<Interview> {
  await mockDelay(200);
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

  interviewsState = [newInterview, ...interviewsState];
  return newInterview;
}

export async function submitScorecard(
  interviewId: string,
  scorecard: InterviewScorecard
): Promise<Interview> {
  await mockDelay(150);
  const index = interviewsState.findIndex((i) => i.id === interviewId);
  if (index === -1) throw new Error("Interview not found");

  interviewsState[index] = {
    ...interviewsState[index],
    status: "Completed",
    scorecard,
  };

  return interviewsState[index];
}
