import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Badge from '../shared/Badge';
import MatchScore from '../shared/MatchScore';
import { Filter, Heart, Lock, Unlock, Shield } from 'lucide-react';
import * as matchesApi from '../../../api/matches';
import type { RecruiterCandidateMatchResponse } from '../../../types';

const GRADIENT_STYLES = [
  { from: 'var(--sp-violet)', to: 'var(--sp-violet-dark)' },
  { from: 'var(--sp-amber)', to: '#d97706' },
  { from: 'var(--sp-alert-coral)', to: '#b91c1c' },
  { from: '#2563eb', to: '#1d4ed8' },
  { from: '#059669', to: '#047857' },
];

export default function RecruiterTalentList() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { offerId?: string } | null;
  const offerId = state?.offerId || '';

  const [candidates, setCandidates] = useState<RecruiterCandidateMatchResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInterestedOnly, setShowInterestedOnly] = useState(false);

  useEffect(() => {
    if (offerId) {
      matchesApi.getOfferCandidates(offerId)
        .then(setCandidates)
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [offerId]);

  const filteredCandidates = showInterestedOnly
    ? candidates.filter((c) => c.profileRevealed)
    : candidates;

  const getInitials = (name: string | null) => {
    if (!name) return '??';
    return name.split(' ').map((n) => n[0]).join('').slice(0, 2);
  };

  return (
    <div className="theme-recruiter flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-1">Talento Compatible</h1>
            <p className="text-sm text-[var(--sp-gray-medium)]">Candidatos que matchean con tu oferta</p>
          </div>

          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition-all">
                <Filter className="w-4 h-4" />
                Filtros
              </button>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showInterestedOnly}
                  onChange={(e) => setShowInterestedOnly(e.target.checked)}
                  className="w-4 h-4 accent-[var(--sp-violet)]"
                />
                <span className="text-sm">Solo candidatos que marcaron interés</span>
              </label>
            </div>
            <p className="text-sm text-[var(--sp-gray-medium)]">
              {filteredCandidates.length} candidatos
            </p>
          </div>

          {loading ? (
            <p className="text-center text-[var(--sp-gray-medium)] py-12">Cargando candidatos...</p>
          ) : filteredCandidates.length === 0 ? (
            <p className="text-center text-[var(--sp-gray-medium)] py-12">No hay candidatos compatibles aún.</p>
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
