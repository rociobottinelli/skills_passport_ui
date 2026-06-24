import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Card from '../shared/Card';
import Select from '../shared/Select';
import MatchScore from '../shared/MatchScore';
import { Filter, Heart } from 'lucide-react';
import * as matchesApi from '../../../api/matches';
import type { CandidateMatchResponse } from '@/types';

const LOGO_STYLES = [
  { color: 'from-slate-100 to-slate-200', text: 'text-slate-700' },
  { color: 'from-amber-100 to-amber-200', text: 'text-amber-700' },
  { color: 'from-pink-100 to-pink-200', text: 'text-pink-600' },
  { color: 'from-green-100 to-green-200', text: 'text-green-600' },
  { color: 'from-blue-100 to-blue-200', text: 'text-blue-600' },
];

const SALARY_OPTIONS = [
  { value: '50k-80k', label: 'USD 50k - 80k' },
  { value: '80k-120k', label: 'USD 80k - 120k' },
  { value: '120k+', label: 'USD 120k+' },
];

const MODALITY_OPTIONS = [
  { value: 'remoto', label: 'Remoto' },
  { value: 'hibrido', label: 'Híbrido' },
  { value: 'presencial', label: 'Presencial' },
];

const SENIORITY_OPTIONS = [
  { value: 'junior', label: 'Junior' },
  { value: 'semi-senior', label: 'Semi-Senior' },
  { value: 'senior', label: 'Senior' },
];

export default function CandidateMatches() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [matches, setMatches] = useState<CandidateMatchResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({ salary: '', modality: '', seniority: '' });
  const [filterErrors, setFilterErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    matchesApi.getCandidateMatches()
      .then(setMatches)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Live validation: show error when filter panel is open and a field is empty
  useEffect(() => {
    if (!showFilters) return;
    const errors: Record<string, string> = {};
    if (!filters.salary) errors.salary = 'Seleccioná un rango salarial';
    if (!filters.modality) errors.modality = 'Seleccioná una modalidad';
    if (!filters.seniority) errors.seniority = 'Seleccioná un seniority';
    setFilterErrors(errors);
  }, [filters, showFilters]);

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
                <Select
                  label="Rango salarial"
                  placeholder="Seleccioná un rango"
                  value={filters.salary}
                  onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
                  options={SALARY_OPTIONS}
                  error={filterErrors.salary}
                  required
                />
                <Select
                  label="Modalidad"
                  placeholder="Seleccioná modalidad"
                  value={filters.modality}
                  onChange={(e) => setFilters({ ...filters, modality: e.target.value })}
                  options={MODALITY_OPTIONS}
                  error={filterErrors.modality}
                  required
                />
                <Select
                  label="Seniority"
                  placeholder="Seleccioná seniority"
                  value={filters.seniority}
                  onChange={(e) => setFilters({ ...filters, seniority: e.target.value })}
                  options={SENIORITY_OPTIONS}
                  error={filterErrors.seniority}
                  required
                />
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
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold">{offer.title}</h3>
                            {offer.status === 'INTERESTED' && (
                              <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                <Heart className="w-3 h-3 fill-current" />
                                Interesado
                              </span>
                            )}
                          </div>
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
