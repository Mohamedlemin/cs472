import express from 'express';
import { generateText, getWordByTerm, getPopularTerms } from '../controllers/dictionaryController.js';

const router = express.Router();

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for a term
 *     parameters:
 *       - in: query
 *         name: term
 *         required: true
 *         description: Term to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Definitions found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Definition'
 *       500:
 *         description: Internal Server Error
 */
router.get('/search', getWordByTerm);

/**
 * @swagger
 * /popular:
 *   get:
 *     summary: Get popular terms
 *     responses:
 *       200:
 *         description: Popular terms found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PopularTerm'
 *       500:
 *         description: Internal Server Error
 */
router.get('/popular', getPopularTerms);

/**
 * @swagger
 * /generate-text:
 *   post:
 *     summary: Generate text based on a prompt
 *     requestBody:
 *       description: Prompt for text generation
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 required: true
 *                 description: Prompt for text generation
 *     responses:
 *       200:
 *         description: Generated text
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: Internal Server Error
 */
router.post('/generate-text', generateText);

export default router;