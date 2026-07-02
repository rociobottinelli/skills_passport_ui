# Skill Passport — Frontend

Frontend de **Skill Passport**, una plataforma que invierte la dinámica tradicional de búsqueda laboral: hace visibles las habilidades reales de los candidatos y les da poder de negociación frente a las empresas mediante matching transparente, validación de habilidades entre pares y postulación anónima (Reverse Pitch).

> 🔗 Backend del proyecto: [skill-passport-backend](https://github.com/<org>/skill-passport-backend)

---

## 📋 Tabla de contenidos

- [Stack tecnológico](#stack-tecnológico)
- [Requisitos previos](#requisitos-previos)
- [Puesta en marcha](#puesta-en-marcha)
- [Variables de entorno](#variables-de-entorno)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Autenticación](#autenticación)
- [Theming (candidato vs. reclutador)](#theming-candidato-vs-reclutador)
- [Scripts disponibles](#scripts-disponibles)
- [Equipo](#equipo)

---

## Stack tecnológico

| Categoría | Tecnología |
|---|---|
| Librería UI | React 18.3 |
| Lenguaje | TypeScript 5.7 |
| Build tool | Vite 6 |
| Estilos | Tailwind CSS 4 |
| Componentes UI | Radix UI + Material UI (MUI) |
| Ruteo | React Router 7 |
| Formularios | React Hook Form |
| HTTP client | Axios |
| Notificaciones | Sonner (toasts) |
| Gráficos | Recharts |
| Animaciones | Motion (Framer Motion) |
| Iconos | Lucide React |

---

## Requisitos previos

- Node.js 18, 20 o superior
- npm (o pnpm, ya que el proyecto trae overrides de pnpm)
- Backend de Skill Passport corriendo (por defecto en `http://localhost:8080`)

---

## Puesta en marcha

### 1. Clonar el repositorio

```bash
git clone https://github.com/rociobottinelli/skills_passport_ui.git
cd skills_passport_ui
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto (ver [Variables de entorno](#variables-de-entorno)).

### 4. Levantar el entorno de desarrollo

```bash
npm run dev
```

La aplicación queda disponible en `http://localhost:5173` (puerto por defecto de Vite).

### 5. Build de producción

```bash
npm run build
```

---

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8080` | URL base del backend (Spring Boot) al que apunta el cliente Axios |

> Todas las variables consumidas en el frontend deben tener el prefijo `VITE_` para que Vite las exponga en `import.meta.env`.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── App.tsx                 # Definición de rutas (React Router)
│   └── components/
│       ├── candidate/          # Pantallas del flujo candidato (perfil, matches, validaciones, onboarding, mensajería anónima)
│       ├── recruiter/          # Pantallas del flujo reclutador (dashboard, ofertas, talento, mensajería anónima)
│       └── shared/             # Componentes compartidos (Button, Input, ProtectedRoute, FAQPage, NotFound)
├── context/
│   └── AuthContext.tsx         # Contexto de autenticación (login, register, sesión)
├── api/
│   └── client.ts                # Instancia de Axios con interceptores (JWT, manejo de errores)
└── types/                       # Tipos e interfaces compartidas (UserType, DTOs, etc.)
```

---

## Rutas de la aplicación

### Públicas
- `/candidate/login` — login de candidato (ruta raíz por defecto)
- `/candidate/register` — registro de candidato
- `/recruiter/landing` — landing + registro de reclutador
- `/recruiter/login` — login de reclutador

### Candidato (protegidas, requieren rol `CANDIDATE`)
- `/candidate/onboarding` — onboarding y verificación de identidad (RENAPER)
- `/candidate/profile` — perfil propio (Skill Passport)
- `/candidate/matches` — ofertas matcheadas
- `/candidate/offer/:id` — detalle de una oferta
- `/candidate/validations/pending` — validaciones pendientes
- `/candidate/validate/:id` — validar a otro candidato
- `/candidate/anonymous-inbox` — inbox de mensajería anónima
- `/candidate/anonymous/:id` — respuesta a consulta anónima
- `/candidate/profile-revealed` — vista de perfil revelado

### Reclutador (protegidas, requieren rol `RECRUITER`)
- `/recruiter/onboarding` — onboarding de la empresa
- `/recruiter/dashboard-empty` / `/recruiter/dashboard` — dashboard sin ofertas / con ofertas activas
- `/recruiter/create-offer` — creación de oferta
- `/recruiter/offer-published` — confirmación de publicación
- `/recruiter/offer/:id` — detalle de oferta
- `/recruiter/talent` / `/recruiter/talent/:id` — listado y detalle de talento matcheado
- `/recruiter/anonymous-inbox` / `/recruiter/anonymous/:id` — mensajería anónima
- `/recruiter/profile-revealed` — perfil de candidato revelado
- `/recruiter/faq` — preguntas frecuentes

Las rutas protegidas usan el componente `ProtectedRoute`, que valida sesión activa y rol (`CANDIDATE` / `RECRUITER`), redirigiendo según corresponda si no se cumplen las condiciones.

---

## Autenticación

- El login devuelve un JWT emitido por el backend, que se guarda en `localStorage` (`sp_token`) junto con el tipo de usuario (`sp_user_type`).
- El cliente Axios (`src/api/client.ts`) adjunta automáticamente el token en el header `Authorization: Bearer <token>` en cada request.
- Ante una respuesta `401`, el interceptor limpia la sesión y redirige a `/candidate/login`.
- Los códigos `403`, `409`, `400` y `5xx` disparan notificaciones (toasts) con el mensaje de error correspondiente.

---

## Theming (candidato vs. reclutador)

La interfaz aplica una clase de tema distinta según el tipo de usuario (`theme-recruiter` para reclutadores), lo que permite variar la paleta de color y otros estilos entre ambos flujos manteniendo el mismo sistema de componentes.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo (Vite) |
| `npm run build` | Genera el build de producción |

---

## Equipo — Grupo G03 (Equipo 3)

| Integrante | Rol |
|---|---|
| Rocío Bottinelli | Desarrolladora Frontend |
| Kiara Pisera | Desarrolladora Backend |
| José Sierra | Desarrollador Backend |
| Joaquín Maver | Product Owner |
| Bautista Bullejos | Analista Funcional |
| Miguel Indriago | Especialista QA |
| Matías Posse Presa | Infraestructura y Seguridad |
| Sebastián Martínez Banega | Project Manager |

Proyecto desarrollado en el marco de **Seminario de Integración Profesional** — UADE, bajo la guía de los profesores Agustín Grangetto y Sebastián Jorge Viñuela.
  
