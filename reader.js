const params = new URLSearchParams(window.location.search);
const file = params.get("file");
const title = params.get("title");

const frame = document.querySelector("#pdf-frame");
const readerTitle = document.querySelector("#reader-title");

if (title) {
  readerTitle.textContent = `Leyendo: ${title}`;
}

if (file && file.endsWith(".pdf")) {
  frame.src = file;
} else {
  frame.srcdoc = `
    <div style="
      font-family: Inter, Arial, sans-serif;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #0b1220;
      color: #eef2ff;
      margin: 0;
    ">
      <div style="text-align:center; padding: 1rem;">
        <h2>No se encontró el PDF</h2>
        <p>Verifica la ruta del archivo en la carpeta <code>pdf/</code>.</p>
      </div>
    </div>
  `;
}
