import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { Upload } from 'lucide-react';

export default function RecruiterOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    description: '',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/recruiter/dashboard-empty');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FB] to-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-[var(--sp-violet)]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-2">Configurá tu empresa</h1>
          <p className="text-[var(--sp-gray-medium)]">Paso {step} de 3</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Datos de la empresa</h2>
              <Input
                label="Nombre de la empresa"
                placeholder="Ej: Mercado Libre"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Logo de la empresa</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[var(--sp-violet)] cursor-pointer transition-all">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-[var(--sp-gray-medium)]">
                    Hacé click o arrastrá tu logo aquí
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Industria y tamaño</h2>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Industria</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)]"
                >
                  <option value="">Seleccioná una industria</option>
                  <option value="tech">Tecnología</option>
                  <option value="finance">Finanzas</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="consulting">Consultoría</option>
                  <option value="other">Otra</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Tamaño de la empresa</label>
                <div className="grid grid-cols-2 gap-3">
                  {['1-10', '11-50', '51-200', '201-1000', '1000+'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFormData({ ...formData, companySize: size })}
                      className={`py-3 px-4 rounded-xl border-2 transition-all ${
                        formData.companySize === size
                          ? 'border-[var(--sp-violet)] bg-[#E8E7FE]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {size} empleados
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Cultura y valores</h2>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Descripción de la cultura</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Contanos sobre la cultura de tu empresa, valores y ambiente de trabajo..."
                  rows={6}
                  className="px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] resize-none"
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)}>
                Volver
              </Button>
            )}
            <Button onClick={handleNext} fullWidth={step === 1}>
              {step === 3 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
