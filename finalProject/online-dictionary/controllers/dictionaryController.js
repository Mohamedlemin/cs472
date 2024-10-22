import Dictionary from '../models/dictionary.js';

export const getAllWords = (req, res) => {
    const words = Dictionary.getAll();
    res.json(words);
};

export const getWordByTerm = (req, res) => {
    const term = req.query.term;
    const word = Dictionary.getWordByTerm(term);
    if (word) {
        res.json(word);
    } else {
        res.status(404).send('Word not found');
    }
};

export const getPopularTerms = (req, res) => {
    const popularTerms = Dictionary.getPopularTerms();
    res.json(popularTerms);
};