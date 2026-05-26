En la app Skill Passport, en el PERFIL DEL CANDIDATO, dentro de la página "Mis habilidades", sección "Habilidades validadas", necesito agregar más transparencia. Mantené el design system actual (violeta #5B5BF5, verde match #10B981/#EAF3DE/#27500A, Inter, estilo Linear/Notion, fondo blanco, bordes 0.5px).

CAMBIO 1 — Puntaje + nivel en cada habilidad de la lista
Cada habilidad validada de la lista ahora muestra, a la derecha:
- Un puntaje numérico sobre 10 (ej: "9.1 / 10")
- El nivel alcanzado debajo (Colaborador / Ejecutor autónomo / Líder / Referente)
- La cantidad de validaciones (ej: "4 validaciones de tu red")
- Un botón/link "Ver detalle" (o un ícono de chevron/expandir) que abre un pop-up

Ejemplo de datos para la lista:
- Java → 9.1 / 10 → Referente → 4 validaciones
- Spring Boot → 8.6 / 10 → Líder → 3 validaciones
- PostgreSQL → 8.2 / 10 → Ejecutor autónomo → 2 validaciones

CAMBIO 2 — Pop-up / modal de detalle de la habilidad
Al tocar "Ver detalle" en una habilidad, se abre un pop-up (modal centrado o panel lateral) con TODAS las validaciones individuales de esa habilidad. Para máxima transparencia.

HEADER del pop-up:
- Ícono de la skill + nombre (ej: "Java")
- Subtítulo: "4 validaciones de tu red"
- A la derecha: el puntaje consolidado grande (ej: "9.1 / 10") y debajo "Nivel: Referente"

LISTA de validaciones (ordenadas por peso del validador, de mayor a menor). Cada validación es una fila/bloque con:

1) Encabezado del validador:
   - Avatar con iniciales
   - Nombre del validador
   - Badge "RENAPER" (identidad verificada, verde, con ícono escudo)
   - Rol y empresa (ej: "Tech Lead · Mercado Libre")
   - Status de reputación del validador como pill (Validador Oro / Plata / Bronce / Platino) con su color
   - A la derecha: un pill con el NIVEL que este validador le asignó a la habilidad (ej: "Referente", "Líder")

2) Caja de "Score de reputación del validador" (fondo gris sutil #F8F9FB), que muestra CÓMO se calculó el peso de ese validador — esto replica exactamente esta lógica:
   - Título: "Score de reputación del validador" + el número a la derecha (ej: "8.3 / 10")
   - 3 filas con mini-barras de progreso violetas:
     · Experiencia: [años] → [pts] × 50% = [resultado]
     · Historial: [N validaciones] → [pts] × 30% = [resultado]
     · Relación: [tipo de relación] → [pts] × 20% = [resultado]
   - Línea final con la fórmula: "Puntaje final: (X×0.5) + (Y×0.3) + (Z×0.2) = [total]"

3) Comentario que dejó el validador (en cursiva, con una barra lateral violeta a la izquierda tipo cita).

DATOS DE EJEMPLO para el pop-up de Java (usar estos):

Validación 1:
- Martín Ramírez · RENAPER verificado · Tech Lead · Mercado Libre · Validador Oro
- Nivel asignado: Referente
- Score reputación: 8.3 / 10
  · Experiencia: 8 años → 7 pts × 50% = 3.5
  · Historial: 52 validaciones → 10 pts × 30% = 3.0
  · Relación: Líder de proyecto → 9 pts × 20% = 1.8
  · Final: (7×0.5)+(10×0.3)+(9×0.2) = 8.3
- Comentario: "Define la arquitectura Java del equipo y mentorea a los devs nuevos. Es la persona a la que todos consultan cuando hay una decisión técnica difícil."

Validación 2:
- Valentina Cruz · RENAPER verificado · Senior dev · Despegar · Validador Plata
- Nivel asignado: Líder
- Score reputación: 7.4 / 10
  · Experiencia: 6 años → 6 pts × 50% = 3.0
  · Historial: 28 validaciones → 8 pts × 30% = 2.4
  · Relación: Compañera de equipo → 10 pts × 20% = 2.0
  · Final: (6×0.5)+(8×0.3)+(10×0.2) = 7.4
- Comentario: "Trabajamos juntas dos años. Su código Java es de los más limpios que vi, siempre pensando en mantenibilidad."

Validación 3:
- Diego Giménez · RENAPER verificado · Engineering Manager · Globant · Validador Platino
- Nivel asignado: Referente
- Score reputación: 8.9 / 10
  · Experiencia: 10 años → 9 pts × 50% = 4.5
  · Historial: 41 validaciones → 9 pts × 30% = 2.7
  · Relación: Manager directo → 9 pts × 20% = 1.8
  · Final: (9×0.5)+(9×0.3)+(9×0.2) = 8.9 (aprox, ajustar redondeo)
- Comentario: "Como su manager, vi a Sofía crecer hasta volverse la referente técnica del equipo. Lidera por conocimiento, no por cargo."

Validación 4:
- Lucas Fernández · RENAPER verificado · Senior dev · Mercado Libre · Validador Plata
- Nivel asignado: Líder
- Score reputación: 7.1 / 10
  · Experiencia: 5 años → 6 pts × 50% = 3.0
  · Historial: 19 validaciones → 7 pts × 30% = 2.1
  · Relación: Compañero de equipo → 10 pts × 20% = 2.0
  · Final: (6×0.5)+(7×0.3)+(10×0.2) = 7.1
- Comentario: "Pair-programeamos un montón. Explica las cosas de Java de una forma que cualquiera entiende."

ESTILO del pop-up:
- Respetá "reducir cuadros": NO anides cajas dentro de cajas innecesariamente. Cada validación se separa de la siguiente con un divider sutil (línea 0.5px), no con un borde completo. La única caja interna es la del "score de reputación" porque agrupa el cálculo.
- El comentario va con barra lateral izquierda violeta, no en una caja.
- Botón de cerrar (X) arriba a la derecha del modal.
- El pop-up debe scrollear internamente si hay muchas validaciones.

COHERENCIA: este mismo patrón (puntaje + nivel + botón ver detalle → pop-up con validaciones) se aplica a TODAS las habilidades, técnicas y blandas. Generá el componente de forma reutilizable.