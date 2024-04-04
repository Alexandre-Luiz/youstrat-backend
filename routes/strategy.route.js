import express from 'express';
import strategyController from '../Controllers/strategy.controller.js';

const router = express.Router();

router.post('/:game', strategyController.createNewStrat);
router.get('/:game', strategyController.getGameStrats);
router.put('/', strategyController.updateStrat);
router.delete('/:stratId', strategyController.deleteGameStrat);

export default router;
