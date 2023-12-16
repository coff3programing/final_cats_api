<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

## Pasos para ejecutar el proyecto

1. Clonar el Proyecto
2. `npm i`
3. Clonar el archivo ``.env.template` y renombrarlo a `.env`
4. Adecuar las varibales de entorno
5. Levantar la base de datos `docker-compose up -d`
6. SEED: Este es primordial para reiniciar la base de datos y llenarla de registros `localhost:3000/api/seed`

7. Levantar `npm run start:dev` o `npm run open`

## PUblic Page

Para poder acceder de manera estatica a una copia que tengo de las imagenes asegurese de escribir `http://localhost:3000/cats-img/gato1.png` si desea ver otra imagen solo cambie el numero, en este caso tenemos hasta 11 images de gatitos
