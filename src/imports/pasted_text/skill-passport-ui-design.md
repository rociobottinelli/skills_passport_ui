Diseñá la UI web (desktop, 1440px) de un MVP llamado "Skill Passport", un marketplace de empleo que invierte la jerarquía tradicional priorizando al candidato mediante transparencia, validación social de habilidades y contacto anónimo de alto valor. La plataforma tiene dos tipos de usuario: Reclutador y Candidato. Generá ambos flujos completos como pantallas separadas conectadas.

═══════════════════════════════════════════
SISTEMA DE DISEÑO (aplicar a TODAS las pantallas)
═══════════════════════════════════════════

Estilo: moderno, limpio, profesional pero con personalidad. Inspiración: Linear + Notion + Pitch. Nada de aspecto corporativo aburrido tipo LinkedIn clásico.

Paleta:
- Primario: violeta-azul #5B5BF5 (acciones, links, marca)
- Acento de match: verde #10B981 (skills que matchean, scores altos)
- Acento de alerta suave: rojo coral #F87171 (skills faltantes)
- Neutros: blanco #FFFFFF, gris claro #F8F9FB (fondos), gris medio #6B7280 (texto secundario), gris oscuro #111827 (texto principal)
- Anónimo: gradiente violeta-índigo con efecto "blur" o silueta para identidad oculta

Tipografía: sans-serif geométrica (Inter o similar). Títulos H1 grandes (40-48px) con tracking ajustado. Body 14-16px.

Componentes recurrentes:
- Cards con border-radius 16px, sombra suave, padding 24px
- Botones primarios con fondo violeta sólido y border-radius 12px
- Badges/chips para skills (pill shape, fondo suave del color correspondiente)
- Match Score: círculo grande con porcentaje + label (ej: "85% Match")
- Avatares circulares con borde sutil
- Sidebar de navegación lateral fija a la izquierda en pantallas internas

═══════════════════════════════════════════
FLUJO 1 — RECLUTADOR
═══════════════════════════════════════════

Pantalla 1.1 — Landing / Registro
- Hero con tagline tipo "Encontrá talento que ya viene validado por su red"
- Toggle "Soy Reclutador / Soy Candidato"
- Form de registro: email, contraseña, nombre de empresa, sitio web

Pantalla 1.2 — Login
- Formulario simple de email + contraseña
- Link "Olvidé mi contraseña" y "Crear cuenta"

Pantalla 1.3 — Onboarding empresa
- Wizard de 3 pasos: datos de la empresa, logo, industria + tamaño, descripción de cultura

Pantalla 1.4 — Dashboard vacío
- Estado inicial sin ofertas publicadas
- CTA grande "Publicá tu primera búsqueda"
- Sidebar con: Dashboard, Mis búsquedas, Talento, Mensajes anónimos, Configuración

Pantalla 1.5 — Crear oferta (formulario en pasos)
- Paso 1: título del puesto, modalidad (remoto/híbrido/presencial), seniority
- Paso 2: skills requeridas (input con autocompletado de tags + nivel deseado por skill)
- Paso 3: descripción, rango salarial, beneficios
- Paso 4: preview antes de publicar

Pantalla 1.6 — Oferta publicada (confirmación)
- Mensaje de éxito + preview de la card que verán los candidatos

Pantalla 1.7 — Dashboard con búsqueda activa
- Card de la oferta con métricas: candidatos sugeridos, "Me interesa" recibidos, consultas anónimas
- Tab "Talento Compatible" abajo

Pantalla 1.8 — Lista de Talento Compatible
- Lista ordenada por Match Score (mayor a menor)
- Cada fila: avatar, nombre, rol actual, Match Score grande, top 3 skills validadas en chips, botón "Ver perfil detallado"
- Filtro arriba: "Solo candidatos que marcaron Me interesa" (toggle)
- Filtros adicionales por skill, ubicación, seniority

Pantalla 1.9 — Perfil detallado del candidato (CLAVE — incluir validadores visibles)
- Header: avatar grande, nombre, rol actual, ubicación, Match Score con desglose
- Sección "Habilidades validadas": lista de skills con nivel de confianza (puntaje sobre 10) y cantidad de validaciones
- Sección "Experiencia": cards de proyectos y empleos
- 🔥 SECCIÓN DESTACADA "Validado por su red": 3 cards horizontales mostrando 3 personas que lo recomendaron, cada una con: foto, nombre, rol actual, empresa donde trabajan, relación profesional con el candidato (ej: "Líder de proyecto", "Compañero de equipo"), y la skill específica que validaron + puntaje que le dieron
- Botón "Contactar" + indicador si el candidato está abierto a consultas anónimas

Pantalla 1.10 — Bandeja de consultas anónimas
- Lista de mensajes de candidatos anónimos
- Cada item muestra: silueta/avatar genérico con efecto blur, "Candidato Anónimo #ID", categoría de la consulta (Sueldo / Cultura / Stack / Beneficios), indicadores de potencial: "95% Match", "Validado por 2 perfiles Senior de empresas partner", fecha

Pantalla 1.11 — Detalle de consulta anónima + responder
- Pregunta del candidato visible
- Panel lateral con los indicadores de potencial (sin identidad)
- Editor de respuesta con CTA "Responder para atraer al talento"

Pantalla 1.12 — Notificación: perfil revelado
- Card destacada: "Un candidato decidió revelarte su perfil"
- Acceso a perfil completo + CV + datos de contacto

═══════════════════════════════════════════
FLUJO 2 — CANDIDATO
═══════════════════════════════════════════

Pantalla 2.1 — Registro candidato
- Form: email, contraseña, nombre completo, ubicación, rol actual

Pantalla 2.2 — Login (igual estructura que reclutador)

Pantalla 2.3 — Onboarding candidato (wizard)
- Paso 1: foto, headline profesional
- Paso 2: agregar habilidades (input con autocompletado, selector de años de experiencia por skill: <1, 1-3, 4-6, 7-10, +10)
- Paso 3: agregar proyectos (título, descripción, rol, skills usadas, link, fechas)
- Paso 4: agregar experiencia laboral

Pantalla 2.4 — Mi Perfil (vista propia)
- Header con avatar, nombre, headline, completitud del perfil (barra de progreso)
- Sidebar: Inicio, Matches, Mis habilidades, Validaciones, Mensajes
- Sección Skills: cada chip muestra estado: "Validada" (verde con check), "Pendiente" (amarillo con reloj), "Sin validar" (gris). Botón "Solicitar validación" en cada una sin validar
- Sección Proyectos: cards editables
- Sección "Validaciones que diste": lista de gente que validaste

Pantalla 2.5 — Solicitar validación de una skill
- Modal o pantalla: skill seleccionada arriba (ej: "Java")
- Sistema sugiere validadores: lista de usuarios que ya tienen esa skill validada, mostrando su nivel de confianza en la skill
- Para cada sugerido: botón "Solicitar"

Pantalla 2.6 — Especificar relación profesional (al solicitar)
- Selector de relación con dropdown o cards: Sin relación / Compañero de estudio / Compañero de trabajo / Miembro del mismo proyecto / Líder técnico / Gerente directo
- Mensaje opcional al validador
- CTA "Enviar solicitud"

Pantalla 2.7 — Estado de validaciones pendientes
- Lista de skills en estado "Pendiente" con avatar del validador y tiempo desde la solicitud

Pantalla 2.8 — Validar a otro usuario (solicitud entrante)
- Card destacada: "Juan Pérez te pidió que valides su habilidad en Java"
- Muestra perfil resumido del solicitante y la relación que él indicó
- Slider o selector de valoración de confianza (1-10)
- Mostrar al validador cómo se calculará el peso de su validación: experiencia técnica del validador (50%), historial validando esa skill (30%), relación profesional (20%) — con su puntaje final preview
- Botones "Validar" / "Rechazar"

Pantalla 2.9 — Feed de Matches Sugeridos (home del candidato)
- Lista vertical de cards de oferta, cada una con: logo de empresa, nombre del puesto, Match Score grande (ej: 85%), modalidad, ubicación, top 3 skills requeridas en chips
- Sidebar de filtros: rango salarial, modalidad, seniority

Pantalla 2.10 — Detalle de oferta + desglose de Match
- Header de la oferta
- 🔥 SECCIÓN "Por qué es un match": dos columnas
  - Izquierda (verde): "Habilidades que coinciden" con check icons
  - Derecha (gris/coral suave): "Habilidades que faltan"
- Descripción de la oferta, beneficios, rango salarial
- Botones principales: "Me interesa" (primario) y "Solicitar más info (Anónimo)" (secundario con icono de máscara/blur)

Pantalla 2.11 — Modal: solicitar info anónima
- Selector de categoría de duda: Sueldo / Cultura / Stack tecnológico / Beneficios / Modalidad / Otro
- Textarea para la pregunta
- Banner informativo: "Tu identidad permanecerá oculta. El reclutador solo verá tu Match Score y validaciones de la red"
- CTA "Enviar de forma anónima"

Pantalla 2.12 — Bandeja de respuestas anónimas
- Lista de hilos con reclutadores
- Cada item: logo de empresa, puesto, categoría de la pregunta, fecha de respuesta

Pantalla 2.13 — Ver respuesta del reclutador + decisión
- Pregunta original del candidato + respuesta del reclutador
- Footer con dos botones grandes: "Revelar mi perfil" (primario, verde) y "Seguir anónimo" (secundario)
- Disclaimer: "Si revelás tu perfil, el reclutador recibirá tus datos de contacto y CV completo"

Pantalla 2.14 — Confirmación de perfil revelado
- Mensaje de éxito + preview de qué información compartió el candidato

═══════════════════════════════════════════
NOTAS FINALES
═══════════════════════════════════════════

- Conectá las pantallas mostrando flechas/transiciones que indiquen el flujo lógico de navegación.
- Diferenciá visualmente los dos flujos con una etiqueta o marco de color: azul para reclutador, violeta para candidato.
- Donde haya datos, usá ejemplos realistas en español argentino (nombres reales tipo "Sofía Martínez", empresas tipo "Mercado Libre", "Globant", "Despegar"; tecnologías reales como React, Java, Python, Figma, Product Management).
- Mantené consistencia tipográfica y espaciado entre todas las pantallas.
- En la pantalla del perfil detallado del candidato (1.9), asegurate de que la sección de los 3 validadores sea visualmente prominente: es el diferencial del producto.