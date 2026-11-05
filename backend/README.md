# Backend (Firebase)

- `firestore.rules`: quién puede leer y escribir cada colección.
- `firestore.indexes.json`: índices compuestos de las consultas del panel.
- `functions/`: Cloud Functions (TypeScript). `functions/scripts/seed.mjs` carga datos de prueba, solo en los emuladores.

## Modelo de datos

| Colección | Contenido | Quién accede |
|---|---|---|
| `users/{uid}` | Perfil del equipo: `name`, `email`, `role` (`admin` \| `doctor`), `specialty` | Lo lee todo el equipo; solo se escribe con la función `createStaffUser` |
| `patients/{id}` | Datos del paciente y `doctorId` (médico tratante) | Admin: todos. Médico: solo los suyos |
| `patients/{id}/notes/{id}` | Notas clínicas; no se editan ni se borran | Solo el médico tratante |
| `appointments/{id}` | Cita: paciente, médico, `start`/`end`, `status`, `reason`, `meetingUrl` | Admin: todas. Médico: solo las suyas |

Estados de una cita: `pendiente`, `confirmada`, `en-sala`, `atendida`, `cancelada`.

## Cloud Functions

- `createStaffUser` (callable, solo admin): crea la cuenta en Auth y su perfil en `users/{uid}`.

Pendiente: generar automáticamente el enlace de la videollamada (`meetingUrl`) al crear una cita, cuando se
elija el proveedor de video. Mientras tanto, el enlace se pega a mano en la cita o en el consultorio.
