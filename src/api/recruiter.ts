import apiClient from './client';
import type {
  CompanyRequest,
  CompanyResponse,
  JobOfferRequest,
  JobOfferResponse,
  JobOfferDetailResponse,
} from '../types';

export async function createCompany(data: CompanyRequest): Promise<string> {
  const response = await apiClient.post<string>('/companies', data);
  return response.data;
}

export async function updateCompany(id: string, data: CompanyRequest): Promise<void> {
  await apiClient.put(`/companies/${id}`, data);
}

export async function getCompany(id: string): Promise<CompanyResponse> {
  const response = await apiClient.get<CompanyResponse>(`/companies/${id}`);
  return response.data;
}

export async function createOffer(data: JobOfferRequest): Promise<string> {
  const response = await apiClient.post<string>('/offers', data);
  return response.data;
}

export async function getOffers(): Promise<JobOfferResponse[]> {
  const response = await apiClient.get<JobOfferResponse[]>('/offers');
  return response.data;
}

export async function getOffer(id: string): Promise<JobOfferDetailResponse> {
  const response = await apiClient.get<JobOfferDetailResponse>(`/offers/${id}`);
  return response.data;
}

export async function updateOffer(id: string, data: JobOfferRequest): Promise<void> {
  await apiClient.put(`/offers/${id}`, data);
}

export async function publishOffer(id: string): Promise<void> {
  await apiClient.post(`/offers/${id}/publish`);
}
