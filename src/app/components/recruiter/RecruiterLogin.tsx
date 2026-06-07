import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { useAuth } from '../../../context/AuthContext';

export default function RecruiterLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/recruiter/dashboard');
    } catch {
      setError('Email o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FB] to-white flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[var(--sp-violet)] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-white font-bold">SP</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Bienvenido de vuelta</h1>
          <p className="text-[var(--sp-gray-medium)]">Ingresá a tu cuenta de reclutador</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
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

            <div className="flex justify-end">
              <button type="button" className="text-sm text-[var(--sp-violet)] hover:underline">
                Olvidé mi contraseña
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button type="submit" fullWidth className="mt-6" disabled={loading}>
              {loading ? 'Ingresando...' : 'Iniciar sesión'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/recruiter/landing')}
              className="text-[var(--sp-violet)] hover:underline"
            >
              ¿No tenés cuenta? Crear cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
