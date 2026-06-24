import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { Briefcase, ArrowRight, Plus } from 'lucide-react';
import * as recruiterApi from '../../../api/recruiter';
import type { JobOfferResponse } from '@/types';

const STATUS_LABELS: Record<string, string> = {
  PUBLISHED: 'Publicada',
  DRAFT: 'Borrador',
  CLOSED: 'Cerrada',
  PAUSED: 'Pausada',
};

const STATUS_VARIANTS: Record<string, 'match' | 'primary' | 'neutral' | 'alert'> = {
  PUBLISHED: 'match',
  DRAFT: 'neutral',
  CLOSED: 'alert',
  PAUSED: 'neutral',
};

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

  if (loading) {
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
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Mis búsquedas</h1>
              <p className="text-[var(--sp-gray-medium)]">
                {offers.length} {offers.length === 1 ? 'búsqueda activa' : 'búsquedas'}
              </p>
            </div>
            <Button onClick={() => navigate('/recruiter/create-offer')}>
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span>Nueva búsqueda</span>
              </div>
            </Button>
          </div>

          <div className="space-y-4">
            {offers.map((offer) => (
              <Card
                key={offer.id}
                hover
                onClick={() => navigate(`/recruiter/offer/${offer.id}`)}
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[var(--sp-violet-light)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-7 h-7 text-[var(--sp-violet)]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold">{offer.title}</h3>
                      <Badge
                        variant={STATUS_VARIANTS[offer.status] || 'neutral'}
                        size="sm"
                      >
                        {STATUS_LABELS[offer.status] || offer.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[var(--sp-gray-medium)]">
                      {offer.modality}{offer.seniority ? ` · ${offer.seniority}` : ''}{offer.location ? ` · ${offer.location}` : ''}
                      {offer.createdAt ? ` · ${new Date(offer.createdAt).toLocaleDateString('es-AR')}` : ''}
                    </p>
                  </div>

                  <ArrowRight className="w-5 h-5 text-[var(--sp-gray-medium)] flex-shrink-0" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
