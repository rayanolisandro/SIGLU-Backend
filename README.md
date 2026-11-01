# SIGLU Backend — Sistema de Gestión de Limpieza Urbana

API REST del sistema SIGLU. Da soporte al frontend (React) para gestionar el trabajo de limpieza urbana de la municipalidad: solicitudes de vecinos, inspecciones, imbornales, flota del taller y desagotes de pozos.

**Integrantes:** Matías Montti y Lisandro Rayano

> 🚧 Proyecto en desarrollo. Por ahora está creada la estructura de módulos y la base de datos. La lógica de negocio y la conexión de los módulos con la base se irán incorporando.

## Tecnologías

- [NestJS] (Node.js + TypeScript)
- PostgreSQL
- Postman (documentación y pruebas de endpoints)

## Estructura del proyecto

```
src/
├── main.ts
└── modules/
    ├── app/
    ├── users/
    ├── auth/
    ├── solicitudes/
    ├── inspecciones/
    ├── imbornales/
    ├── unidades/
    ├── ordenes-trabajo/
    └── desagotes/
```

Cada módulo (salvo `app`) contiene su controlador, servicio, módulo y las carpetas `dto/` y `entities/`.

| Módulo | Descripción |
|---|---|
| `users` | Usuarios del sistema (legajo, contraseña, rol) |
| `auth` | Login y sesión |
| `solicitudes` | Pedidos de los vecinos |
| `inspecciones` | Actas de inspección |
| `imbornales` | Imbornales y desagües, con estado de limpieza y conservación |
| `unidades` | Flota de la municipalidad |
| `ordenes-trabajo` | Órdenes de mantenimiento preventivas y correctivas |
| `desagotes` | Pedidos de desagote de pozos con camión, fecha y horario |

## Base de datos

Se usa PostgreSQL. Tablas: `users`, `unidades`, `imbornales`, `solicitudes`, `inspecciones`, `ordenes_trabajo` y `desagotes`. El módulo `auth` usa la tabla `users`.

Relaciones principales:

- Un usuario carga muchas solicitudes y realiza muchas inspecciones.
- Una solicitud puede tener varias inspecciones y desagotes.
- Una unidad tiene muchas órdenes de trabajo y muchos desagotes.

## Cómo ejecutarlo

Requisitos: Node.js y PostgreSQL instalados.

```bash
# 1. Clonar el repositorio
git clone https://github.com/rayanolisandro/siglu-backend.git
cd siglu-backend

# 2. Instalar dependencias
npm install

# 3. Crear el archivo .env (ver sección siguiente)

# 4. Ejecutar en modo desarrollo
npm run start:dev
```

La API queda disponible en `http://localhost:4000`.

## Variables de entorno

El archivo `.env` no se sube a Git. Hay que crearlo en la raíz del proyecto:

```
PORT=4000
DATABASE_URL=postgresql://usuario:password@localhost:5432/siglu_db
API_BASE_URL=http://localhost:4000/
```

| Variable | Descripción |
|---|---|
| `PORT` | Puerto donde corre el backend |
| `DATABASE_URL` | Conexión a la base de datos PostgreSQL |
| `API_BASE_URL` | URL base de la API |


## Documentación de la API

Los endpoints se documentan y prueban con Postman.

## Qué falta por hacer

- Conectar los módulos con la base de datos
- Login real con sesión y permisos por rol (administrador e inspector)
- Reglas de negocio (por ejemplo, evitar desagotes superpuestos del mismo camión)
- Completar la documentación de la API