import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { useAuth } from '@/context/AuthContext.tsx';

export default function RecruiterLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userType, setUserType] = useState<'candidate' | 'recruiter'>('recruiter');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const returnedType = await login(formData.email, formData.password);
      if (returnedType === 'CANDIDATE') {
        navigate('/candidate/matches');
      } else {
        navigate('/recruiter/dashboard');
      }
    } catch {
      setError('Email o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="theme-recruiter min-h-screen bg-gradient-to-br from-[#F8F9FB] to-white flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[var(--sp-violet)] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-white font-bold">SP</span>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-medium mb-1">Skill Passport</h2>
          </div>
          <h1 className="text-4xl font-bold mb-2">Bienvenido de vuelta</h1>
          <p className="text-[var(--sp-gray-medium)]">Ingresá para encontrar talento o tu próximo empleo.</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex gap-2 mb-6 bg-[var(--sp-gray-light)] p-1 rounded-xl">
            <button
              onClick={() => {
                setUserType('candidate');
                navigate('/candidate/login');
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                userType === 'candidate'
                  ? 'bg-white shadow-sm text-[var(--sp-gray-dark)]'
                  : 'text-[var(--sp-gray-medium)]'
              }`}
            >
              Soy candidato
            </button>
            <button
              onClick={() => setUserType('recruiter')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                userType === 'recruiter'
                  ? 'bg-white shadow-sm text-[var(--sp-gray-dark)]'
                  : 'text-[var(--sp-gray-medium)]'
              }`}
            >
              Soy reclutador
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
              placeholder="••••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button type="submit" fullWidth className="mt-6" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-[var(--sp-gray-medium)]">
              ¿No tenés cuenta?{' '}
              <button
                onClick={() => navigate(userType === 'candidate' ? '/candidate/register' : '/recruiter/landing')}
                className="text-[var(--sp-violet)] hover:underline"
              >
                Registrate
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
