import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { useAuth } from '@/context/AuthContext.tsx';

export default function CandidateRegister() {
  const navigate = useNavigate();
  const { register, login } = useAuth();
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
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FB] to-white flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[var(--sp-violet)] to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-white font-bold">SP</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Unite como candidato</h1>
          <p className="text-[var(--sp-gray-medium)]">
            Validá tus habilidades y conectá con las mejores oportunidades
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
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
  );
}
