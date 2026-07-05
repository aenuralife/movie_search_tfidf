function calculateTF(tokens) {

    const tf = {};

    const totalTerms = tokens.length;

    tokens.forEach(term => {

        tf[term] = (tf[term] || 0) + 1;

    });

    Object.keys(tf).forEach(term => {

        tf[term] = tf[term] / totalTerms;

    });

    return tf;

}

module.exports = calculateTF;