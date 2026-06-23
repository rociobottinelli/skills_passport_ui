import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import { Heart, MessageSquare, ArrowRight } from 'lucide-react';
import * as recruiterApi from '../../../api/recruiter';
import type { JobOfferResponse } from '@/types';

export default function RecruiterDashboardActive() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<JobOfferResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    recruiterApi.getOffers()
      .then((data) => {
        setOffers(data);
        if (data.length === 0) {
          navigate('/recruiter/dashboard-empty', { replace: true });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [navigate]);

  const activeOffer = offers.find((o) => o.status === 'PUBLISHED') || offers[0];

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

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">{activeOffer?.title || 'Dashboard'}</h1>
            <p className="text-[var(--sp-gray-medium)]">
              {activeOffer?.modality || ''} · {activeOffer?.location || ''} · {activeOffer?.createdAt ? `Publicada ${new Date(activeOffer.createdAt).toLocaleDateString('es-AR')}` : ''}
            </p>
          </div>

          <Card className="mb-6 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <p className="text-4xl font-bold mb-1">12</p>
                  <p className="text-lg text-[var(--sp-gray-medium)]">Candidatos marcaron interés</p>
                </div>
              </div>
            </div>
            <p className="text-[var(--sp-gray-medium)] mb-4">
              Estos candidatos ya compartieron su perfil completo y datos de contacto.
            </p>
            <Button onClick={() => navigate('/recruiter/talent', { state: { offerId: activeOffer?.id } })} fullWidth>
              <div className="flex items-center justify-center gap-2">
                <span>Ver candidatos interesados</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Button>
          </Card>

          <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <p className="text-4xl font-bold mb-1">3</p>
                  <p className="text-lg text-[var(--sp-gray-medium)]">Consultas anónimas</p>
                </div>
              </div>
            </div>
            <p className="text-[var(--sp-gray-medium)] mb-4">
              Candidatos con preguntas sobre la posición. Responder aumenta las chances de que marquen interés.
            </p>
            <Button onClick={() => navigate('/recruiter/anonymous-inbox', { state: { offerId: activeOffer?.id } })} variant="secondary" fullWidth>
              <div className="flex items-center justify-center gap-2">
                <span>Responder consultas</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Button>
          </Card>

          <div className="text-center">
            <p className="text-[var(--sp-gray-medium)]">
              47 candidatos compatibles en total ·{' '}
              <button
                onClick={() => navigate('/recruiter/talent', { state: { offerId: activeOffer?.id } })}
                className="text-[var(--sp-violet)] hover:underline"
              >
                Ver todos
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
