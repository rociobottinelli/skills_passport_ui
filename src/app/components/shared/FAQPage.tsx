import Sidebar from './Sidebar';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string | string[];
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    title: 'Sobre la plataforma',
    items: [
      {
        question: '¿Qué hace diferente a esta plataforma de búsqueda laboral?',
        answer: [
          'Skill Passport redefine el proceso de búsqueda laboral poniendo al candidato en el centro y eliminando la lógica de filtrado masivo.',
          '• Transparencia del algoritmo: el usuario puede ver cómo se calcula su compatibilidad con una oferta antes de interactuar.',
          '• Match basado en habilidades reales: no se utilizan CVs ni keywords, sino habilidades validadas por otros profesionales.',
          '• Validación social (peer-to-peer): la credibilidad del perfil se construye a partir de la experiencia real de la red, no de tests automatizados.',
          '• Privacidad inicial del candidato: la identidad se mantiene oculta hasta que exista interés mutuo.',
          '• Inversión del flujo tradicional: el reclutador debe atraer al candidato en función de su perfil validado.',
        ],
      },
      {
        question: '¿Cómo funciona el match con empleos?',
        answer: [
          'El sistema calcula un Match Score (porcentaje de compatibilidad) entre el perfil del candidato y una oferta laboral.',
          'Este cálculo considera:',
          '• Habilidades requeridas por el puesto',
          '• Habilidades declaradas y validadas del candidato',
          '• Nivel de dominio en cada habilidad',
          '• Nivel de confianza de esas habilidades (basado en validaciones)',
          'El resultado no es binario (cumple/no cumple), sino un porcentaje que refleja coincidencias exactas, brechas de habilidades y nivel de profundidad en cada skill.',
          'El sistema también muestra el desglose de este match para garantizar transparencia.',
        ],
      },
    ],
  },
  {
    title: 'Sobre las habilidades',
    items: [
      {
        question: '¿Cómo se mide el nivel en una habilidad?',
        answer: [
          'Las habilidades se validan utilizando una escala basada en comportamiento observable en el contexto laboral:',
          '• Colaborador: trabajó en tareas asignadas utilizando la habilidad',
          '• Ejecutor autónomo: resolvió problemas de forma independiente',
          '• Líder: lideró iniciativas utilizando esa habilidad',
          '• Referente: es referente técnico y forma a otros',
          'Esta escala reemplaza modelos abstractos (básico/intermedio/avanzado) por niveles directamente vinculados a experiencia profesional real.',
        ],
      },
      {
        question: '¿Cómo se transforma ese nivel en un puntaje?',
        answer: [
          'Para permitir el cálculo algorítmico, cada nivel se traduce internamente a un rango numérico:',
          '• Colaborador → 1 a 3',
          '• Ejecutor autónomo → 4 a 6',
          '• Líder → 7 a 8',
          '• Referente → 9 a 10',
          'Este valor se utiliza como base para el cálculo del score de la habilidad.',
        ],
      },
      {
        question: '¿Cómo se sugieren los validadores?',
        answer: [
          'Al solicitar una validación, el sistema recomienda perfiles que tengan mayor capacidad para evaluar la habilidad solicitada.',
          'Las sugerencias se generan considerando:',
          '• Cercanía profesional: personas que trabajaron con vos en la misma empresa o proyecto.',
          '• Dominio de la habilidad: usuarios que poseen y demostraron experiencia en la habilidad a validar.',
          '• Reputación como validador: perfiles con niveles de confianza más altos dentro de la plataforma (especialmente Oro y Platino).',
          'El objetivo es facilitar validaciones más precisas, confiables y relevantes para el cálculo del score de la habilidad.',
        ],
      },
    ],
  },
  {
    title: 'Cálculo del score de habilidades',
    items: [
      {
        question: '¿Qué factores se consideran en una validación?',
        answer: [
          'Cada validación es ponderada en base a tres factores:',
          '1. Experiencia del validador en la habilidad (50%)',
          '   • Menos de 1 año → 1 punto',
          '   • 1 a 3 años → 3 puntos',
          '   • 4 a 6 años → 5 puntos',
          '   • 7 a 10 años → 7 puntos',
          '   • Más de 10 años → 10 puntos',
          '2. Historial de validaciones del validador (30%)',
          '   • 1 validación → 1 punto',
          '   • 2 a 10 → 3 puntos',
          '   • 11 a 25 → 5 puntos',
          '   • 26 a 50 → 8 puntos',
          '   • Más de 50 → 10 puntos',
          '3. Relación profesional con el candidato (20%)',
          '   • Sin relación laboral → 1',
          '   • Compañero de estudio → 2',
          '   • Compañero de trabajo → 5',
          '   • Mismo proyecto → 7',
          '   • Líder técnico / líder de proyecto → 9',
          '   • Manager / responsable directo → 10',
        ],
      },
      {
        question: '¿Cuál es la fórmula de cálculo?',
        answer: [
          'Para cada validación individual:',
          'Puntaje = (Experiencia × 0.5) + (Historial × 0.3) + (Relación × 0.2)',
          'Ejemplo: si Experiencia = 7, Historial = 10 y Relación = 9:',
          '(7 × 0.5) + (10 × 0.3) + (9 × 0.2) = 8.3 / 10',
        ],
      },
      {
        question: '¿Cómo se obtiene el score final de una habilidad?',
        answer: [
          'El score final de una habilidad es el resultado de combinar todas las validaciones recibidas.',
          '• Es un promedio ponderado (no todas las validaciones tienen el mismo peso)',
          '• Las validaciones de mayor confianza impactan más en el resultado',
          '• El sistema prioriza validaciones con mayor experiencia, mayor historial y mayor cercanía profesional',
        ],
      },
    ],
  },
  {
    title: 'Sistema de validadores',
    items: [
      {
        question: '¿Qué niveles de validador existen?',
        answer: [
          'El sistema clasifica a los validadores en niveles según su actividad y calidad:',
          'Plata',
          '• 5 validaciones realizadas',
          '• Promedio ≥ 4.0',
          '• 2 habilidades distintas validadas',
          '• Multiplicador de peso: ×1.3',
          'Oro',
          '• 20 validaciones realizadas',
          '• Promedio ≥ 6.5',
          '• 5 habilidades distintas',
          '• Al menos 30% con relación laboral directa',
          '• Multiplicador de peso: ×1.5',
          'Platino',
          '• 50 validaciones realizadas',
          '• Promedio ≥ 8.0',
          '• 10 habilidades distintas',
          '• Al menos 50% con relación laboral directa',
          '• Multiplicador de peso: ×1.7',
        ],
      },
      {
        question: '¿Cómo impacta el nivel del validador?',
        answer: [
          'El nivel del validador actúa como un multiplicador sobre el peso de su validación.',
          '• Validadores más confiables influyen más en el score final',
          '• No todas las validaciones tienen el mismo impacto',
          '• Se prioriza calidad sobre cantidad',
        ],
      },
    ],
  },
  {
    title: 'Mecanismos anti-manipulación',
    items: [
      {
        question: '¿Cómo se previene el fraude en las validaciones?',
        answer: [
          'El sistema incorpora múltiples mecanismos para evitar fraude o manipulación:',
          '• Las validaciones tienen distinto peso según el perfil del validador',
          '• Usuarios sin historial tienen bajo impacto',
          '• Relaciones no laborales tienen menor ponderación',
          '• Los niveles requieren mantener promedios mínimos',
          '• El sistema recalcula niveles periódicamente (ventana móvil)',
          'Esto impide inflar perfiles mediante validaciones artificiales.',
        ],
      },
    ],
  },
  {
    title: 'Privacidad y control del candidato',
    items: [
      {
        question: '¿Cómo funciona el anonimato?',
        answer: [
          'El sistema protege la identidad del candidato en etapas iniciales.',
          'El reclutador puede ver:',
          '• Match score',
          '• Habilidades',
          '• Validaciones',
          'Pero no puede ver:',
          '• Nombre',
          '• Foto',
          '• Datos de contacto',
        ],
      },
      {
        question: '¿Cuándo se revela la identidad?',
        answer: [
          'La identidad se revela únicamente cuando:',
          '• El reclutador muestra interés',
          '• El candidato evalúa la propuesta',
          '• El candidato decide avanzar',
          'Este modelo se denomina "reverse pitch" y elimina sesgos en la etapa inicial.',
        ],
      },
    ],
  },
  {
    title: 'Dinámica de la red',
    items: [
      {
        question: '¿Por qué validar a otros mejora mi perfil?',
        answer: [
          'El sistema funciona como un modelo de reputación:',
          '• Validar incrementa el historial del usuario',
          '• El historial mejora su nivel como validador',
          '• Un mayor nivel aumenta el peso de sus validaciones',
          '• Esto mejora su visibilidad y posicionamiento',
          'Es un sistema acumulativo basado en confianza profesional.',
        ],
      },
    ],
  },
];

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  const lines = Array.isArray(item.answer) ? item.answer : [item.answer];

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left hover:text-[var(--sp-violet)] transition-colors"
      >
        <span className="text-sm font-medium">{item.question}</span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--sp-gray-medium)] flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="pb-4 space-y-2">
          {lines.map((line, i) => {
            const isBullet = line.startsWith('•');
            const isSubBullet = line.startsWith('   •');
            const isNumbered = /^\d\./.test(line);
            const isTierLabel = ['Plata', 'Oro', 'Platino'].includes(line.trim());
            const isFormula = line.includes('×') && (line.includes('+') || line.includes('='));

            if (isTierLabel) {
              return (
                <p key={i} className="text-sm font-semibold text-[var(--sp-violet)] mt-3">
                  {line}
                </p>
              );
            }

            if (isFormula) {
              return (
                <p
                  key={i}
                  className="text-sm font-mono bg-[var(--sp-violet-light)] text-[var(--sp-violet-dark)] px-3 py-2 rounded-lg"
                >
                  {line}
                </p>
              );
            }

            if (isNumbered) {
              return (
                <p key={i} className="text-sm font-semibold text-[var(--sp-gray-dark)] mt-2">
                  {line}
                </p>
              );
            }

            if (isSubBullet) {
              return (
                <p key={i} className="text-sm text-[var(--sp-gray-medium)] pl-8">
                  {line.trim()}
                </p>
              );
            }

            if (isBullet) {
              return (
                <p key={i} className="text-sm text-[var(--sp-gray-medium)] pl-4">
                  {line}
                </p>
              );
            }

            return (
              <p key={i} className="text-sm text-[var(--sp-gray-medium)]">
                {line}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface FAQPageProps {
  type: 'recruiter' | 'candidate';
}

export default function FAQPage({ type }: FAQPageProps) {
  return (
    <div className={`flex min-h-screen bg-[var(--sp-gray-light)] ${type === 'recruiter' ? 'theme-recruiter' : ''}`}>
      <Sidebar type={type} />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-1">Preguntas frecuentes</h1>
            <p className="text-sm text-[var(--sp-gray-medium)]">
              Conocé cómo funciona Skill Passport
            </p>
          </div>

          {faqSections.map((section) => (
            <div key={section.title} className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-[var(--sp-violet)]" />
                <h3 className="font-semibold">{section.title}</h3>
              </div>
              <div>
                {section.items.map((item) => (
                  <FAQAccordionItem key={item.question} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
