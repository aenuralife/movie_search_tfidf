const fs = require("fs-extra");
const path = require("path");

const calculateTF = require("./tf");
const calculateIDF = require("./idf");
const calculateTFIDF = require("./vector");
const search = require("./search");

async function test() {

    const movies = await fs.readJson(
        path.join(
            __dirname,
            "..",
            "data",
            "preprocessed_movies.json"
        )
    );

    movies.forEach(movie => {

        movie.tf = calculateTF(movie.tokens);

    });

    const idf = calculateIDF(movies);
       movies.forEach(movie => {

        movie.vector = calculateTFIDF(
            movie.tf,
            idf
        );

    });

        const results = search(
        "robot future war",
        movies,
        idf
    );

    console.log("--------------------------------");

    console.log("Top 10 Hasil");

    console.log("--------------------------------");

    results
        .slice(0,10)
        .forEach((movie,index)=>{

            console.log(
                `${index+1}. ${movie.title || movie.name}`
            );

            console.log(
                "Score :",
                movie.score
            );

            console.log("---------------------");

        });

}

test();