# ER Studio

Web de la agencia ER Studio: páginas web para cualquier negocio, de sencillas a cinematográficas.

Incluye tres webs de ejemplo navegables en `demos/` (restaurante Brasa, clínica Northshore Dental y constructora Ironline Builders).

Es una web estática (HTML, CSS y JavaScript), sin dependencias ni proceso de compilación:

- `index.html`: el contenido de la página.
- `styles.css`: colores, tipografías y diseño.
- `main.js`: cambio de idioma inglés/español, la película que avanza con el scroll, los ejemplos en vivo y los botones de "boceto gratis", que abren un email a growthwithraul@gmail.com.

## Publicarla gratis con GitHub Pages

1. En este repositorio, entra en **Settings → Pages**.
2. En **Source**, elige **Deploy from a branch**, rama **main** y carpeta **/ (root)**. Guarda.
3. En un par de minutos estará en `https://alfonsoraul03-dot.github.io/STOPSCROLL/`.

## Conectar tu dominio (por ejemplo erstudio.com o similar)

1. Compra el dominio en tu registrador.
2. En **Settings → Pages → Custom domain**, escribe el dominio y guarda.
3. En el panel DNS del registrador, crea los registros que indica GitHub (cuatro registros `A` para el dominio raíz y un `CNAME` `www` hacia `alfonsoraul03-dot.github.io`).
4. Cuando el certificado esté listo, activa **Enforce HTTPS**.

## Cambiar textos o precios

Edita `index.html` directamente en GitHub (icono del lápiz) y guarda: la web se actualiza sola en uno o dos minutos.
