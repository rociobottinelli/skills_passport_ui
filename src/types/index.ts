export type UserType = 'CANDIDATE' | 'RECRUITER';

export type SkillLevel = 'COLABORADOR' | 'EJECUTOR_AUTONOMO' | 'LIDER' | 'REFERENTE';

export type ExperienceRange = '<1 year' | '1-3 years' | '4-6 years' | '7-10 years' | '10+ years';

export type RelationType = 'NONE' | 'CLASSMATE' | 'COWORKER' | 'TEAMMATE' | 'TECHLEAD' | 'MANAGER';

export type ReputationLevel = 'BRONCE' | 'PLATA' | 'ORO' | 'PLATINO';

export type OfferStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED';

export type Modality = 'REMOTE' | 'HYBRID' | 'ONSITE';

export type Seniority = 'JUNIOR' | 'SEMI_SENIOR' | 'SENIOR' | 'LEAD';

export type MatchStatus = 'SUGGESTED' | 'INTERESTED' | 'NOT_INTERESTED';

export type ThreadCategory = 'SALARY' | 'CULTURE' | 'STACK' | 'BENEFITS' | 'MODALITY' | 'OTHER';

export type ThreadStatus = 'PENDING' | 'RESPONDED';

export type RequestStatus = 'PENDING' | 'COMPLETED' | 'REJECTED';

export type SenderType = 'CANDIDATE' | 'RECRUITER';

export type SkillType = 'TECH' | 'SOFT';

export type Industry = 'TECH' | 'FINANCE' | 'ECOMMERCE' | 'CONSULTING' | 'OTHER';

export type CompanySize = '1-10' | '11-50' | '51-200' | '201-1000' | '1000+';

export type Requirement = 'REQUIRED' | 'DESIRABLE';

// --- Auth ---

export interface AuthResponse {
  token: string;
  userType: UserType;
}

export interface RegisterRequest {
  email: string;
  password: string;
  userType: UserType;
  fullName?: string;
  location?: string;
  currentRole?: string;
  companyName?: string;
  website?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// --- Candidate Profile ---

export interface CandidateProfileResponse {
  id: string;
  fullName: string;
  email: string;
  location: string;
  currentRole: string;
  headline: string | null;
  profilePhoto: string | null;
  phone: string | null;
  linkedIn: string | null;
  identityVerified: boolean;
  profileCompletion: number;
}

export interface ProfileUpdateRequest {
  location?: string;
  currentRole?: string;
  headline?: string;
  phone?: string;
  linkedIn?: string;
}

// --- Skills ---

export interface SkillResponse {
  id: string;
  name: string;
  type: SkillType;
}

export interface CandidateSkillResponse {
  id: string;
  skillId: string;
  skillName: string;
  skillType: SkillType;
  experienceRange: string;
  consolidatedLevel: string | null;
  consolidatedScore: number | null;
}

export interface AddSkillRequest {
  skillId: string;
  experienceRange: ExperienceRange;
}

// --- Validations ---

export interface ValidationRequestPayload {
  skillId: string;
  validatorId: string;
  relationType: RelationType;
  message?: string;
}

export interface SubmitValidationRequest {
  requestId: string;
  assignedLevel: SkillLevel;
  comment?: string;
}

export interface ValidationResponse {
  id: string;
  skillName: string;
  candidateName: string;
  validatorName: string;
  assignedLevel: string;
  comment: string | null;
  createdAt: string;
}

export interface ValidationRequestResponse {
  id: string;
  skillName: string;
  requesterName: string;
  relationType: string;
  message: string | null;
  status: RequestStatus;
}

export interface SuggestedValidator {
  candidateId: string;
  fullName: string;
  seniority: string;
  confidenceScore: number;
}

// --- Job Offers ---

export interface OfferSkillRequest {
  skillId: string;
  requirement: 'REQUIRED' | 'DESIRABLE';
}

export interface OfferSkillResponse {
  skillId: string;
  skillName: string;
  skillType: SkillType;
  requirement: 'REQUIRED' | 'DESIRABLE';
}

export interface JobOfferRequest {
  title: string;
  modality: Modality;
  seniority: Seniority;
  description?: string;
  salaryMin?: number;
  salaryMax?: number;
  location?: string;
  benefits?: string;
  skills?: OfferSkillRequest[];
}

export interface JobOfferResponse {
  id: string;
  title: string;
  modality: string;
  seniority: string;
  status: OfferStatus;
  location: string | null;
  createdAt: string;
}

export interface JobOfferDetailResponse {
  id: string;
  title: string;
  modality: string;
  seniority: string;
  description: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  benefits: string | null;
  location: string | null;
  status: OfferStatus;
  createdAt: string;
  skills: OfferSkillResponse[];
}

// --- Company ---

export interface CompanyRequest {
  name: string;
  website?: string;
  industry?: Industry;
  size?: CompanySize;
  cultureDescription?: string;
}

export interface CompanyResponse {
  id: string;
  name: string;
  logo: string | null;
  website: string | null;
  industry: string | null;
  size: string | null;
  cultureDescription: string | null;
  isPartner: boolean;
}

// --- Matches ---

export interface CandidateMatchResponse {
  offerId: string;
  offerTitle: string;
  companyName: string;
  matchScore: number;
  status: MatchStatus;
}

export interface MatchingSkillResponse {
  name: string;
  experienceRange: string;
  consolidatedLevel: string | null;
}

export interface MissingSkillResponse {
  name: string;
  requirement: 'REQUIRED' | 'DESIRABLE';
}

export interface MatchDetailResponse {
  offerId: string;
  offerTitle: string;
  companyName: string;
  matchScore: number;
  status: MatchStatus;
  profileRevealed: boolean;
  description: string | null;
  matchingSkills: MatchingSkillResponse[];
  missingSkills: MissingSkillResponse[];
}

export interface RecruiterCandidateMatchResponse {
  matchId: string;
  candidateId: string;
  offerId: string;
  matchScore: number;
  profileRevealed: boolean;
  candidateName: string | null;
  currentRole: string | null;
  location: string | null;
  identityVerified: boolean;
  skills: string[];
  email: string | null;
  linkedIn: string | null;
}

// --- Anonymous Messaging ---

export interface CreateThreadRequest {
  offerId: string;
  category: ThreadCategory;
  message: string;
}

export interface SendMessageRequest {
  content: string;
}

export interface AnonymousThreadResponse {
  id: string;
  anonymousCode: string;
  category: string;
  status: ThreadStatus;
  offerId?: string;
  createdAt: string;
}

export interface AnonymousMessageResponse {
  id: string;
  senderType: SenderType;
  content: string;
  createdAt: string;
}

export interface AnonymousThreadDetailResponse {
  id: string;
  anonymousCode: string;
  category: string;
  status: ThreadStatus;
  offerId?: string;
  offerTitle?: string;
  companyName?: string;
  messages: AnonymousMessageResponse[];
  createdAt: string;
}

// --- Work Experience ---

export interface WorkExperienceRequest {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
}

export interface WorkExperienceResponse {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
}

// --- Projects ---

export interface ProjectRequest {
  title: string;
  description?: string;
  link?: string;
}

export interface ProjectResponse {
  id: string;
  title: string;
  description: string | null;
  link: string | null;
}

// --- Identity Verification ---

export interface VerifyIdentityRequest {
  dni: string;
  tramiteNumber: string;
}

// --- Completion ---

export interface CompletionResponse {
  percentage: number;
}
