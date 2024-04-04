import Game from '../models/game.model.js';

async function createNewGame(game) {
  try {
    return await Game.create(game);
  } catch (error) {
    throw error;
  }
}
async function updateGame(game) {
  try {
    await Game.update(game, {
      where: {
        gameId: game.gameId,
      },
    });
    return await getGameById(game.gameId);
  } catch (error) {
    throw error;
  }
}

async function getGames() {
  try {
    return await Game.findAll();
  } catch (error) {
    throw error;
  }
}

async function getGameById(gameId) {
  try {
    return await Game.findByPk(gameId, { raw: true });
  } catch (error) {
    throw error;
  }
}

async function deleteGameById(gameId) {
  try {
    await Game.destroy({
      where: {
        gameId,
      },
    });
  } catch (error) {
    throw error;
  }
}

export default { createNewGame, updateGame, getGames, getGameById, deleteGameById };
