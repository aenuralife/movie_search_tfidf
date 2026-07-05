function calculateTFIDF(tf, idf) {

    const vector = {};

    Object.keys(tf).forEach(term => {

        vector[term] = tf[term] * (idf[term] || 0);

    });

    return vector;

}

module.exports = calculateTFIDF;