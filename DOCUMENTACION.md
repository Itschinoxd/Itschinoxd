# Documentación del proyecto

## 1) Estructura general
- `index.html`: página principal con panel de inicio, vista previa, comentarios y catálogo completo.
- `styles.css`: estilos gamer RGB (negro, rojo, azul), tarjetas y responsive móvil.
- `script.js`: lógica de 50 libros, filtros por texto y género, render de preview + catálogo.
- `reader.html`: pantalla para abrir un libro PDF.
- `reader.css`: estilos de la pantalla de lectura PDF.
- `reader.js`: recibe parámetros (`file`, `title`) y carga el PDF en un iframe.
- `pdf/`: carpeta para tus libros PDF (`libro-1.pdf` ... `libro-50.pdf`).
- `assets/backgrounds/`: carpeta para los 2 fondos del sitio.

## 2) Qué hace cada parte del `index.html`
1. **Header (`#inicio`)**: panel principal con botón para ir al catálogo.
2. **Sección Libros destacados**: muestra pocos libros (preview).
3. **Sección Comentarios**: testimonios visuales para dar apariencia profesional.
4. **Sección Catálogo (`#catalogo`)**:
   - buscador por texto,
   - selector por género,
   - listado completo de libros filtrables,
   - botón para volver al panel principal.
5. **Template de tarjeta**: estructura reutilizable para cada libro (portada, datos y botón Leer PDF).

## 3) Lógica en `script.js`
- Crea automáticamente 50 libros con:
  - título,
  - autor,
  - género,
  - año,
  - descripción,
  - portada SVG,
  - ruta PDF (`pdf/libro-N.pdf`).
- Renderiza:
  - 6 libros en la vista previa,
  - todos los libros en catálogo.
- Filtros:
  - búsqueda por título/autor/género,
  - filtro por género exacto.
- El botón **Leer PDF** abre `reader.html` con parámetros para cargar el archivo.

## 4) Lector PDF (`reader.html` + `reader.js`)
- Carga el PDF usando `iframe`.
- Muestra botón **Volver al panel principal** dentro de la pantalla de lectura.
- Si falta el archivo PDF, muestra mensaje de error amigable.

## 5) Fondos (dos imágenes)
Coloca estos archivos en `assets/backgrounds/`:
- `panel-principal.jpg`
- `catalogo.jpg`

Ya están conectados en variables CSS:
- `styles.css`: `--bg-main` y `--bg-catalog`
- `reader.css`: `--bg-catalog`

## 6) Cómo agregar tus PDFs
1. Pon tus archivos en `pdf/`.
2. Nómbralos así:
   - `libro-1.pdf`
   - `libro-2.pdf`
   - ...
   - `libro-50.pdf`
3. Al presionar **Leer PDF**, se abre el libro correspondiente.

## 7) Responsive (celular)
- El layout usa grillas flexibles y media queries.
- En móvil:
  - filtros se apilan,
  - tarjetas ajustan altura,
  - lectura PDF mantiene alto visible.
