function cosineSimilarity(vectorA, vectorB) {

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    const terms = new Set([
        ...Object.keys(vectorA),
        ...Object.keys(vectorB)
    ]);

    terms.forEach(term => {

        const a = vectorA[term] || 0;
        const b = vectorB[term] || 0;

        dotProduct += a * b;

        magnitudeA += a * a;
        magnitudeB += b * b;

    });

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    if (magnitudeA === 0 || magnitudeB === 0) {
        return 0;
    }

    return dotProduct / (magnitudeA * magnitudeB);

}

module.exports = cosineSimilarity;