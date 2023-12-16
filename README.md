# API de Adopción de Gatitos 🐾

![NestJS](https://img.shields.io/badge/NestJS-v8.0.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-20.10.8-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-336791?style=for-the-badge&logo=postgresql&logoColor=white)

## Descripción

¡Bienvenido a la API de Adopción de Gatitos, donde la magia de NestJS se encuentra con la ternura felina! Cada endpoint es un sendero digital, conectando corazones peludos con hogares cálidos. Adopta el amor en su forma digital. Adopta con nuestra API. 🐾💙 #AdoptaAmor #NestJS #GatosFelices

## Síguenos a Través de Estos Pasos

1. **Preparativos:**
   Asegúrate de tener Node.js y NestJS instalados en tu sistema.
2. **Configuración de la Base de Datos:**
   Configura las variables de entorno en el archivo `.env.template` y cambia el nombre por `.env` para la conexión a PostgreSQL.
3. **Instalación de Dependencias:**
   Ejecuta `npm install` para instalar las dependencias necesarias.
4. **Ejecutar en Docker:**
   Inicia los contenedores de Docker usando `docker-compose up -d`.
5. Levanta el proyecto utilizando `npm run start:dev` o `npm run open`

## **¡SEED Mágico! 🌱**

¡Inicia tu aventura de adopción de gatitos llenando la base de datos con datos de ejemplo!

- **Método:** `GET`
- **Ruta:** `/api/seed`
- **Descripción:** ¡Primordial para reiniciar la base de datos y llenarla de registros!

## Explora la Magia de la API 🌈

Descubre encantadores endpoints para interactuar con nuestros gatitos:

### Obtener Lista de Gatitos 🐾

- **Método:** `GET`
- **Ruta:** `/api/cats`
- **Descripción:** Explora la lista mágica de gatitos esperando ser adoptados.

### Obtener Detalles de un Gatito 🐾

- **Método:** `GET`
- **Ruta:** `/api/cats/{id}`
- **Descripción:** Sumérgete en la historia de un gatito único.

### Crear Nuevo Gatito ✨

- **Método:** `POST`
- **Ruta:** `/api/cats`
- **Descripción:** Da vida a la magia creando un nuevo perfil para un adorable gatito.

### Actualizar Historia de Gatito 📝

- **Método:** `PUT`
- **Ruta:** `/api/cats/{id}`
- **Descripción:** Da un toque personal a la historia de un gatito.

### Actualización Mágica del Gatito 🌟

- **Método:** `PATCH`
- **Ruta:** `/api/cats/{id}`
- **Descripción:** ¡Transforma la realidad de un gatito con un toque de magia!

### Eliminar Hechizo del Gatito 🪄

- **Método:** `DELETE`
- **Ruta:** `/api/cats/{id}`
- **Descripción:** A veces, es necesario deshacer un hechizo.

## Ver Gatito en el Navegador

- **URL:** `http://localhost:3000/api/files/cat/${id}.${extension}`
- **Ejemplo:** `localhost:3000/api/files/cat/3b76bfa1-2a18-4c65-9d64-1c57d9f59ce2.png`
- **Descripción:** Admira la belleza de un gatito en tu navegador.

## Documentación API Interactiva

¡Explora más detalles y realiza pruebas interactivas en nuestra [documentación en vivo](http://localhost:3000/api/docs/)!

![Michi Navideño](https://c0.wallpaperflare.com/preview/755/291/651/nice-cat-animal-portrait.jpg)

¡Que tu API siga siendo un lugar mágico para la adopción de gatitos! 🌟
