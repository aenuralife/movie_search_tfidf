const fs = require("fs-extra");
const path = require("path");
const natural = require("natural");
const stopword = require("stopword");

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

async function preprocess() {

    const input = path.join(
        __dirname,
        "..",
        "data",
        "movies.json"
    );

    const movies = await fs.readJson(input);

    const processed = movies.map(movie => {

        const text = `${movie.title || ""} ${movie.overview || ""}`;

        // 1. Case Folding
        const lower = text.toLowerCase();

        // 2. Tokenizing
        const tokens = tokenizer.tokenize(lower);

        // 3. Stopword Removal
        const filtered = stopword.removeStopwords(tokens);

        // 4. Stemming
        const stemmed = filtered.map(word => stemmer.stem(word));

        return {

            ...movie,

            document: stemmed.join(" "),

            tokens: stemmed

        };

    });

    const output = path.join(
        __dirname,
        "..",
        "data",
        "preprocessed_movies.json"
    );

    await fs.writeJson(output, processed, { spaces: 2 });

    console.log("=================================");
    console.log("Preprocessing selesai");
    console.log("Jumlah dokumen :", processed.length);
    console.log("=================================");

}

preprocess();