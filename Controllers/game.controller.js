import gameService from '../services/game.service.js';
import mapService from '../services/map.service.js';

async function createNewGame(req, res, next) {
  try {
    const game = req.body;
    if (req.session.user.role !== 'admin') {
      return res.status(403).send({ message: 'Forbidden' });
    }
    res.status(200).send(await gameService.createNewGame(game));
  } catch (error) {
    console.log('controller error');
    next(error);
  }
}

async function updateGame(req, res, next) {
  try {
    const game = req.body;
    if (req.session.user.role !== 'admin') {
      return res.status(403).send({ message: 'Forbidden' });
    }
    res.status(200).send(await gameService.updateGame(game));
  } catch (error) {
    next(error);
  }
}

async function getGames(req, res, next) {
  try {
    res.status(200).send(await gameService.getGames());
  } catch (error) {
    next(error);
  }
}

async function deleteGameById(req, res, next) {
  try {
    console.log('controller');
    const gameId = req.params.gameId;
    if (req.session.user.role !== 'admin') {
      return res.status(403).send({ message: 'Forbidden' });
    }
    await gameService.deleteGameById(gameId);
    res.status(200).send({ message: `Game id ${gameId} deleted successfully` });
  } catch (error) {
    next(error);
  }
}
export default { createNewGame, updateGame, getGames, deleteGameById };
