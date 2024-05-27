# Club Deportivo Discipline Spa

Este proyecto es una aplicación CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar los deportes ofrecidos por el Club Deportivo Discipline Spa. La información se persiste en un archivo JSON y se sirve a través de una API REST construida con Node.js y Express.

## Contenido

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Validaciones](#validaciones)
- [Dependencias](#dependencias)

## Instalación

Para instalar y configurar el proyecto, sigue estos pasos:

1. Clona el repositorio:

2. Instala las dependencias necesarias:

    ```sh
    npm install
    ```

3. Asegúrate de que los siguientes archivos estén en el directorio raíz del proyecto:
    - `servidor.js`
    - `index.html`
    - `scripts.js`
    - `sports.json`

4. Inicia el servidor:

    ```sh
    node servidor.js
    ```

5. Abre tu navegador y navega a `http://localhost:3000` para ver la aplicación en funcionamiento.

## Uso

La aplicación proporciona una interfaz gráfica para gestionar los deportes del club deportivo. Desde la página principal, puedes:

- Agregar un nuevo deporte.
- Ver la lista de deportes registrados.
- Editar el precio de un deporte.
- Eliminar un deporte.

## API Endpoints

La aplicación utiliza los siguientes endpoints:

- `GET /` - Sirve la página principal (`index.html`).
- `GET /scripts.js` - Sirve el archivo JavaScript.
- `POST /sports` - Agrega un nuevo deporte.
- `GET /sports` - Devuelve todos los deportes registrados.
- `PUT /sports/:name` - Actualiza el precio de un deporte.
- `DELETE /sports/:name` - Elimina un deporte.

## Validaciones

La aplicación incluye las siguientes validaciones:

- El nombre del deporte debe ser una cadena alfabética sin números.
- El nombre del deporte no debe exceder los 50 caracteres.
- El precio debe ser un número positivo y no debe exceder los 10 caracteres.
- No se permiten nombres de deportes duplicados.

## Dependencias

Las dependencias del proyecto están listadas en `package.json` e incluyen:

- `express`
- `body-parser`
- `axios`
- `jquery`
- `bootstrap`
- `popper.js`
