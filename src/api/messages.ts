import apiClient from './client';
import type {
  CreateThreadRequest,
  SendMessageRequest,
  AnonymousThreadResponse,
  AnonymousThreadDetailResponse,
} from '@/types';

export async function createThread(data: CreateThreadRequest): Promise<string> {
  const response = await apiClient.post<string>('/anonymous-threads', data);
  return response.data;
}

export async function getCandidateThreads(): Promise<AnonymousThreadResponse[]> {
  const response = await apiClient.get<AnonymousThreadResponse[]>('/candidates/me/anonymous-threads');
  return response.data;
}

export async function getCandidateThread(id: string): Promise<AnonymousThreadDetailResponse> {
  const response = await apiClient.get<AnonymousThreadDetailResponse>(`/candidates/me/anonymous-threads/${id}`);
  return response.data;
}

export async function getRecruiterThreads(): Promise<AnonymousThreadResponse[]> {
  const response = await apiClient.get<AnonymousThreadResponse[]>('/recruiters/me/anonymous-threads');
  return response.data;
}

export async function getOfferThreads(offerId: string): Promise<AnonymousThreadResponse[]> {
  const response = await apiClient.get<AnonymousThreadResponse[]>(`/offers/${offerId}/anonymous-threads`);
  return response.data;
}

export async function getOfferThread(offerId: string, threadId: string): Promise<AnonymousThreadDetailResponse> {
  const response = await apiClient.get<AnonymousThreadDetailResponse>(`/offers/${offerId}/anonymous-threads/${threadId}`);
  return response.data;
}

export async function sendMessage(threadId: string, data: SendMessageRequest): Promise<void> {
  await apiClient.post(`/anonymous-threads/${threadId}/messages`, data);
}
