const params =
new URLSearchParams(
    window.location.search
);

const id =
params.get("id");

const type =
params.get("type");

// Jalankan saat halaman dibuka
loadDetail();
loadTrailer();
loadCast();


// ======================
// DETAIL FILM / TV
// ======================

async function loadDetail() {

    try {

        const res =
        await fetch(
            `/api/detail/${type}/${id}`
        );

        const data =
        await res.json();

        const poster =
        data.poster_path
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : "";

        const genres =
        data.genres
            ? data.genres
                .map(g => g.name)
                .join(", ")
            : "-";

        const releaseDate =
        data.release_date ||
        data.first_air_date ||
        "-";

        document.getElementById("detail")
.innerHTML = `

<div class="detail-container">

    <div class="detail-poster">

        <img
        src="${poster}"
        alt="${data.title || data.name}"
        >

    </div>

    <div class="detail-info">

        <h1>
            ${data.title || data.name}
        </h1>

        <p>
            ⭐ ${data.vote_average}
        </p>

        <p>
            🎭 ${genres}
        </p>

        <p>
            📅 ${releaseDate}
        </p>

        <p>
            ${data.overview}
        </p>

    </div>

</div>

`;

    } catch(err) {

        console.error(err);

        document
        .getElementById("detail")
        .innerHTML =
        "<h2>Gagal memuat detail.</h2>";

    }

}


// ======================
// TRAILER YOUTUBE
// ======================

async function loadTrailer() {

    try {

        const res =
        await fetch(
            `/api/trailer/${type}/${id}`
        );

        const data =
        await res.json();

        const trailer =
        data.results.find(
            video =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        );

        if(!trailer){

            document
            .getElementById("trailer")
            .innerHTML =
            "<p>Trailer tidak tersedia.</p>";

            return;
        }

        document
        .getElementById("trailer")
        .innerHTML = `

            <iframe

                width="100%"
                height="500"

                src="https://www.youtube.com/embed/${trailer.key}"

                title="YouTube Trailer"

                frameborder="0"

                allowfullscreen>

            </iframe>

        `;

    } catch(err) {

        console.error(err);

        document
        .getElementById("trailer")
        .innerHTML =
        "<p>Gagal memuat trailer.</p>";

    }

}
async function loadCast() {

    try {

        const res =
        await fetch(
            `/api/cast/${type}/${id}`
        );

        const data =
        await res.json();

        const castContainer =
        document.getElementById("cast");

        castContainer.innerHTML = "";

        data.cast
        .slice(0, 12)
        .forEach(actor => {

            const image =
            actor.profile_path
            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
            : "https://via.placeholder.com/185x278?text=No+Image";

            castContainer.innerHTML += `

                <div class="cast-card">

                    <img
                        src="${image}"
                        alt="${actor.name}"
                    >

                    <h4>
                        ${actor.name}
                    </h4>

                    <p>
                        ${actor.character}
                    </p>

                </div>

            `;

        });

    } catch(err) {

        console.error(err);

    }

}