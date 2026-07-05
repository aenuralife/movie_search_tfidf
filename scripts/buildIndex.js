const fs = require("fs-extra");
const path = require("path");

const calculateTF = require("../tfidf/tf");
const calculateIDF = require("../tfidf/idf");
const calculateTFIDF = require("../tfidf/vector");

async function buildIndex() {

    const movies = await fs.readJson(
        path.join(
            __dirname,
            "..",
            "data",
            "preprocessed_movies.json"
        )
    );

    // ======================
    // TF
    // ======================

    movies.forEach(movie => {

        movie.tf = calculateTF(movie.tokens);

    });

    // ======================
    // IDF
    // ======================

    const idf = calculateIDF(movies);

    // ======================
    // TF-IDF
    // ======================

    movies.forEach(movie => {

        movie.vector = calculateTFIDF(
            movie.tf,
            idf
        );

        // TF sudah tidak diperlukan lagi
        delete movie.tf;

    });

    const output = {

        totalDocuments: movies.length,

        idf,

        documents: movies

    };

    await fs.writeJson(

        path.join(
            __dirname,
            "..",
            "data",
            "tfidf_index.json"
        ),

        output,

        {
            spaces: 2
        }

    );

    console.log("==========================");

    console.log("INDEX BERHASIL DIBUAT");

    console.log("Total Dokumen :", movies.length);

    console.log("==========================");

}

buildIndex();