const calculateTF = require("./tf");
const calculateTFIDF = require("./vector");
const cosineSimilarity = require("./cosine");
const preprocessQuery = require("./query");

function search(query, documents, idf, page = 1, limit = 20) {

    const tokens = preprocessQuery(query);

    if(tokens.length === 0){

        return {
            results: [],
            total_results: 0,
            total_pages: 0,
            page
        };

    }

    const tf = calculateTF(tokens);

    const queryVector = calculateTFIDF(tf, idf);

    let results = documents.map(movie => {

        return {

            ...movie,

            score: cosineSimilarity(
                queryVector,
                movie.vector
            )

        };

    });

    results = results
        .filter(movie => movie.score > 0)
        .sort((a,b)=>b.score-a.score);

    const totalResults = results.length;

    const totalPages = Math.ceil(totalResults / limit);

    const start = (page-1)*limit;

    const end = start + limit;

    return {

        page,

        total_results: totalResults,

        total_pages: totalPages,

        results: results.slice(start,end)

    };

}

module.exports = search;