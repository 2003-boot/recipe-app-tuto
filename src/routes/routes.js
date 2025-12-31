import express from 'express';
import {addFavorite, deleteFavorite, fetchFavorites} from '../controllers/controllers.js';
const router = express.Router();

router.get('/favorites/:userId', fetchFavorites);
router.post('/favorites', addFavorite);
router.delete('/favorites/:userId/:recipeId', deleteFavorite);

export default router;