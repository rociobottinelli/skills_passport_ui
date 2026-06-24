import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { SearchCheck } from 'lucide-react';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { useAuth } from '@/context/AuthContext.tsx';

export default function RecruiterLanding() {
  const navigate = useNavigate();
  const { register, login } = useAuth();
  const [userType, setUserType] = useState<'recruiter' | 'candidate'>('recruiter');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    website: '',
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
        userType: 'RECRUITER',
        companyName: formData.companyName,
        website: formData.website,
      });
      await login(formData.email, formData.password);
      navigate('/recruiter/onboarding');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="theme-recruiter min-h-screen bg-gradient-to-br from-[#F8F9FB] to-white flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <div className="w-16 h-16 bg-[var(--sp-violet)] rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl text-white font-bold">SP</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 leading-tight tracking-tight">
              Encontrá talento que ya viene validado por su red
            </h1>
            <p className="text-xl text-[var(--sp-gray-medium)]">
              Conectá con profesionales cuyas habilidades están verificadas por otros expertos del sector.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex gap-2 mb-6 bg-[var(--sp-gray-light)] p-1 rounded-xl">
              <button
                onClick={() => setUserType('recruiter')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  userType === 'recruiter'
                    ? 'bg-white shadow-sm text-[var(--sp-gray-dark)]'
                    : 'text-[var(--sp-gray-medium)]'
                }`}
              >
                Soy Reclutador
              </button>
              <button
                onClick={() => {
                  setUserType('candidate');
                  navigate('/candidate/register');
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  userType === 'candidate'
                    ? 'bg-white shadow-sm text-[var(--sp-gray-dark)]'
                    : 'text-[var(--sp-gray-medium)]'
                }`}
              >
                Soy Candidato
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="tu@empresa.com"
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
                label="Nombre de la empresa"
                placeholder="Ej: Mercado Libre"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
              <Input
                label="Sitio web"
                type="url"
                placeholder="https://empresa.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
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
                onClick={() => navigate('/recruiter/login')}
                className="text-[var(--sp-violet)] hover:underline"
              >
                ¿Ya tenés cuenta? Iniciá sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[var(--sp-violet)] to-cyan-800 items-center justify-center p-12">
        <div className="text-white max-w-lg">
          <div className="mb-8">
            <SearchCheck className="w-16 h-16 text-white/90 mb-6" strokeWidth={1.5} />
            <h2 className="text-4xl font-bold mb-4">El talento validado está a tu alcance</h2>
            <p className="text-xl text-white/80">
              Reducí el riesgo en tu contratación con perfiles cuyas habilidades fueron confirmadas por sus propios
              colegas y líderes de la industria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
