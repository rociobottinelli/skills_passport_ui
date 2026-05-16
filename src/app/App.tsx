import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import RecruiterLanding from './components/recruiter/RecruiterLanding';
import RecruiterLogin from './components/recruiter/RecruiterLogin';
import RecruiterOnboarding from './components/recruiter/RecruiterOnboarding';
import RecruiterDashboardEmpty from './components/recruiter/RecruiterDashboardEmpty';
import RecruiterCreateOffer from './components/recruiter/RecruiterCreateOffer';
import RecruiterOfferPublished from './components/recruiter/RecruiterOfferPublished';
import RecruiterDashboardActive from './components/recruiter/RecruiterDashboardActive';
import RecruiterTalentList from './components/recruiter/RecruiterTalentList';
import RecruiterTalentDetail from './components/recruiter/RecruiterTalentDetail';
import RecruiterAnonymousInbox from './components/recruiter/RecruiterAnonymousInbox';
import RecruiterAnonymousDetail from './components/recruiter/RecruiterAnonymousDetail';
import RecruiterProfileRevealed from './components/recruiter/RecruiterProfileRevealed';

import CandidateRegister from './components/candidate/CandidateRegister';
import CandidateLogin from './components/candidate/CandidateLogin';
import CandidateOnboarding from './components/candidate/CandidateOnboarding';
import CandidateProfile from './components/candidate/CandidateProfile';
import CandidateRequestValidation from './components/candidate/CandidateRequestValidation';
import CandidateSpecifyRelation from './components/candidate/CandidateSpecifyRelation';
import CandidateValidationsPending from './components/candidate/CandidateValidationsPending';
import CandidateValidateOther from './components/candidate/CandidateValidateOther';
import CandidateMatches from './components/candidate/CandidateMatches';
import CandidateOfferDetail from './components/candidate/CandidateOfferDetail';
import CandidateAnonymousInbox from './components/candidate/CandidateAnonymousInbox';
import CandidateAnonymousResponse from './components/candidate/CandidateAnonymousResponse';
import CandidateProfileRevealed from './components/candidate/CandidateProfileRevealed';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/candidate/login" replace />} />

        {/* Recruiter Routes */}
        <Route path="/recruiter/landing" element={<RecruiterLanding />} />
        <Route path="/recruiter/login" element={<RecruiterLogin />} />
        <Route path="/recruiter/onboarding" element={<RecruiterOnboarding />} />
        <Route path="/recruiter/dashboard-empty" element={<RecruiterDashboardEmpty />} />
        <Route path="/recruiter/create-offer" element={<RecruiterCreateOffer />} />
        <Route path="/recruiter/offer-published" element={<RecruiterOfferPublished />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboardActive />} />
        <Route path="/recruiter/talent" element={<RecruiterTalentList />} />
        <Route path="/recruiter/talent/:id" element={<RecruiterTalentDetail />} />
        <Route path="/recruiter/anonymous-inbox" element={<RecruiterAnonymousInbox />} />
        <Route path="/recruiter/anonymous/:id" element={<RecruiterAnonymousDetail />} />
        <Route path="/recruiter/profile-revealed" element={<RecruiterProfileRevealed />} />

        {/* Candidate Routes */}
        <Route path="/candidate/register" element={<CandidateRegister />} />
        <Route path="/candidate/login" element={<CandidateLogin />} />
        <Route path="/candidate/onboarding" element={<CandidateOnboarding />} />
        <Route path="/candidate/profile" element={<CandidateProfile />} />
        <Route path="/candidate/request-validation" element={<CandidateRequestValidation />} />
        <Route path="/candidate/specify-relation" element={<CandidateSpecifyRelation />} />
        <Route path="/candidate/validations-pending" element={<CandidateValidationsPending />} />
        <Route path="/candidate/validate-other" element={<CandidateValidateOther />} />
        <Route path="/candidate/matches" element={<CandidateMatches />} />
        <Route path="/candidate/offer/:id" element={<CandidateOfferDetail />} />
        <Route path="/candidate/anonymous-inbox" element={<CandidateAnonymousInbox />} />
        <Route path="/candidate/anonymous/:id" element={<CandidateAnonymousResponse />} />
        <Route path="/candidate/profile-revealed" element={<CandidateProfileRevealed />} />
      </Routes>
    </BrowserRouter>
  );
}