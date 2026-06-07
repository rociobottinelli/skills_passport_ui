# Skill Passport — Backend Specification

Specification derived from the UI to guide the backend implementation.

---

## 1. Entities & Attributes

### 1.1 User

Base entity for authentication. Both candidates and recruiters authenticate through the same login screen selecting their role.

| Attribute        | Type    | Required | Notes                          |
|------------------|---------|----------|--------------------------------|
| id               | UUID    | yes      | PK                             |
| email            | string  | yes      | unique, used for login         |
| password         | string  | yes      | hashed                         |
| userType         | enum    | yes      | `candidate` \| `recruiter`     |
| createdAt        | datetime| yes      |                                |

---

### 1.2 Candidate

| Attribute           | Type    | Required | Notes                                         |
|----------------------|---------|----------|-----------------------------------------------|
| id                   | UUID    | yes      | PK, FK → User                                |
| fullName             | string  | yes      | registration field                            |
| location             | string  | yes      | e.g. "Buenos Aires, Argentina"                |
| currentRole          | string  | yes      | e.g. "Senior Backend Engineer"                |
| headline             | string  | no       | onboarding step 1                             |
| profilePhoto         | string  | no       | URL to uploaded photo                         |
| phone                | string  | no       | shared on profile reveal                      |
| linkedIn             | string  | no       | shared on profile reveal                      |
| identityVerified     | boolean | yes      | default `false`, set `true` after RENAPER     |
| dni                  | string  | no       | used only for RENAPER verification, not stored permanently |
| profileCompletion    | integer | yes      | calculated 0-100%                             |
| createdAt            | datetime| yes      |                                               |

---

### 1.3 Recruiter

| Attribute  | Type    | Required | Notes              |
|------------|---------|----------|--------------------|
| id         | UUID    | yes      | PK, FK → User     |
| companyId  | UUID    | yes      | FK → Company       |
| createdAt  | datetime| yes      |                    |

---

### 1.4 Company

| Attribute           | Type   | Required | Notes                                                    |
|----------------------|--------|----------|----------------------------------------------------------|
| id                   | UUID   | yes      | PK                                                       |
| name                 | string | yes      |                                                          |
| logo                 | string | no       | URL to uploaded logo                                     |
| website              | string | no       |                                                          |
| industry             | enum   | no       | `tech` \| `finance` \| `ecommerce` \| `consulting` \| `other` |
| size                 | enum   | no       | `1-10` \| `11-50` \| `51-200` \| `201-1000` \| `1000+`  |
| cultureDescription   | text   | no       | free text about culture & values                         |
| isPartner            | boolean| yes      | default `false`, verified companies                      |
| createdAt            | datetime| yes     |                                                          |

---

### 1.5 Skill

Master catalog of skills.

| Attribute | Type   | Required | Notes                        |
|-----------|--------|----------|------------------------------|
| id        | UUID   | yes      | PK                           |
| name      | string | yes      | unique, e.g. "Java", "Liderazgo tecnico" |
| type      | enum   | yes      | `tech` \| `soft`             |

---

### 1.6 CandidateSkill

A skill self-declared by a candidate during onboarding or later.

| Attribute         | Type    | Required | Notes                                              |
|--------------------|---------|----------|------------------------------------------------------|
| id                 | UUID    | yes      | PK                                                   |
| candidateId        | UUID    | yes      | FK → Candidate                                       |
| skillId            | UUID    | yes      | FK → Skill                                           |
| experienceRange    | enum    | yes      | `<1 year` \| `1-3 years` \| `4-6 years` \| `7-10 years` \| `10+ years` |
| consolidatedLevel  | enum    | no       | calculated — see SkillLevel enum                     |
| consolidatedScore  | decimal | no       | calculated 0.0–10.0                                  |
| createdAt          | datetime| yes      |                                                      |

**SkillLevel enum:** `Colaborador` (1) → `Ejecutor autonomo` (2) → `Lider` (3) → `Referente` (4)

Level meaning:
- **Colaborador**: worked with it on assigned tasks
- **Ejecutor autonomo**: solved it independently
- **Lider**: led initiatives using this skill
- **Referente**: reference-level, mentors others

---

### 1.7 Validation

A peer validation of a candidate's skill, submitted by another user.

| Attribute       | Type    | Required | Notes                                    |
|------------------|---------|----------|------------------------------------------|
| id               | UUID    | yes      | PK                                       |
| validationRequestId | UUID | yes      | FK → ValidationRequest                   |
| validatorId      | UUID    | yes      | FK → Candidate (the user validating)     |
| candidateId      | UUID    | yes      | FK → Candidate (being validated)         |
| skillId          | UUID    | yes      | FK → Skill                               |
| assignedLevel    | enum    | yes      | SkillLevel assigned by the validator     |
| comment          | text    | no       | appears as quote on the candidate profile |
| createdAt        | datetime| yes      |                                          |

---

### 1.8 ValidationRequest

A request from a candidate asking another user to validate one of their skills.

| Attribute      | Type    | Required | Notes                                      |
|-----------------|---------|----------|--------------------------------------------|
| id              | UUID    | yes      | PK                                         |
| requesterId     | UUID    | yes      | FK → Candidate (who asks)                  |
| validatorId     | UUID    | yes      | FK → Candidate (who is asked)              |
| skillId         | UUID    | yes      | FK → Skill                                 |
| relationType    | enum    | yes      | see RelationType enum                      |
| message         | text    | no       | optional personal message                  |
| status          | enum    | yes      | `pending` \| `completed` \| `rejected`     |
| createdAt       | datetime| yes      |                                            |

**RelationType enum:**

| Value       | Label                       |
|-------------|-----------------------------|
| none        | Sin relacion                |
| classmate   | Companero de estudio        |
| coworker    | Companero de trabajo        |
| teammate    | Miembro del mismo proyecto  |
| techlead    | Lider tecnico               |
| manager     | Gerente directo             |

---

### 1.9 ValidatorReputation

Computed profile that determines how much weight a validator's opinion carries.

| Attribute         | Type    | Required | Notes                                    |
|--------------------|---------|----------|------------------------------------------|
| userId             | UUID    | yes      | FK → Candidate, unique                   |
| reputationLevel    | enum    | yes      | `Bronce` \| `Plata` \| `Oro` \| `Platino` |
| reputationScore    | decimal | yes      | 0.0–10.0, computed                       |
| platformYears      | integer | yes      | years since registration                 |
| totalValidations   | integer | yes      | count of validations given               |
| successRate        | integer | yes      | 0–100%, based on validated candidates that were hired |
| seniority          | string  | yes      | e.g. "Tech Lead", "Engineering Manager"  |
| identityVerified   | boolean | yes      | RENAPER verification                     |

**Reputation weight mapping:**

| Level   | Weight     |
|---------|------------|
| Bronce  | Bajo       |
| Plata   | Medio      |
| Oro     | Alto       |
| Platino | Muy alto   |

---

### 1.10 WorkExperience

| Attribute   | Type    | Required | Notes                   |
|--------------|---------|----------|-------------------------|
| id           | UUID    | yes      | PK                      |
| candidateId  | UUID    | yes      | FK → Candidate          |
| company      | string  | yes      |                         |
| position     | string  | yes      |                         |
| startDate    | date    | yes      | month precision         |
| endDate      | date    | no       | null = currently working |
| isCurrent    | boolean | yes      |                         |
| description  | text    | no       |                         |

---

### 1.11 Project

| Attribute    | Type   | Required | Notes             |
|---------------|--------|----------|-------------------|
| id            | UUID   | yes      | PK                |
| candidateId   | UUID   | yes      | FK → Candidate    |
| title         | string | yes      |                   |
| description   | text   | no       |                   |
| link          | string | no       | URL               |

---

### 1.12 JobOffer

| Attribute    | Type    | Required | Notes                                           |
|---------------|---------|----------|-------------------------------------------------|
| id            | UUID    | yes      | PK                                              |
| recruiterId   | UUID    | yes      | FK → Recruiter                                  |
| companyId     | UUID    | yes      | FK → Company                                    |
| title         | string  | yes      | e.g. "Senior Backend Engineer"                  |
| modality      | enum    | yes      | `remote` \| `hybrid` \| `onsite`                |
| seniority     | enum    | yes      | `junior` \| `semi-senior` \| `senior` \| `lead` |
| description   | text    | no       |                                                 |
| salaryMin     | decimal | no       | in USD                                          |
| salaryMax     | decimal | no       | in USD                                          |
| benefits      | text    | no       |                                                 |
| location      | string  | no       | e.g. "Argentina"                                |
| status        | enum    | yes      | `draft` \| `published` \| `closed`              |
| createdAt     | datetime| yes      |                                                 |

---

### 1.13 OfferSkill

Skills required by a job offer.

| Attribute  | Type   | Required | Notes                                   |
|-------------|--------|----------|-----------------------------------------|
| offerId     | UUID   | yes      | FK → JobOffer                           |
| skillId     | UUID   | yes      | FK → Skill                              |
| requirement | enum   | yes      | `required` \| `desirable`               |

---

### 1.14 Match

Computed relationship between a candidate and a job offer.

| Attribute          | Type    | Required | Notes                                         |
|---------------------|---------|----------|-----------------------------------------------|
| id                  | UUID    | yes      | PK                                            |
| candidateId         | UUID    | yes      | FK → Candidate                                |
| offerId             | UUID    | yes      | FK → JobOffer                                 |
| matchScore          | integer | yes      | 0–100%                                        |
| status              | enum    | yes      | `suggested` \| `interested` \| `not_interested` |
| profileRevealed     | boolean | yes      | default `false`                               |
| revealedAt          | datetime| no       | when candidate marked "Me interesa"           |
| createdAt           | datetime| yes      |                                               |

---

### 1.15 AnonymousThread

Anonymous conversation between a candidate and a recruiter about a specific offer.

| Attribute      | Type    | Required | Notes                                               |
|-----------------|---------|----------|------------------------------------------------------|
| id              | UUID    | yes      | PK                                                   |
| anonymousCode   | string  | yes      | generated display ID, e.g. "#A-3847"                 |
| candidateId     | UUID    | yes      | FK → Candidate (hidden from recruiter)               |
| offerId         | UUID    | yes      | FK → JobOffer                                        |
| category        | enum    | yes      | `salary` \| `culture` \| `stack` \| `benefits` \| `modality` \| `other` |
| status          | enum    | yes      | `pending` \| `responded`                             |
| createdAt       | datetime| yes      |                                                      |

---

### 1.16 AnonymousMessage

Individual messages within an anonymous thread.

| Attribute   | Type    | Required | Notes                            |
|--------------|---------|----------|----------------------------------|
| id           | UUID    | yes      | PK                               |
| threadId     | UUID    | yes      | FK → AnonymousThread             |
| senderType   | enum    | yes      | `candidate` \| `recruiter`       |
| content      | text    | yes      |                                  |
| createdAt    | datetime| yes      |                                  |

---

## 2. Business Logic & Algorithms

### 2.1 Match Score Calculation

The system automatically computes a match percentage (0–100%) between each candidate and each published offer.

**Inputs:**
- Candidate's validated skills (with consolidated levels and scores)
- Offer's required skills (with requirement type: required vs. desirable)

**Output per match:**
- `matchScore`: integer 0–100
- `matchingSkills`: list of skills the candidate has that the offer requires
- `missingSkills`: list of skills the offer requires that the candidate lacks (flagged as required or desirable)

**Sorting:** Matches are shown to candidates sorted by `matchScore` desc.

**Filters available:** salary range, modality (remote/hybrid/onsite), seniority level.

---

### 2.2 Skill Consolidated Score

Each candidate skill gets a consolidated score (0.0–10.0) and a consolidated level, calculated from all validations received for that skill.

**Inputs per validation:**
- `assignedLevel`: the level the validator assigned (Colaborador → Referente)
- Validator's `reputationScore`: determines weight of this validation

**The higher the validator's reputation, the more their validation weighs in the final score.**

---

### 2.3 Validator Reputation Score

Formula: `(experiencePts x 0.5) + (historyPts x 0.3) + (relationPts x 0.2) = reputationScore`

Each component is scored 0–10:

| Component       | Source                        | Scale                              |
|-----------------|-------------------------------|------------------------------------|
| experiencePts   | Years of professional experience | mapped to 0–10 based on years   |
| historyPts      | Total validations given on platform | mapped to 0–10 based on count |
| relationPts     | Type of professional relationship | mapped to 0–10 by relation type |

**Additional factors determining reputation level (Bronce/Plata/Oro/Platino):**
- Platform tenure (years)
- Total validations given
- Success rate (% of validated candidates that were later hired)
- Verified seniority
- Company is partner (verified company)
- Identity verified via RENAPER

**Reputation → validation weight mapping:**

| Reputation | Weight    | Impact                                               |
|------------|-----------|------------------------------------------------------|
| Bronce     | Bajo      | Lowest impact on candidate's skill score             |
| Plata      | Medio     | Moderate impact                                      |
| Oro        | Alto      | High impact                                          |
| Platino    | Muy alto  | Highest impact on candidate's skill score            |

---

### 2.4 Validation Request Flow

```
1. Candidate selects a skill to validate
2. System suggests potential validators:
   - Users who have that skill validated themselves
   - Ranked by a "confidence" score (how well they can assess this skill)
3. Candidate picks a validator and specifies:
   - Professional relation type (coworker, manager, etc.)
   - Optional personal message
4. ValidationRequest created with status = "pending"
5. Validator sees incoming request in their "Validaciones" section
6. Validator can:
   a. ACCEPT: assigns a SkillLevel + writes a comment → Validation created, request status = "completed"
   b. REJECT: request status = "rejected"
7. On completion, the candidate's consolidated score and level for that skill are recalculated
```

---

### 2.5 Anonymous Communication Flow

```
1. Candidate views an offer detail (from matches)
2. Candidate clicks "Consultar (Anonimo)"
3. Candidate selects a category (Sueldo, Cultura, Stack, Beneficios, Modalidad, Otro)
4. Candidate writes their question
5. AnonymousThread created with a generated anonymousCode (e.g. "#A-3847")
6. Recruiter sees the thread in "Consultas Anonimas" inbox
   - Recruiter can see: matchScore, number of validated skills, average confidence score
   - Recruiter CANNOT see: candidate name, email, or any identifying info
7. Recruiter writes a response
8. Candidate sees the response in their "Mensajes" inbox
9. From here, the candidate can:
   a. Mark "Me interesa" → triggers Profile Reveal
   b. Mark "No me interesa" → no profile shared
```

---

### 2.6 Profile Reveal Flow ("Me interesa")

```
1. Candidate marks "Me interesa" on an offer (from offer detail or from anonymous thread response)
2. Match.status = "interested", Match.profileRevealed = true
3. The following data is shared with the recruiter:
   - Full name
   - Email
   - Phone number
   - LinkedIn profile
   - Full CV / profile (skills, experience, validations)
4. Recruiter receives notification: "Un candidato marco Me interesa!"
5. Recruiter can now see full profile and contact the candidate
```

**Before reveal (what recruiter sees for anonymous/non-interested candidates):**
- Match score
- Validated skill count
- Average confidence score
- Anonymous code (if they have a thread)

**After reveal (what recruiter sees for interested candidates):**
- Full name, email, phone, LinkedIn
- Complete skill profile with levels, scores, and validation quotes
- Work experience
- Validators list with reputation details

---

### 2.7 Identity Verification (RENAPER)

Optional step during candidate onboarding (step 5).

```
1. Candidate enters DNI number + tramite number (from back of DNI)
2. System validates data against RENAPER (Argentina's national registry)
3. Candidate performs facial scan (biometric verification)
4. If successful: candidate.identityVerified = true
5. Profile displays "Identidad verificada" badge
6. Verified candidates are prioritized/highlighted in recruiter views
```

---

### 2.8 Profile Completion Calculation

Percentage based on which profile sections are filled:

| Section              | Weight |
|----------------------|--------|
| Profile photo        | ~10%   |
| Headline             | ~10%   |
| Skills added         | ~20%   |
| Skills validated     | ~20%   |
| Projects             | ~10%   |
| Work experience      | ~20%   |
| Identity verified    | ~10%   |

---

### 2.9 Validator Suggestion Algorithm

When a candidate requests validation for a skill, the system suggests validators.

**Criteria:**
- The suggested user has the same skill validated on their own profile
- Proximity: worked at same companies, shared projects, shared connections
- Confidence score: how reliably this person can assess the skill (based on their own validation level for that skill + their reputation)

---

## 3. API Endpoints (suggested)

### Auth
- `POST /auth/register` — register candidate or recruiter
- `POST /auth/login` — login (returns JWT + userType)

### Candidate
- `GET /candidates/me` — get own profile
- `PUT /candidates/me` — update profile fields
- `POST /candidates/me/photo` — upload profile photo
- `GET /candidates/me/completion` — profile completion percentage
- `POST /candidates/me/verify-identity` — initiate RENAPER verification

### Skills
- `GET /skills?search=` — search skill catalog
- `GET /skills/suggestions` — suggested skills based on role/existing skills
- `POST /candidates/me/skills` — add a skill to profile
- `DELETE /candidates/me/skills/:id` — remove a skill
- `GET /candidates/me/skills` — list own skills with levels and scores

### Validations
- `GET /candidates/me/validations/given` — validations I gave to others
- `GET /candidates/me/validations/received` — validations I received
- `GET /candidates/me/validation-requests?status=pending` — incoming requests to validate others
- `GET /candidates/me/validation-requests/sent?status=pending` — outgoing requests awaiting response
- `POST /candidates/me/validation-requests` — create a validation request (body: skillId, validatorId, relationType, message)
- `GET /skills/:skillId/suggested-validators` — get suggested validators for a skill
- `POST /validations` — submit a validation (body: requestId, assignedLevel, comment)
- `POST /validation-requests/:id/reject` — reject a validation request

### Offers
- `POST /offers` — create a new job offer (recruiter)
- `GET /offers` — list own offers (recruiter)
- `GET /offers/:id` — get offer detail
- `PUT /offers/:id` — update offer
- `POST /offers/:id/publish` — publish a draft offer

### Matches
- `GET /candidates/me/matches` — list matched offers for candidate (sorted by score)
- `GET /candidates/me/matches/:offerId` — match detail with matching/missing skills breakdown
- `POST /candidates/me/matches/:offerId/interest` — mark "Me interesa" (triggers profile reveal)
- `POST /candidates/me/matches/:offerId/decline` — mark "No me interesa"
- `GET /offers/:offerId/candidates` — list matched candidates for recruiter (with interest status)
- `GET /offers/:offerId/candidates/:candidateId` — candidate detail (full if revealed, limited if not)

### Anonymous Messaging
- `POST /anonymous-threads` — candidate creates anonymous thread (body: offerId, category, message)
- `GET /candidates/me/anonymous-threads` — candidate's message inbox
- `GET /candidates/me/anonymous-threads/:id` — thread with messages
- `GET /offers/:offerId/anonymous-threads` — recruiter sees anonymous threads for their offer
- `GET /offers/:offerId/anonymous-threads/:id` — thread detail (recruiter view, no candidate identity)
- `POST /anonymous-threads/:id/messages` — send a message (candidate or recruiter)

### Company
- `POST /companies` — create company (during recruiter onboarding)
- `PUT /companies/:id` — update company info
- `GET /companies/:id` — get company profile

### Work Experience
- `POST /candidates/me/experience` — add work experience
- `PUT /candidates/me/experience/:id` — update
- `DELETE /candidates/me/experience/:id` — remove

### Projects
- `POST /candidates/me/projects` — add project
- `PUT /candidates/me/projects/:id` — update
- `DELETE /candidates/me/projects/:id` — remove

---

## 4. Key Business Rules

1. **Candidates are anonymous to recruiters by default.** Recruiters only see match scores and validation statistics until a candidate explicitly marks "Me interesa."

2. **Skills without validations have no consolidated level or score.** A skill only gets a level/score once at least one peer validation is received.

3. **A candidate cannot validate their own skills.** Validations must come from other users.

4. **A validator can only validate a skill they were explicitly asked to validate** via a ValidationRequest.

5. **Identity verification is optional but incentivized.** Verified candidates get a visible badge, and recruiters can filter/prioritize them.

6. **Recruiter cannot see candidate identity from anonymous threads.** They only see: anonymousCode, matchScore, validated skill count, and confidence average.

7. **Profile reveal is irreversible within a match.** Once a candidate marks "Me interesa," their profile cannot be un-revealed for that offer.

8. **Validators have reputation that evolves over time.** More validations, higher success rate, and longer platform tenure increase reputation level.

9. **Each validation includes a visible comment/quote.** This appears on the candidate's profile next to the skill, attributed to the validator.

10. **Match score is recomputed when:** a new validation is received, a skill is added/removed, or an offer's required skills change.
