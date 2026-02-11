const genres = [
  "Fantasía",
  "Ciencia ficción",
  "Misterio",
  "Romance",
  "Historia",
  "Aventura",
  "Drama",
  "Terror",
  "Tecnología",
  "Filosofía",
];

const authors = [
  "Ana Rivas",
  "Carlos Méndez",
  "Lucía Torres",
  "Mateo Salas",
  "Elena Vargas",
  "Jorge Ávila",
  "Paula Neri",
  "Diego Lara",
  "Sofía Ruiz",
  "Nicolás Paredes",
];

const descriptions = [
  "Una historia atrapante que mezcla emoción y descubrimiento.",
  "Un relato profundo sobre decisiones que cambian destinos.",
  "Una travesía llena de secretos, riesgos y valentía.",
  "Una narración ágil ideal para quienes aman los giros inesperados.",
  "Una obra inspiradora sobre crecimiento personal y resiliencia.",
];

const books = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    title: `Libro ${id}`,
    author: authors[i % authors.length],
    genre: genres[i % genres.length],
    year: 1995 + (i % 29),
    description: descriptions[i % descriptions.length],
    cover: createCover(`Libro ${id}`, i),
    pdf: `pdf/libro-${id}.pdf`,
  };
});

const previewContainer = document.querySelector("#preview-books");
const booksContainer = document.querySelector("#books");
const searchInput = document.querySelector("#search");
const genreSelect = document.querySelector("#genre");
const count = document.querySelector("#count");
const template = document.querySelector("#book-template");

function createCover(title, index) {
  const palette = ["#1d4ed8", "#dc2626", "#0f172a", "#2563eb", "#991b1b"];
  const color = palette[index % palette.length];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='420'>
    <rect width='100%' height='100%' fill='${color}'/>
    <rect x='20' y='20' width='260' height='380' fill='rgba(255,255,255,0.12)'/>
    <text x='50%' y='48%' text-anchor='middle' fill='white' font-size='28' font-family='Arial' font-weight='700'>${title}</text>
    <text x='50%' y='58%' text-anchor='middle' fill='white' font-size='16' font-family='Arial'>Edición RGB</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderGenreOptions() {
  const uniqueGenres = [...new Set(books.map((book) => book.genre))].sort((a, b) => a.localeCompare(b));
  for (const genre of uniqueGenres) {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreSelect.appendChild(option);
  }
}

function buildBookNode(book) {
  const node = template.content.cloneNode(true);
  node.querySelector(".book-cover").src = book.cover;
  node.querySelector(".book-cover").alt = `Portada de ${book.title}`;
  node.querySelector(".book-title").textContent = book.title;
  node.querySelector(".book-author").textContent = `Autor: ${book.author}`;
  node.querySelector(".book-year").textContent = `Año: ${book.year}`;
  node.querySelector(".book-description").textContent = book.description;
  node.querySelector(".book-genre").textContent = book.genre;

  const pdfLink = node.querySelector(".btn-read");
  const readerUrl = new URL("reader.html", window.location.href);
  readerUrl.searchParams.set("file", book.pdf);
  readerUrl.searchParams.set("title", book.title);
  pdfLink.href = readerUrl.toString();
  pdfLink.setAttribute("aria-label", `Leer PDF de ${book.title}`);

  return node;
}

function renderPreview(items) {
  previewContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  for (const book of items.slice(0, 6)) {
    fragment.appendChild(buildBookNode(book));
  }
  previewContainer.appendChild(fragment);
}

function renderCatalog(items) {
  booksContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  for (const book of items) {
    fragment.appendChild(buildBookNode(book));
  }
  booksContainer.appendChild(fragment);
  count.textContent = `${items.length} libro(s) encontrados de 50.`;
}

function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedGenre = genreSelect.value;

  const filtered = books.filter((book) => {
    const matchesSearch = [book.title, book.author, book.genre]
      .some((value) => value.toLowerCase().includes(searchTerm));
    const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
    return matchesSearch && matchesGenre;
  });

  renderPreview(filtered);
  renderCatalog(filtered);
}

searchInput.addEventListener("input", applyFilters);
genreSelect.addEventListener("change", applyFilters);

renderGenreOptions();
applyFilters();
