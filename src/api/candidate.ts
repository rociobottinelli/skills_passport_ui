import apiClient from './client';
import type {
  CandidateProfileResponse,
  ProfileUpdateRequest,
  CompletionResponse,
  VerifyIdentityRequest,
  WorkExperienceRequest,
  WorkExperienceResponse,
  ProjectRequest,
  ProjectResponse,
} from '@/types';

export async function getProfile(): Promise<CandidateProfileResponse> {
  const response = await apiClient.get<CandidateProfileResponse>('/candidates/me');
  return response.data;
}

export async function updateProfile(data: ProfileUpdateRequest): Promise<void> {
  await apiClient.put('/candidates/me', data);
}

export async function uploadPhoto(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post<string>('/candidates/me/photo', formData);
  return response.data;
}

export async function getCompletion(): Promise<CompletionResponse> {
  const response = await apiClient.get<CompletionResponse>('/candidates/me/completion');
  return response.data;
}

export async function verifyIdentity(data: VerifyIdentityRequest): Promise<boolean> {
  const response = await apiClient.post<boolean>('/candidates/me/verify-identity', data);
  return response.data;
}

export async function getExperiences(): Promise<WorkExperienceResponse[]> {
  const response = await apiClient.get<WorkExperienceResponse[]>('/candidates/me/experience');
  return response.data;
}

export async function addExperience(data: WorkExperienceRequest): Promise<string> {
  const response = await apiClient.post<string>('/candidates/me/experience', data);
  return response.data;
}

export async function updateExperience(id: string, data: WorkExperienceRequest): Promise<void> {
  await apiClient.put(`/candidates/me/experience/${id}`, data);
}

export async function deleteExperience(id: string): Promise<void> {
  await apiClient.delete(`/candidates/me/experience/${id}`);
}

export async function getProjects(): Promise<ProjectResponse[]> {
  const response = await apiClient.get<ProjectResponse[]>('/candidates/me/projects');
  return response.data;
}

export async function addProject(data: ProjectRequest): Promise<string> {
  const response = await apiClient.post<string>('/candidates/me/projects', data);
  return response.data;
}

export async function updateProject(id: string, data: ProjectRequest): Promise<void> {
  await apiClient.put(`/candidates/me/projects/${id}`, data);
}

export async function deleteProject(id: string): Promise<void> {
  await apiClient.delete(`/candidates/me/projects/${id}`);
}
