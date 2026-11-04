# Dr. Flavio Sattui · Landing y panel de gestión

Monorepo con tres partes independientes que comparten el mismo proyecto de Firebase (`app-clinica-sattui`):

| Carpeta | Qué es | Tecnología |
|---|---|---|
| `landing/` | Página pública (one page) | Astro 7 + Tailwind 4 |
| `frontend/` | Panel para médicos y administración: consultorio, agenda, pacientes, equipo | React 19 + Vite 8 + Tailwind 4 |
| `backend/` | Reglas e índices de Firestore y Cloud Functions | Firebase (Auth, Firestore, Functions) |
| `shared/` | Tokens de diseño (colores, tipografía) usados por la landing y el panel | CSS (`@theme` de Tailwind) |

## Primera vez

```sh
npm run install:all
```

Crea los archivos de entorno a partir de los ejemplos (no se suben a git):

- `landing/.env` ← `landing/.env.example`
- `frontend/.env` ← `frontend/.env.example`

## Desarrollo

```sh
npm run dev:landing   # landing en http://localhost:4321
npm run emulators     # Firebase local: Auth, Firestore y Functions (UI en http://localhost:4000)
npm run seed          # en otra terminal: datos de prueba en los emuladores
npm run dev:panel     # panel en http://localhost:5173
```

Con `VITE_USE_EMULATORS=true` el panel usa los emuladores y no toca datos reales. El seed crea estos usuarios
(contraseña `panel1234`): `admin@sattui.test`, `flavio@sattui.test` y `nickole@sattui.test`.

## Publicar

```sh
npm run deploy:landing   # landing → app-clinica-sattui.web.app
npm run deploy:panel     # panel   → app-clinica-sattui-panel.web.app
npm run deploy:backend   # reglas, índices y Cloud Functions
```

Antes del primer despliegue del panel y el backend:

1. Crear el sitio del panel: `npx firebase hosting:sites:create app-clinica-sattui-panel`.
2. Activar el plan **Blaze** (requerido por Cloud Functions; tiene capa gratuita).
3. Activar **Authentication → Correo/contraseña** y crear la base **Firestore** en la consola.
4. Crear el primer administrador: en Authentication, agregar un usuario; en Firestore, crear el documento
   `users/{uid del usuario}` con `name`, `email` y `role: "admin"`. Desde ahí, el resto del equipo se crea
   en el panel (sección Equipo).
5. En `frontend/.env`, poner `VITE_USE_EMULATORS=false` antes de `npm run deploy:panel`.
