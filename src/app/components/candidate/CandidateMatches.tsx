import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import MatchScore from '../shared/MatchScore';
import { MapPin, Briefcase, Filter } from 'lucide-react';
import * as matchesApi from '../../../api/matches';
import type { CandidateMatchResponse } from '../../../types';

const LOGO_STYLES = [
  { color: 'from-slate-100 to-slate-200', text: 'text-slate-700' },
  { color: 'from-amber-100 to-amber-200', text: 'text-amber-700' },
  { color: 'from-pink-100 to-pink-200', text: 'text-pink-600' },
  { color: 'from-green-100 to-green-200', text: 'text-green-600' },
  { color: 'from-blue-100 to-blue-200', text: 'text-blue-600' },
];

export default function CandidateMatches() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [matches, setMatches] = useState<CandidateMatchResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    matchesApi.getCandidateMatches()
      .then(setMatches)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const offers = matches.map((m, i) => ({
    id: m.offerId,
    company: m.companyName,
    logo: m.companyName.slice(0, 2).toUpperCase(),
    logoColor: LOGO_STYLES[i % LOGO_STYLES.length].color,
    logoText: LOGO_STYLES[i % LOGO_STYLES.length].text,
    title: m.offerTitle,
    matchScore: m.matchScore,
    status: m.status,
  }));

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="candidate" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Matches Sugeridos</h1>
            <p className="text-[var(--sp-gray-medium)]">
              Ofertas que coinciden con tu perfil y habilidades
            </p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl hover:bg-gray-50 transition-all"
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            <p className="text-sm text-[var(--sp-gray-medium)]">{offers.length} ofertas</p>
          </div>

          {showFilters && (
            <Card className="mb-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Rango salarial</label>
                  <select className="w-full px-4 py-2 bg-[var(--sp-gray-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)]">
                    <option>Todos</option>
                    <option>USD 50k - 80k</option>
                    <option>USD 80k - 120k</option>
                    <option>USD 120k+</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Modalidad</label>
                  <select className="w-full px-4 py-2 bg-[var(--sp-gray-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)]">
                    <option>Todas</option>
                    <option>Remoto</option>
                    <option>Híbrido</option>
                    <option>Presencial</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Seniority</label>
                  <select className="w-full px-4 py-2 bg-[var(--sp-gray-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)]">
                    <option>Todos</option>
                    <option>Junior</option>
                    <option>Semi-Senior</option>
                    <option>Senior</option>
                  </select>
                </div>
              </div>
            </Card>
          )}

          {loading ? (
            <p className="text-center text-[var(--sp-gray-medium)] py-12">Cargando matches...</p>
          ) : offers.length === 0 ? (
            <p className="text-center text-[var(--sp-gray-medium)] py-12">No hay matches disponibles todavía.</p>
          ) : (
            <div className="space-y-4">
              {offers.map((offer) => (
                <Card
                  key={offer.id}
                  hover
                  onClick={() => navigate(`/candidate/offer/${offer.id}`)}
                >
                  <div className="flex gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${offer.logoColor} rounded-xl flex items-center justify-center ${offer.logoText} font-bold text-xl flex-shrink-0`}>
                      {offer.logo}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
                          <p className="text-[var(--sp-gray-medium)] mb-2">{offer.company}</p>
                        </div>
                        <MatchScore score={offer.matchScore} size="md" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
