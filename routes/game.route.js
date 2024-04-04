import express from 'express';
import gameController from '../Controllers/game.controller.js';

const router = express.Router();

router.post('/', gameController.createNewGame);
router.get('/', gameController.getGames);
router.put('/', gameController.updateGame);
router.delete('/:gameId', gameController.deleteGameById);

export default router;
