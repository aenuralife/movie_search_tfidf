let currentPage = 1;
let currentQuery = "";
let currentMode = "trending";
let currentItems = [];

window.onload = loadTrending;
window.onload = () => {

    loadTrending();

    loadGenres();

};

// =====================
// TRENDING
// =====================

async function loadTrending(page = 1) {
    currentMode = "trending";
    currentPage = page;
    const res =
        await fetch(`/api/trending?page=${page}`);

    const data =
        await res.json();
    renderHero(
    data.results[0]
    );
    render(data.results);

    document.getElementById(
        "page-number"
    ).textContent = `Page ${currentPage}`;
}

// =====================
// RENDER CARD
// =====================

function render(items) {
    currentItems = items;

    const results =
        document.getElementById("results");

    results.innerHTML = "";

    items.forEach(item => {

        const title =
            item.title ||
            item.name;

        const poster =
            item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : "";

        const type =
            item.media_type ||
            (item.first_air_date ? "tv" : "movie");

      results.innerHTML += `
    <div
        class="card"
        onclick="showHero(${item.id})"
    >

        <img src="${poster}" alt="${title}">

        <h3>${title}</h3>
        <p class="score">
        Score:
        ${item.score ? item.score.toFixed(4) : "-"}
        </p>

        <button
        class="favorite-btn"
        onclick='event.stopPropagation(); saveFavorite(${JSON.stringify(item)})'>
         Favorite
        </button>

        <br><br>

        <a
        class="detail-btn"
        href="detail.html?id=${item.id}&type=${type}"
        onclick="event.stopPropagation()"
        >
           Lihat Detail
        </a>

    </div>
`;
    });
}
function showHero(id) {

    const movie =
    currentItems.find(
        item => item.id == id
    );

    if(movie){
        renderHero(movie);
    }

}

// =====================
// SEARCH
// =====================

async function searchMovie(page = 1) {
    currentMode = "search";
    const query =
        document.getElementById("search")
        .value
        .trim();

    if (!query) {

        loadTrending();

        return;
    }

    currentQuery = query;
    currentPage = page;

    const res =
        await fetch(
            `/api/search?q=${encodeURIComponent(query)}&page=${page}`
        );

    const data =
        await res.json();

    render(data.results);

document.getElementById(
    "page-number"
).textContent =
`Page ${data.page} / ${data.total_pages}`;
}

// =====================
// LIVE SEARCH
// =====================

const searchInput =
    document.getElementById("search");

searchInput.addEventListener(
    "input",
    () => {

        currentPage = 1;

        searchMovie();

    }
);

// =====================
// PAGINATION
// =====================

function nextPage() {

    console.log(
        "NEXT",
        currentPage,
        currentMode
    );

    currentPage++;

    if(currentMode === "search"){

        searchMovie(currentPage);

    } else {

        loadTrending(currentPage);

    }

}

function prevPage() {

    console.log(
        "PREV",
        currentPage,
        currentMode
    );

    if(currentPage <= 1){
        return;
    }

    currentPage--;

    if(currentMode === "search"){

        searchMovie(currentPage);

    } else {

        loadTrending(currentPage);

    }

}
function renderHero(movie) {

    const backdrop =
    movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "";

    const title =
    movie.title ||
    movie.name;

    document.getElementById(
        "hero"
    ).innerHTML = `

        <div class="hero">

            <img src="${backdrop}">

            <div class="hero-content">

                <h1>${title}</h1>

                <p>
                    ${movie.overview
                        .substring(0, 180)
                    }
                </p>
                <div class="hero-buttons">

    <a
    href="detail.html?id=${movie.id}&type=${movie.media_type || 'movie'}"
    class="hero-detail-btn">

        🎬 Detail

    </a>

</div>

            </div>

        </div>

    `;
}
function saveFavorite(movie) {

    let favorites =
    JSON.parse(
        localStorage.getItem(
            "favorites"
        )
    ) || [];

    const exists =
    favorites.some(
        item =>
        item.id === movie.id
    );

    if(exists){

        alert(
            "Sudah ada di favorit"
        );

        return;
    }

    favorites.push(movie);

    localStorage.setItem(
        "favorites",
        JSON.stringify(
            favorites
        )
    );

    alert(
        "Ditambahkan ke favorit"
    );

}
async function loadGenres() {

    const res =
    await fetch(
        "/api/genres"
    );

    const data =
    await res.json();

    const select =
    document.getElementById(
        "genre"
    );

    data.genres.forEach(
        genre => {

            select.innerHTML += `

                <option
                    value="${genre.id}"
                >
                    ${genre.name}
                </option>

            `;

        }
    );

}