import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { CheckCircle, Mail, Linkedin } from 'lucide-react';
import * as matchesApi from '../../../api/matches';
import type { RecruiterCandidateMatchResponse } from '@/types';

interface RevealedState {
  offerId?: string;
  candidateId?: string;
}

export default function RecruiterProfileRevealed() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as RevealedState | null;

  const offerId = state?.offerId || '';
  const candidateId = state?.candidateId || '';

  const [candidate, setCandidate] = useState<RecruiterCandidateMatchResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (offerId && candidateId) {
      matchesApi.getOfferCandidate(offerId, candidateId)
        .then(setCandidate)
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [offerId, candidateId]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
        <Sidebar type="recruiter" />
        <div className="flex-1 ml-64 p-8 flex items-center justify-center">
          <p className="text-[var(--sp-gray-medium)]">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
        <Sidebar type="recruiter" />
        <div className="flex-1 ml-64 p-8 flex items-center justify-center">
          <p className="text-[var(--sp-gray-medium)]">No se encontró información del candidato.</p>
        </div>
      </div>
    );
  }

  const initials = candidate.candidateName
    ? candidate.candidateName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '??';

  return (
    <div className="theme-recruiter flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-2">¡Un candidato marcó "Me interesa"!</h1>
            <p className="text-[var(--sp-gray-medium)] text-lg">
              Ahora tenés acceso completo a su perfil y datos de contacto
            </p>
          </div>

          <Card className="mb-6">
            <div className="flex gap-6 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[var(--sp-violet)] to-[var(--sp-violet-dark)] rounded-2xl flex items-center justify-center text-white font-bold text-4xl">
                {initials}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{candidate.candidateName ?? 'Candidato'}</h2>
                <p className="text-xl text-[var(--sp-gray-medium)] mb-3">{candidate.currentRole ?? ''}</p>
                {candidate.skills.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {candidate.skills.map((skill) => (
                      <Badge key={skill} variant="validated">{skill}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold mb-4">Datos de contacto</h3>
              <div className="space-y-3">
                {candidate.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[var(--sp-violet)]" />
                    </div>
                    <div>
                      <p className="text-sm text-[var(--sp-gray-medium)]">Email</p>
                      <p className="font-medium">{candidate.email}</p>
                    </div>
                  </div>
                )}
                {candidate.linkedIn && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Linkedin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-[var(--sp-gray-medium)]">LinkedIn</p>
                      <a href={candidate.linkedIn} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--sp-violet)] hover:underline">
                        {candidate.linkedIn}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button onClick={() => navigate('/recruiter/talent/' + candidateId, { state: { offerId } })} fullWidth>
              Ver perfil completo
            </Button>
            <Button variant="secondary" onClick={() => navigate('/recruiter/dashboard')} fullWidth>
              Volver al dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
