import express from 'express';
import { getAllWords, getWordByTerm, getPopularTerms } from '../controllers/dictionaryController.js';

const router = express.Router();

router.get('/search', getWordByTerm);
router.get('/popular', getPopularTerms);

export default router; 