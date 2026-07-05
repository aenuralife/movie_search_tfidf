const natural = require("natural");
const stopword = require("stopword");

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

function preprocessQuery(query) {

    const lower = query.toLowerCase();

    const tokens = tokenizer.tokenize(lower);

    const filtered = stopword.removeStopwords(tokens);

    return filtered.map(word => stemmer.stem(word));

}

module.exports = preprocessQuery;