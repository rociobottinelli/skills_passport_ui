import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { CheckCircle, Loader2 } from 'lucide-react';
import * as recruiterApi from '../../../api/recruiter';
import { modalityLabel, seniorityLabel } from '@/utils/mappings.ts';
import type { JobOfferDetailResponse } from '@/types';

export default function RecruiterOfferPublished() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { offerId?: string; offerTitle?: string } | null;

  const [offer, setOffer] = useState<JobOfferDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state?.offerId) {
      setLoading(true);
      recruiterApi
        .getOffer(state.offerId)
        .then(setOffer)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [state?.offerId]);

  const title = offer?.title || state?.offerTitle;
  const requiredSkills = offer?.skills.filter((s) => s.requirement === 'REQUIRED') || [];
  const desirableSkills = offer?.skills.filter((s) => s.requirement === 'DESIRABLE') || [];
  const hasSalary = offer?.salaryMin != null || offer?.salaryMax != null;

  return (
    <div className="theme-recruiter flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-2">¡Búsqueda publicada!</h1>
            <p className="text-[var(--sp-gray-medium)] text-lg">
              Empezarás a recibir candidatos compatibles en breve
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--sp-violet)]" />
            </div>
          ) : (
            <Card className="mb-6">
              <div className="space-y-4">
                {title && <h3 className="text-2xl font-bold">{title}</h3>}

                {offer && (
                  <div className="flex gap-2">
                    <Badge variant="neutral">{modalityLabel(offer.modality)}</Badge>
                    <Badge variant="neutral">{seniorityLabel(offer.seniority)}</Badge>
                  </div>
                )}

                {requiredSkills.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Habilidades requeridas</h4>
                    <div className="flex flex-wrap gap-2">
                      {requiredSkills.map((s) => (
                        <Badge key={s.skillId} variant="primary">{s.skillName}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {desirableSkills.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Habilidades deseables</h4>
                    <div className="flex flex-wrap gap-2">
                      {desirableSkills.map((s) => (
                        <Badge key={s.skillId} variant="neutral">{s.skillName}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {hasSalary && (
                  <div>
                    <h4 className="font-medium mb-2">Rango salarial</h4>
                    <p className="text-[var(--sp-gray-medium)]">
                      USD{' '}
                      {offer!.salaryMin != null
                        ? offer!.salaryMin.toLocaleString('en-US')
                        : '—'}{' '}
                      -{' '}
                      {offer!.salaryMax != null
                        ? offer!.salaryMax.toLocaleString('en-US')
                        : '—'}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}

          <div className="flex gap-4">
            <Button onClick={() => navigate('/recruiter/dashboard')} fullWidth>
              Ir al Dashboard
            </Button>
            <Button variant="secondary" onClick={() => navigate('/recruiter/create-offer')}>
              Crear otra búsqueda
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
