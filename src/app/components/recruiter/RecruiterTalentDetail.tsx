import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import MatchScore from '../shared/MatchScore';
import { MapPin, Briefcase, Award, Mail, ExternalLink } from 'lucide-react';

export default function RecruiterTalentDetail() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate('/recruiter/talent')}
            className="text-[var(--sp-violet)] hover:underline mb-6"
          >
            ← Volver a la lista
          </button>

          <Card className="mb-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[var(--sp-violet)] to-[var(--sp-violet-dark)] rounded-2xl flex items-center justify-center text-white font-bold text-4xl">
                  SM
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Sofía Martínez</h1>
                  <p className="text-xl text-[var(--sp-gray-medium)] mb-2">Senior Backend Engineer · Buenos Aires</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="validated">✓ 8 habilidades validadas</Badge>
                    <Badge variant="neutral">💼 7 años de experiencia</Badge>
                  </div>
                </div>
              </div>
              <MatchScore score={94} size="lg" />
            </div>

            <div className="flex gap-3">
              <Button onClick={() => navigate('/recruiter/anonymous-inbox')}>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>Contactar</span>
                </div>
              </Button>
              <Button variant="secondary">Ver CV</Button>
            </div>
          </Card>

          <Card className="mb-6 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Datos de contacto</h3>
              <Badge variant="match" size="sm">Perfil revelado</Badge>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl">
                <p className="text-sm text-[var(--sp-gray-medium)] mb-1">Email</p>
                <p className="font-medium">sofia.martinez@gmail.com</p>
              </div>
              <div className="p-4 bg-white rounded-xl">
                <p className="text-sm text-[var(--sp-gray-medium)] mb-1">Teléfono</p>
                <p className="font-medium">+54 11 5555-0123</p>
              </div>
              <div className="p-4 bg-white rounded-xl">
                <p className="text-sm text-[var(--sp-gray-medium)] mb-1">LinkedIn</p>
                <a href="#" className="font-medium text-[var(--sp-violet)] hover:underline">
                  sofia-martinez
                </a>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card padding={false} className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--sp-gray-medium)]">Confianza</p>
                  <p className="text-xl font-bold">9.2/10</p>
                </div>
              </div>
            </Card>
            <Card padding={false} className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-[var(--sp-violet)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--sp-gray-medium)]">Experiencia</p>
                  <p className="text-xl font-bold">7 años</p>
                </div>
              </div>
            </Card>
            <Card padding={false} className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--sp-gray-medium)]">Validaciones</p>
                  <p className="text-xl font-bold">12</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="mb-6">
            <h3 className="text-xl font-bold mb-4">Habilidades validadas</h3>
            <div className="space-y-3">
              {[
                { skill: 'Java', confidence: 9.1, validations: 4, bar: 91 },
                { skill: 'Spring Boot', confidence: 8.6, validations: 3, bar: 86 },
                { skill: 'PostgreSQL', confidence: 8.2, validations: 2, bar: 82 },
              ].map((item) => (
                <div key={item.skill} className="p-4 bg-[var(--sp-gray-light)] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="validated">✓ {item.skill}</Badge>
                      <span className="text-sm text-[var(--sp-gray-medium)]">
                        {item.validations} validaciones
                      </span>
                    </div>
                    <span className="text-lg font-bold text-[var(--sp-match-green)]">{item.confidence}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--sp-match-green)]"
                      style={{ width: `${item.bar}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="mb-6 border-2 border-[var(--sp-violet)] bg-gradient-to-br from-white to-purple-50">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-6 h-6 text-[var(--sp-violet)]" />
              <h3 className="text-2xl font-bold">🛡 Validado por su red</h3>
            </div>
            <div className="grid gap-4">
              {[
                {
                  name: 'Martín Ramírez',
                  initials: 'MR',
                  role: 'Tech Lead',
                  company: 'Mercado Libre',
                  relation: 'Líder de proyecto',
                  skill: 'Java',
                  score: 9.2,
                  color: 'from-[var(--sp-blue-recruiter)] to-[var(--sp-blue-recruiter-text)]',
                },
                {
                  name: 'Valentina Cruz',
                  initials: 'VC',
                  role: 'Senior Developer',
                  company: 'Despegar',
                  relation: 'Compañera de equipo',
                  skill: 'Spring Boot',
                  score: 8.7,
                  color: 'from-teal-400 to-teal-700',
                },
                {
                  name: 'Diego Giménez',
                  initials: 'DG',
                  role: 'Engineering Manager',
                  company: 'Globant',
                  relation: 'Manager directo',
                  skill: 'PostgreSQL',
                  score: 8.9,
                  color: 'from-pink-400 to-pink-700',
                },
              ].map((validator) => (
                <div
                  key={validator.name}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-purple-200"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${validator.color} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                    {validator.initials}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold mb-1">{validator.name}</h4>
                    <p className="text-sm text-[var(--sp-gray-medium)] mb-1">
                      {validator.role} · {validator.company}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="primary" size="sm">
                        {validator.relation}
                      </Badge>
                      <span className="text-sm text-[var(--sp-gray-medium)]">validó</span>
                      <Badge variant="validated" size="sm">
                        {validator.skill}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--sp-match-green)]">{validator.score}</p>
                    <p className="text-xs text-[var(--sp-gray-medium)]">/ 10</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-bold mb-4">Experiencia</h3>
            <div className="space-y-6">
              {[
                {
                  title: 'Senior Frontend Developer',
                  company: 'Mercado Libre',
                  period: '2021 - Presente',
                  description: 'Desarrollo de features clave en el checkout flow.',
                },
                {
                  title: 'Frontend Developer',
                  company: 'Globant',
                  period: '2019 - 2021',
                  description: 'Desarrollo de aplicaciones web para clientes corporativos.',
                },
              ].map((exp) => (
                <div key={exp.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-[var(--sp-gray-light)] rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-[var(--sp-gray-medium)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold mb-1">{exp.title}</h4>
                    <p className="text-[var(--sp-gray-medium)] mb-1">{exp.company}</p>
                    <p className="text-sm text-[var(--sp-gray-medium)] mb-2">{exp.period}</p>
                    <p className="text-sm">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
