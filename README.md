# Plataforma comercial — Backend II

API REST para una plataforma comercial que conecta negocios, compradores, productos, carritos, órdenes y tickets. Incluye autenticación, autorización por roles y recuperación de contraseña por correo electrónico.

## Funcionalidades

- Registro e inicio de sesión con JWT y Passport.
- Autorización según roles.
- Gestión de negocios y compradores.
- CRUD de productos.
- Carritos y generación de órdenes.
- Emisión de tickets.
- Flujo de recuperación de contraseña por email.
- Persistencia en MongoDB.

## Stack

- Node.js con módulos ES
- Express
- MongoDB y Mongoose
- Passport Local y Passport JWT
- bcrypt y JSON Web Tokens
- Nodemailer
- CORS, cookies y dotenv

## Arquitectura

La API sigue una separación por capas: `routes/`, `controllers/`, `daos/` y `models/`. Las utilidades de autenticación y respuestas se encuentran en `src/utils/`, mientras que `src/config/` centraliza base de datos, correo y variables de entorno.

## Configuración

Crear `.env`:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/comercio
SECRET_JWT=una_clave_segura
EMAIL_USER=correo@ejemplo.com
EMAIL_PASS=clave_de_aplicacion
```

## Ejecución

```bash
npm install
npm run dev
```

También está disponible `npm start`. `PostmanTesting.txt` contiene referencias para probar la API.

> Proyecto educativo. No utilizar ni versionar credenciales reales.