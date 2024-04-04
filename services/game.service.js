import gameRepository from '../repositories/game.repository.js';

async function createNewGame(game) {
  try {
    return await gameRepository.createNewGame(game);
  } catch (error) {
    throw error;
  }
}

async function updateGame(game) {
  try {
    return await gameRepository.updateGame(game);
  } catch (error) {
    throw error;
  }
}

async function getGames() {
  try {
    return await gameRepository.getGames();
  } catch (error) {
    throw error;
  }
}

async function deleteGameById(gameId) {
  try {
    return await gameRepository.deleteGameById(gameId);
  } catch (error) {
    throw error;
  }
}

export default { createNewGame, updateGame, getGames, deleteGameById };
