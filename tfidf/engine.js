const fs = require("fs-extra");
const path = require("path");

const search = require("./search");

let documents = [];
let idf = {};

async function initialize() {

    const index = await fs.readJson(

        path.join(
            __dirname,
            "..",
            "data",
            "tfidf_index.json"
        )

    );

    documents = index.documents;

    idf = index.idf;

    console.log("==============================");

    console.log("INDEX LOADED");

    console.log("Documents :", documents.length);

    console.log("==============================");

}

function searchMovies(query, page = 1) {

    return search(
        query,
        documents,
        idf,
        page
    );

}

module.exports={

    initialize,

    searchMovies

};