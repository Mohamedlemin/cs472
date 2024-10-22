import fs from 'fs';

const dictionaryData = JSON.parse(fs.readFileSync('englishdictionary.json', 'utf8'));
const dictionary = dictionaryData.entries;

class Dictionary {
    constructor(word, wordType, definition) {
        this.word = word;
        this.wordType = wordType;
        this.definition = definition;
    }
    static searchCounts = {};

    static getAll() {
        return structuredClone(dictionary);
    }

    static getWordByTerm(term) {
        const lowerCaseTerm = term.toLowerCase();
        const results = dictionary.filter(entry => {
            return entry.word && entry.word.toLowerCase() === lowerCaseTerm;
        });
        if (results.length > 0) {
            this.searchCounts[lowerCaseTerm] = (this.searchCounts[lowerCaseTerm] || 0) + 1;
            return results;
        }
        return null;
    }

    static getPopularTerms() {
        const popularTermsArray = Object.entries(this.searchCounts);
        popularTermsArray.sort((a, b) => b[1] - a[1]);
        const top10Terms = popularTermsArray.slice(0, 10).map(entry => entry[0]);
        return top10Terms;
    }
}

export default Dictionary;