# Garnet Móvil: sitio web

Sitio estático (HTML, CSS y JavaScript sin dependencias) con servicios, chatbot guiado y enlaces a WhatsApp.

## Probar en local

```bash
node server.mjs
```

Abre http://localhost:8080 (otro puerto: `PORT=3000 node server.mjs`).

Pruebas automáticas de la lógica:

```bash
npm test
```

## Editar contenido

Todo vive en `js/config.js`:

- `BUSINESS`: teléfono de WhatsApp (`whatsapp`, con código de país 52), correo y ciudad.
- `SERVICES`: título, descripción e icono de cada servicio, en español e inglés.
- `CHAT_FLOWS`: las preguntas del chatbot por servicio.
- `UI`: textos de botones y mensajes.

Los logos están en `assets/`. Los colores están en las variables al inicio de `css/styles.css`.

## Publicar en GitHub Pages

1. Repositorio: https://github.com/garnetmovil/CancunMx. Los archivos de esta carpeta van en la raíz de la rama `main` (`index.html` junto a `css/`, `js/` y `assets/`, no dentro de otra carpeta).
2. En el repositorio: **Settings → Pages → Build and deployment → Deploy from a branch**, elige `main` y la carpeta `/ (root)`.
3. En 1 o 2 minutos el sitio queda en https://garnetmovil.github.io/CancunMx/

Todas las rutas son relativas, así que funciona dentro de una subcarpeta.
