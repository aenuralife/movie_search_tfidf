function calculateIDF(documents) {

    const idf = {};

    const totalDocuments = documents.length;

    const vocabulary = new Set();

    documents.forEach(doc => {

        doc.tokens.forEach(term => {

            vocabulary.add(term);

        });

    });

    vocabulary.forEach(term => {

        let df = 0;

        documents.forEach(doc => {

            if (doc.tokens.includes(term)) {

                df++;

            }

        });

        idf[term] = Math.log(totalDocuments / (1 + df));

    });

    return idf;

}

module.exports = calculateIDF;