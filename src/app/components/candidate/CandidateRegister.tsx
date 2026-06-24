import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShieldCheck } from 'lucide-react';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { useAuth } from '@/context/AuthContext.tsx';

export default function CandidateRegister() {
  const navigate = useNavigate();
  const { register, login } = useAuth();
  const [userType, setUserType] = useState<'candidate' | 'recruiter'>('candidate');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    location: '',
    currentRole: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        userType: 'CANDIDATE',
        location: formData.location,
        currentRole: formData.currentRole,
      });
      await login(formData.email, formData.password);
      navigate('/candidate/onboarding');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FB] to-white flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <div className="w-16 h-16 bg-[var(--sp-violet)] rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl text-white font-bold">SP</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 leading-tight tracking-tight">
              Validá tus habilidades y conectá con oportunidades
            </h1>
            <p className="text-xl text-[var(--sp-gray-medium)]">
              Creá tu perfil profesional respaldado por validaciones de tu red de contactos.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex gap-2 mb-6 bg-[var(--sp-gray-light)] p-1 rounded-xl">
              <button
                onClick={() => setUserType('candidate')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  userType === 'candidate'
                    ? 'bg-white shadow-sm text-[var(--sp-gray-dark)]'
                    : 'text-[var(--sp-gray-medium)]'
                }`}
              >
                Soy Candidato
              </button>
              <button
                onClick={() => {
                  setUserType('recruiter');
                  navigate('/recruiter/landing');
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  userType === 'recruiter'
                    ? 'bg-white shadow-sm text-[var(--sp-gray-dark)]'
                    : 'text-[var(--sp-gray-medium)]'
                }`}
              >
                Soy Reclutador
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="tu@email.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <Input
                label="Nombre completo"
                placeholder="Juan Pérez"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              <Input
                label="Ubicación"
                placeholder="Buenos Aires, Argentina"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              <Input
                label="Rol actual"
                placeholder="Frontend Developer"
                required
                value={formData.currentRole}
                onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
              />

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button type="submit" fullWidth className="mt-6" disabled={loading}>
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => navigate('/candidate/login')}
                className="text-[var(--sp-violet)] hover:underline"
              >
                ¿Ya tenés cuenta? Iniciá sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[var(--sp-violet)] to-indigo-700 items-center justify-center p-12">
        <div className="text-white max-w-lg">
          <div className="mb-8">
            <ShieldCheck className="w-16 h-16 text-white/90 mb-6" strokeWidth={1.5} />
            <h2 className="text-4xl font-bold mb-4">Tu experiencia, validada por quienes te conocen</h2>
            <p className="text-xl text-white/80">
              Construí un perfil profesional con habilidades confirmadas por colegas, líderes y compañeros
              de equipo que trabajaron con vos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
