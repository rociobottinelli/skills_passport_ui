import { useState } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import MatchScore from '../shared/MatchScore';
import { MapPin, Briefcase, Filter } from 'lucide-react';

const offers = [
  {
    id: 1,
    company: 'Lexus',
    logo: 'LX',
    logoColor: 'from-slate-100 to-slate-200',
    logoText: 'text-slate-700',
    title: 'Senior Backend Engineer',
    matchScore: 94,
    location: 'Argentina',
    modality: 'Remoto',
    seniority: 'Senior',
    skills: ['Java', 'Spring Boot', 'Kafka'],
    salary: 'USD 4.500 - 6.000',
  },
  {
    id: 2,
    company: 'Globant',
    logo: 'GL',
    logoColor: 'from-[var(--sp-amber-bg)] to-amber-100',
    logoText: 'text-[var(--sp-amber)]',
    title: 'Backend Tech Lead',
    matchScore: 87,
    location: 'Argentina',
    modality: 'Híbrido',
    seniority: 'Lead',
    skills: ['Java', 'AWS', 'PostgreSQL'],
    salary: 'USD 5.000 - 7.000',
  },
  {
    id: 3,
    company: 'Despegar',
    logo: 'DP',
    logoColor: 'from-pink-100 to-pink-200',
    logoText: 'text-pink-600',
    title: 'Senior Software Engineer',
    matchScore: 81,
    location: 'Argentina',
    modality: 'Remoto',
    seniority: 'Senior',
    skills: ['Java', 'Spring Boot', 'Docker'],
    salary: 'USD 4.000 - 5.500',
  },
  {
    id: 4,
    company: 'Rappi',
    logo: 'RP',
    logoColor: 'from-green-100 to-green-200',
    logoText: 'text-green-600',
    title: 'Backend Engineer',
    matchScore: 68,
    location: 'Argentina',
    modality: 'Remoto',
    seniority: 'Semi-senior',
    skills: ['Java', 'PostgreSQL'],
    salary: 'USD 3.000 - 4.500',
  },
];

export default function CandidateMatches() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

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
                        <p className="text-[var(--sp-gray-medium)] mb-2">{offer.company} · {offer.modality} · {offer.seniority}</p>
                      </div>
                      <MatchScore score={offer.matchScore} size="md" />
                    </div>

                    <div className="flex gap-2 mb-3">
                      {offer.skills.map((skill) => (
                        <Badge key={skill} variant="primary" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
