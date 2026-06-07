import apiClient from './client';
import type { SkillResponse, CandidateSkillResponse, AddSkillRequest } from '../types';

export async function searchSkills(query?: string): Promise<SkillResponse[]> {
  const response = await apiClient.get<SkillResponse[]>('/skills', {
    params: query ? { search: query } : undefined,
  });
  return response.data;
}

export async function getSuggestions(): Promise<SkillResponse[]> {
  const response = await apiClient.get<SkillResponse[]>('/skills/suggestions');
  return response.data;
}

export async function getCandidateSkills(): Promise<CandidateSkillResponse[]> {
  const response = await apiClient.get<CandidateSkillResponse[]>('/candidates/me/skills');
  return response.data;
}

export async function addSkill(data: AddSkillRequest): Promise<void> {
  await apiClient.post('/candidates/me/skills', data);
}

export async function removeSkill(id: string): Promise<void> {
  await apiClient.delete(`/candidates/me/skills/${id}`);
}
