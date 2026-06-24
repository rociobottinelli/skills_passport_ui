import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import MatchScore from '../shared/MatchScore';
import { Briefcase, MapPin, Calendar, DollarSign, Heart, Lock, Unlock, Shield, Filter, MessageSquare, ArrowLeft } from 'lucide-react';
import * as recruiterApi from '../../../api/recruiter';
import * as matchesApi from '../../../api/matches';
import type { JobOfferDetailResponse, RecruiterCandidateMatchResponse } from '../../../types';

const MODALITY_LABELS: Record<string, string> = {
  REMOTE: 'Remoto',
  HYBRID: 'Híbrido',
  ONSITE: 'Presencial',
};

const SENIORITY_LABELS: Record<string, string> = {
  JUNIOR: 'Junior',
  SEMI_SENIOR: 'Semi-Senior',
  SENIOR: 'Senior',
  LEAD: 'Lead',
};

const GRADIENT_STYLES = [
  { from: 'var(--sp-violet)', to: 'var(--sp-violet-dark)' },
  { from: 'var(--sp-amber)', to: '#d97706' },
  { from: 'var(--sp-alert-coral)', to: '#b91c1c' },
  { from: '#2563eb', to: '#1d4ed8' },
  { from: '#059669', to: '#047857' },
];

export default function RecruiterOfferDetail() {
  const navigate = useNavigate();
  const { id: offerId } = useParams<{ id: string }>();

  const [offer, setOffer] = useState<JobOfferDetailResponse | null>(null);
  const [candidates, setCandidates] = useState<RecruiterCandidateMatchResponse[]>([]);
  const [loadingOffer, setLoadingOffer] = useState(true);
  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [showInterestedOnly, setShowInterestedOnly] = useState(false);

  useEffect(() => {
    if (!offerId) return;
    recruiterApi.getOffer(offerId)
      .then(setOffer)
      .catch(() => {})
      .finally(() => setLoadingOffer(false));
    matchesApi.getOfferCandidates(offerId)
      .then(setCandidates)
      .catch(() => {})
      .finally(() => setLoadingCandidates(false));
  }, [offerId]);

  const filteredCandidates = showInterestedOnly
    ? candidates.filter((c) => c.profileRevealed)
    : candidates;

  const getInitials = (name: string | null) => {
    if (!name) return '??';
    return name.split(' ').map((n) => n[0]).join('').slice(0, 2);
  };

  const requiredSkills = offer?.skills.filter((s) => s.requirement === 'REQUIRED') || [];
  const desirableSkills = offer?.skills.filter((s) => s.requirement === 'DESIRABLE') || [];

  if (loadingOffer) {
    return (
      <div className="theme-recruiter flex min-h-screen bg-[var(--sp-gray-light)]">
        <Sidebar type="recruiter" />
        <div className="flex-1 ml-64 p-8 flex items-center justify-center">
          <p className="text-[var(--sp-gray-medium)]">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-recruiter flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate('/recruiter/dashboard')}
            className="flex items-center gap-1 text-sm text-[var(--sp-violet)] hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a mis búsquedas
          </button>

          {/* Offer detail card */}
          <Card className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{offer?.title}</h1>
                <div className="flex items-center gap-3 text-sm text-[var(--sp-gray-medium)] flex-wrap">
                  {offer?.modality && (
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {MODALITY_LABELS[offer.modality] || offer.modality}
                    </span>
                  )}
                  {offer?.seniority && (
                    <span>{SENIORITY_LABELS[offer.seniority] || offer.seniority}</span>
                  )}
                  {offer?.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {offer.location}
                    </span>
                  )}
                  {offer?.createdAt && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(offer.createdAt).toLocaleDateString('es-AR')}
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="secondary"
                onClick={() => navigate('/recruiter/anonymous-inbox', { state: { offerId } })}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Consultas</span>
                </div>
              </Button>
            </div>

            {offer?.description && (
              <p className="text-sm text-[var(--sp-gray-medium)] mb-4">{offer.description}</p>
            )}

            <div className="flex flex-wrap gap-4">
              {(offer?.salaryMin || offer?.salaryMax) && (
                <div className="flex items-center gap-1 text-sm">
                  <DollarSign className="w-4 h-4 text-[var(--sp-gray-medium)]" />
                  <span>
                    USD {offer.salaryMin?.toLocaleString()}{offer.salaryMax ? ` – ${offer.salaryMax.toLocaleString()}` : ''}
                  </span>
                </div>
              )}
            </div>

            {(requiredSkills.length > 0 || desirableSkills.length > 0) && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                {requiredSkills.length > 0 && (
                  <div className="mb-2">
                    <span className="text-xs font-medium text-[var(--sp-gray-medium)] mr-2">Requeridas:</span>
                    <div className="inline-flex flex-wrap gap-1.5">
                      {requiredSkills.map((s) => (
                        <Badge key={s.skillId} variant="primary" size="sm">{s.skillName}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {desirableSkills.length > 0 && (
                  <div>
                    <span className="text-xs font-medium text-[var(--sp-gray-medium)] mr-2">Deseables:</span>
                    <div className="inline-flex flex-wrap gap-1.5">
                      {desirableSkills.map((s) => (
                        <Badge key={s.skillId} variant="neutral" size="sm">{s.skillName}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Talent section */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Talento compatible</h2>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showInterestedOnly}
                  onChange={(e) => setShowInterestedOnly(e.target.checked)}
                  className="w-4 h-4 accent-[var(--sp-violet)]"
                />
                <span className="text-sm">Solo interesados</span>
              </label>
              <p className="text-sm text-[var(--sp-gray-medium)]">
                {filteredCandidates.length} candidatos
              </p>
            </div>
          </div>

          {loadingCandidates ? (
            <p className="text-center text-[var(--sp-gray-medium)] py-12">Cargando candidatos...</p>
          ) : filteredCandidates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[var(--sp-gray-medium)]">No hay candidatos compatibles aún.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCandidates.map((candidate, i) => {
                const style = GRADIENT_STYLES[i % GRADIENT_STYLES.length];
                return (
                  <div
                    key={candidate.matchId}
                    onClick={() => navigate(`/recruiter/talent/${candidate.candidateId}`, { state: { offerId } })}
                    className="bg-white rounded-2xl border border-gray-100 p-5 cursor-pointer hover:shadow-sm hover:border-gray-200 transition-all"
                    style={
                      candidate.profileRevealed
                        ? { borderColor: '#C5DFA8', backgroundColor: '#FAFFF7' }
                        : {}
                    }
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg relative flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${style.from}, ${style.to})`,
                        }}
                      >
                        {getInitials(candidate.candidateName)}
                        {candidate.profileRevealed && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Unlock className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <h3 className="font-semibold">
                            {candidate.candidateName || 'Candidato anónimo'}
                          </h3>
                          {candidate.identityVerified && (
                            <span
                              className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: '#EAF3DE', color: '#27500A' }}
                            >
                              <Shield className="w-3 h-3" />
                              Verificado
                            </span>
                          )}
                          {candidate.profileRevealed ? (
                            <Badge variant="match" size="sm" className="flex items-center gap-1">
                              <Heart className="w-3 h-3 fill-current" />
                              Me interesa
                            </Badge>
                          ) : (
                            <Badge variant="neutral" size="sm" className="flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              Perfil bloqueado
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-[var(--sp-gray-medium)]">
                          {candidate.currentRole || ''}{candidate.location ? ` · ${candidate.location}` : ''}
                        </p>
                      </div>

                      <div className="flex items-center gap-5">
                        <div className="flex gap-1.5 flex-wrap max-w-xs">
                          {(candidate.skills || []).map((skill) => (
                            <Badge key={skill} variant="validated" size="sm">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <MatchScore score={candidate.matchScore} size="md" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
