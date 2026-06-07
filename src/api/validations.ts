import apiClient from './client';
import type {
  ValidationResponse,
  ValidationRequestResponse,
  ValidationRequestPayload,
  SubmitValidationRequest,
  SuggestedValidator,
} from '../types';

export async function getValidationsGiven(): Promise<ValidationResponse[]> {
  const response = await apiClient.get<ValidationResponse[]>('/candidates/me/validations/given');
  return response.data;
}

export async function getValidationsReceived(): Promise<ValidationResponse[]> {
  const response = await apiClient.get<ValidationResponse[]>('/candidates/me/validations/received');
  return response.data;
}

export async function getIncomingRequests(status?: string): Promise<ValidationRequestResponse[]> {
  const response = await apiClient.get<ValidationRequestResponse[]>('/candidates/me/validation-requests', {
    params: status ? { status } : undefined,
  });
  return response.data;
}

export async function getSentRequests(status?: string): Promise<ValidationRequestResponse[]> {
  const response = await apiClient.get<ValidationRequestResponse[]>('/candidates/me/validation-requests/sent', {
    params: status ? { status } : undefined,
  });
  return response.data;
}

export async function createValidationRequest(data: ValidationRequestPayload): Promise<void> {
  await apiClient.post('/candidates/me/validation-requests', data);
}

export async function getSuggestedValidators(skillId: string): Promise<SuggestedValidator[]> {
  const response = await apiClient.get<SuggestedValidator[]>(`/skills/${skillId}/suggested-validators`);
  return response.data;
}

export async function submitValidation(data: SubmitValidationRequest): Promise<void> {
  await apiClient.post('/validations', data);
}

export async function rejectValidationRequest(id: string): Promise<void> {
  await apiClient.post(`/validation-requests/${id}/reject`);
}
