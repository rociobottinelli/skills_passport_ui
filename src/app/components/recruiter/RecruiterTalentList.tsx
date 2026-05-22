import { useState } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Badge from '../shared/Badge';
import MatchScore from '../shared/MatchScore';
import { Filter, Heart, Mail, Lock, Unlock, Shield } from 'lucide-react';

const candidates = [
  {
    id: 1,
    name: 'Sofía Martínez',
    role: 'Senior Backend',
    location: 'Buenos Aires',
    matchScore: 94,
    skills: ['Java', 'Spring Boot', 'PostgreSQL'],
    interested: true,
    identityVerified: true,
    initials: 'SM',
    gradientFrom: 'var(--sp-violet)',
    gradientTo: 'var(--sp-violet-dark)',
  },
  {
    id: 2,
    name: 'Julián López',
    role: 'Tech Lead',
    location: 'Córdoba',
    matchScore: 87,
    skills: ['Java', 'AWS'],
    missing: ['Kafka'],
    interested: true,
    identityVerified: false,
    initials: 'JL',
    gradientFrom: 'var(--sp-amber)',
    gradientTo: '#d97706',
  },
  {
    id: 3,
    name: 'Camila Rodríguez',
    role: 'Backend semi-senior',
    location: 'Rosario',
    matchScore: 76,
    skills: ['Java', 'PostgreSQL'],
    missing: ['AWS'],
    interested: false,
    identityVerified: false,
    initials: 'CR',
    gradientFrom: 'var(--sp-alert-coral)',
    gradientTo: '#b91c1c',
  },
];

export default function RecruiterTalentList() {
  const navigate = useNavigate();
  const [showInterestedOnly, setShowInterestedOnly] = useState(false);

  const filteredCandidates = showInterestedOnly
    ? candidates.filter((c) => c.interested)
    : candidates;

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-1">Talento Compatible</h1>
            <p className="text-sm text-[var(--sp-gray-medium)]">Senior Backend Engineer</p>
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

          <div className="space-y-3">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                onClick={() => navigate(`/recruiter/talent/${candidate.id}`)}
                className="bg-white rounded-2xl border border-gray-100 p-5 cursor-pointer hover:shadow-sm hover:border-gray-200 transition-all"
                style={
                  candidate.interested
                    ? { borderColor: '#C5DFA8', backgroundColor: '#FAFFF7' }
                    : {}
                }
              >
                <div className="flex items-center gap-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg relative flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${candidate.gradientFrom}, ${candidate.gradientTo})`,
                    }}
                  >
                    {candidate.initials}
                    {candidate.interested && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Unlock className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <h3 className="font-semibold">{candidate.name}</h3>
                      {candidate.identityVerified && (
                        <span
                          className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: '#EAF3DE', color: '#27500A' }}
                        >
                          <Shield className="w-3 h-3" />
                          Verificado
                        </span>
                      )}
                      {candidate.interested ? (
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
                      {candidate.role} · {candidate.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="flex gap-1.5 flex-wrap max-w-xs">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="validated" size="sm">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.missing?.map((skill) => (
                        <Badge key={skill} variant="alert" size="sm">
                          Falta: {skill}
                        </Badge>
                      ))}
                    </div>
                    <MatchScore score={candidate.matchScore} size="md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
