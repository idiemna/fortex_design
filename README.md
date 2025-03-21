# Prueba fullstack fortex design

url del proyecto desplegado en render: https://fortex-design.onrender.com/

profile admin: admin@admin.com / 12345
profile user: user@user.com / 12345

requisitos para ejecucion del proyecto de manera local: node 20 o superior

## Tecnologías utilizadas
### Frontend:
- **Next.js 15**
- **Material UI**
- **React Context API**

Ejecucion del proyeto frontend

1. en la consola ubicarnos en la carpeta: cd client
2. Configura las variable de entorno en el archivo .env

    NEXT_PUBLIC_API_URL

3. Instala las dependencias: npm install
   ```
5. Levantar el proyecto: npm run dev
   ```
6. Accede a la aplicación en `http://localhost:3000`.

### Backend:
- **Node.js con Express**
- **Sequelize**
- **PostgreSQL**
- **JWT**

Ejecucion del proyeto backend

1. en la consola ubicarnos con la carpeta: cd api
2. instalar dependecias comando: npm i
3. configurar variables de entorno creando archivo .env

variables de entorno utilizadas:

PORT
JWT_SECRET
CLIENT_URL
DB_HOST
DB_NAME
DB_USER
DB_PASS

4. iniciar proyecto comando: npm run dev
5. (opcional) agregar datos con la consola en psql, los queries se encuentran en la carpeta /api/database/db.sql

Las arquitecturas que se utilizaron en los proyectos fueron Clean Arquitecture para el backend para mantener modularidad y Atomic Design para el frontend para estructuras los componentes de forma organizada y lo mas posible reutilizable