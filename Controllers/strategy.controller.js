import strategyService from '../services/strategy.service.js';

async function createNewStrat(req, res, next) {
  try {
    const { game } = req.params;
    const strat = req.body;
    if (req.session.user.role !== 'admin') {
      return res.status(403).send({ message: 'Forbidden' });
    }

    res.status(200).send(await strategyService.createNewStrat(game, strat));
  } catch (error) {
    next(error);
  }
}
async function updateStrat(req, res, next) {
  try {
    const strat = req.body;
    const gameId = strat.map.gameId;

    if (req.session.user.role !== 'admin') {
      return res.status(403).send({ message: 'Forbidden' });
    }
    res.status(200).send(await strategyService.updateStrat(strat, gameId));
  } catch (error) {
    next(error);
  }
}

async function getGameStrats(req, res, next) {
  try {
    const { game } = req.params;
    res.status(200).send(await strategyService.getGameStrats(game));
  } catch (error) {
    next(error);
  }
}

async function deleteGameStrat(req, res, next) {
  try {
    const stratId = +req.params.stratId;
    // The frontend needs to send the gameId together because we're using a shared strat repository
    // depending on the game
    const gameId = +req.query.gameId;

    if (req.session.user.role !== 'admin') {
      return res.status(403).send({ message: 'Forbidden' });
    }

    await strategyService.deleteGameStrat(stratId, gameId);
    res.status(200).send({ message: `Strategy id ${stratId} deleted successfully` });
  } catch (error) {
    next(error);
  }
}

export default { createNewStrat, updateStrat, getGameStrats, deleteGameStrat };
