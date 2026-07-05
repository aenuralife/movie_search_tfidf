const favorites =
JSON.parse(
    localStorage.getItem(
        "favorites"
    )
) || [];

const container =
document.getElementById(
    "favorites"
);

favorites.forEach(movie => {

    const poster =
    movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

    const title =
    movie.title ||
    movie.name;

    const type =
    movie.media_type ||
    "movie";

    container.innerHTML += `

        <div class="card">

            <img src="${poster}">

            <h3>${title}</h3>

            <a href="
            detail.html
            ?id=${movie.id}
            &type=${type}
            ">
                Detail
            </a>

        </div>

    `;

});