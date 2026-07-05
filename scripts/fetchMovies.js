require("dotenv").config();

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        accept: "application/json"
    }
});

const categories = [
    "popular",
    "top_rated",
    "upcoming",
    "now_playing"
];

async function fetchMovies() {

    let movies = [];

    for (const category of categories) {

        console.log(`\n===== ${category.toUpperCase()} =====`);

        for (let page = 1; page <= 20; page++) {

            console.log(`Page ${page}`);

            const { data } = await tmdb.get(
                `/movie/${category}`,
                {
                    params: {
                        language: "en-US",
                        page
                    }
                }
            );

            movies.push(...data.results);

        }

    }

    // Hilangkan duplikat berdasarkan ID
    const uniqueMovies = Array.from(
        new Map(
            movies.map(movie => [movie.id, movie])
        ).values()
    );

    const output = path.join(
        __dirname,
        "..",
        "data",
        "movies.json"
    );

    await fs.ensureDir(path.dirname(output));

    await fs.writeJson(output, uniqueMovies, {
        spaces: 2
    });

    console.log("\n==============================");
    console.log("Dataset selesai dibuat");
    console.log("Jumlah film :", uniqueMovies.length);
    console.log("==============================");

}

fetchMovies();