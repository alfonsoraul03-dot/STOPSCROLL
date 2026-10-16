# ER Studio

Web de la agencia ER Studio: webs a medida, de sencillas a cinematográficas, para cualquier negocio.

Web estática (HTML, CSS y JavaScript), sin proceso de compilación. Se publica gratis con GitHub Pages.

## Estructura

- `index.html`: portada cinematográfica (escenas con scroll, ejemplos en vivo, antes/después, vista escritorio/tablet/móvil, servicios y precios).
- `work/`: portfolio con filtros por sector y vista galería/índice.
- `contact/`: formulario de proyecto. Al enviar abre el email del visitante con todo rellenado hacia growthwithraul@gmail.com (no hay servidor conectado).
- `assets/`: estilos y scripts de la agencia (`er.css`, `home.css`, `pages.css`, `er.js`, `home.js`, `pages.js`). Animaciones con GSAP desde cdnjs.
- `demos/`: 10 webs de ejemplo con marcas ficticias, cada una con su propia identidad:
  - `halden/` inmobiliaria de lujo (con fichas de propiedad `property.html?p=...`)
  - `solenne/` hotel boutique con panel de reserva
  - `novamar/` alquiler de yates en Miami con solicitud en 4 pasos
  - `brasa/` restaurante (en español) con carta y reservas
  - `marl/` tienda online con carrito y checkout de demostración
  - `kinetic/` gimnasio con horario y reservas de clases
  - `noesis/` empresa de IA con demo simulada
  - `ashford/` consultora estratégica
  - `northshore/` clínica dental · `ironline/` constructora

Todas las demos muestran una etiqueta "Concepto de diseño · marca ficticia" y sus formularios no envían datos.

## Publicar con GitHub Pages

Settings → Pages → Deploy from a branch → `main` / root. URL: `https://erstudioweb.com` (antes `https://alfonsoraul03-dot.github.io/STOPSCROLL/`)

## Dominio propio

Settings → Pages → Custom domain, y en tu registrador crea los registros `A` de GitHub y un `CNAME` `www` hacia `alfonsoraul03-dot.github.io`.
