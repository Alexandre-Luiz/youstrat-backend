import gameRepository from '../repositories/game.repository.js';

// The game clicked in the front is sent via params and the right model is called based on that
// Every game strategy model should be imported here manually so the functions can access the right one
import cs2StratModel from '../models/cs2Strat.model.js';
// import valorantStratModel from '../models/valorantStrat.model.js'
import Map from '../models/map.model.js';

const gameModels = {
  cs2: cs2StratModel,
  // valorant: valorantStratModel,
};

async function createNewStrat(game, strat) {
  try {
    const gameModel = gameModels[game];
    if (!gameModel) {
      throw new Error(`Unsupported game: ${game}`);
    }
    const createdStrat = await gameModel.create(strat);
    return await getStratById(createdStrat.stratId, gameModel);
  } catch (error) {
    throw error;
  }
}

// Get all strategies using game name
async function getGameStrats(game) {
  try {
    const gameModel = gameModels[game];
    if (!gameModel) {
      throw new Error(`Unsupported game: ${game}`);
    }
    return await gameModel.findAll({
      include: [
        {
          model: Map,
          // include: [{ model: Game }],
        },
      ],
    });
  } catch (error) {
    throw error;
  }
}

async function getStratById(stratId, gameModel) {
  try {
    // sending gamemodel together from the update so the model can be selected
    // The tables need the connections, so need to include the model Map
    return await gameModel.findByPk(stratId, { include: [{ model: Map }] });
  } catch (error) {
    throw error;
  }
}

async function updateStrat(strat, gameId) {
  try {
    const game = await gameRepository.getGameById(gameId);
    const gameModel = gameModels[game.gameName];
    await gameModel.update(strat, {
      where: {
        stratId: strat.stratId,
      },
    });
    return await getStratById(strat.stratId, gameModel);
  } catch (error) {
    throw error;
  }
}

async function deleteGameStrat(stratId, gameId) {
  try {
    const game = await gameRepository.getGameById(gameId);
    const gameModel = gameModels[game.gameName];
    await gameModel.destroy({
      where: {
        stratId,
      },
    });
  } catch (error) {
    throw error;
  }
}

export default {
  createNewStrat,
  updateStrat,
  getGameStrats,
  deleteGameStrat,
};
