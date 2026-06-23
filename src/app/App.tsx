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
import ProtectedRoute from './components/shared/ProtectedRoute';
import FAQPage from './components/shared/FAQPage';
import NotFound from './components/shared/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/candidate/login" replace />} />

        {/* Public Routes */}
        <Route path="/recruiter/landing" element={<RecruiterLanding />} />
        <Route path="/recruiter/login" element={<RecruiterLogin />} />
        <Route path="/candidate/register" element={<CandidateRegister />} />
        <Route path="/candidate/login" element={<CandidateLogin />} />

        {/* Protected Recruiter Routes */}
        <Route path="/recruiter/onboarding" element={<ProtectedRoute requiredRole="RECRUITER"><RecruiterOnboarding /></ProtectedRoute>} />
        <Route path="/recruiter/dashboard-empty" element={<ProtectedRoute requiredRole="RECRUITER"><RecruiterDashboardEmpty /></ProtectedRoute>} />
        <Route path="/recruiter/create-offer" element={<ProtectedRoute requiredRole="RECRUITER"><RecruiterCreateOffer /></ProtectedRoute>} />
        <Route path="/recruiter/offer-published" element={<ProtectedRoute requiredRole="RECRUITER"><RecruiterOfferPublished /></ProtectedRoute>} />
        <Route path="/recruiter/dashboard" element={<ProtectedRoute requiredRole="RECRUITER"><RecruiterDashboardActive /></ProtectedRoute>} />
        <Route path="/recruiter/talent" element={<ProtectedRoute requiredRole="RECRUITER"><RecruiterTalentList /></ProtectedRoute>} />
        <Route path="/recruiter/talent/:id" element={<ProtectedRoute requiredRole="RECRUITER"><RecruiterTalentDetail /></ProtectedRoute>} />
        <Route path="/recruiter/anonymous-inbox" element={<ProtectedRoute requiredRole="RECRUITER"><RecruiterAnonymousInbox /></ProtectedRoute>} />
        <Route path="/recruiter/anonymous/:id" element={<ProtectedRoute requiredRole="RECRUITER"><RecruiterAnonymousDetail /></ProtectedRoute>} />
        <Route path="/recruiter/profile-revealed" element={<ProtectedRoute requiredRole="RECRUITER"><RecruiterProfileRevealed /></ProtectedRoute>} />
        <Route path="/recruiter/faq" element={<ProtectedRoute requiredRole="RECRUITER"><FAQPage type="recruiter" /></ProtectedRoute>} />

        {/* Protected Candidate Routes */}
        <Route path="/candidate/onboarding" element={<ProtectedRoute requiredRole="CANDIDATE"><CandidateOnboarding /></ProtectedRoute>} />
        <Route path="/candidate/profile" element={<ProtectedRoute requiredRole="CANDIDATE"><CandidateProfile /></ProtectedRoute>} />
        <Route path="/candidate/request-validation" element={<ProtectedRoute requiredRole="CANDIDATE"><CandidateRequestValidation /></ProtectedRoute>} />
        <Route path="/candidate/specify-relation" element={<ProtectedRoute requiredRole="CANDIDATE"><CandidateSpecifyRelation /></ProtectedRoute>} />
        <Route path="/candidate/validations-pending" element={<ProtectedRoute requiredRole="CANDIDATE"><CandidateValidationsPending /></ProtectedRoute>} />
        <Route path="/candidate/validate-other" element={<ProtectedRoute requiredRole="CANDIDATE"><CandidateValidateOther /></ProtectedRoute>} />
        <Route path="/candidate/matches" element={<ProtectedRoute requiredRole="CANDIDATE"><CandidateMatches /></ProtectedRoute>} />
        <Route path="/candidate/offer/:id" element={<ProtectedRoute requiredRole="CANDIDATE"><CandidateOfferDetail /></ProtectedRoute>} />
        <Route path="/candidate/anonymous-inbox" element={<ProtectedRoute requiredRole="CANDIDATE"><CandidateAnonymousInbox /></ProtectedRoute>} />
        <Route path="/candidate/anonymous/:id" element={<ProtectedRoute requiredRole="CANDIDATE"><CandidateAnonymousResponse /></ProtectedRoute>} />
        <Route path="/candidate/profile-revealed" element={<ProtectedRoute requiredRole="CANDIDATE"><CandidateProfileRevealed /></ProtectedRoute>} />
        <Route path="/candidate/faq" element={<ProtectedRoute requiredRole="CANDIDATE"><FAQPage type="candidate" /></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}