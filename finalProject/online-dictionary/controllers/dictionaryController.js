import Dictionary from '../models/dictionary.js';

import axios from 'axios';

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



export const generateText = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4o", 
                messages: [
                    { role: 'user', content: prompt }
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
            }
        );

        const generatedText = response.data.choices[0].message.content;
        res.json({ generatedText });
    } catch (error) {
        console.error('Error generating text:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to generate text' });
    }
};