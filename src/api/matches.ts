import apiClient from './client';
import type {
  CandidateMatchResponse,
  MatchDetailResponse,
  RecruiterCandidateMatchResponse,
} from '@/types';

export async function getCandidateMatches(): Promise<CandidateMatchResponse[]> {
  const response = await apiClient.get<CandidateMatchResponse[]>('/candidates/me/matches');
  return response.data;
}

export async function getMatchDetail(offerId: string): Promise<MatchDetailResponse> {
  const response = await apiClient.get<MatchDetailResponse>(`/candidates/me/matches/${offerId}`);
  return response.data;
}

export async function markInterest(offerId: string): Promise<void> {
  await apiClient.post(`/candidates/me/matches/${offerId}/interest`);
}

export async function markDecline(offerId: string): Promise<void> {
  await apiClient.post(`/candidates/me/matches/${offerId}/decline`);
}

export async function getOfferCandidates(offerId: string): Promise<RecruiterCandidateMatchResponse[]> {
  const response = await apiClient.get<RecruiterCandidateMatchResponse[]>(`/offers/${offerId}/candidates`);
  return response.data;
}

export async function getOfferCandidate(offerId: string, candidateId: string): Promise<RecruiterCandidateMatchResponse> {
  const response = await apiClient.get<RecruiterCandidateMatchResponse>(`/offers/${offerId}/candidates/${candidateId}`);
  return response.data;
}
