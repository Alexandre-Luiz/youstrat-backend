import strategyRepository from '../repositories/strategy.repository.js';
import redisClient from '../repositories/redis.js';

async function createNewStrat(game, strat) {
  try {
    // Need to set a security validation of the game sent via params (should be one of the games implemented)
    return await strategyRepository.createNewStrat(game, strat);
  } catch (error) {
    throw error;
  }
}
async function updateStrat(strat, gameId) {
  try {
    // This separates the inner object that comes from connections of the tables "cleaning" the object to send only the
    // data necessary for the update (the connections will be updated automatically)
    // .fromEntries turn a array of [[key:value], [key2:value2]] into a object {key:value, key2:value2}
    // .entries is the opposite of fromEntries - object of pairs to array of pairs
    const stratClean = Object.fromEntries(
      Object.entries(strat).filter(([key, value]) => {
        return typeof value !== 'object';
      })
    );

    return await strategyRepository.updateStrat(stratClean, gameId);
  } catch (error) {
    throw error;
  }
}

async function getGameStrats(game) {
  try {
    const cachedGameStrategies = await redisClient.get(`strategies_${game}`);

    // await client.del(`strategies_${game}`);

    // Checks if there is cache
    if (cachedGameStrategies) {
      return cachedGameStrategies;
    } else {
      const gameStrats = await strategyRepository.getGameStrats(game);
      await redisClient.set(`strategies_${game}`, JSON.stringify(gameStrats), { EX: 600 });
      return gameStrats;
    }
  } catch (error) {
    throw error;
  }
}

async function deleteGameStrat(stratId, gameId) {
  try {
    return await strategyRepository.deleteGameStrat(stratId, gameId);
  } catch (error) {
    throw error;
  }
}
export default { createNewStrat, updateStrat, getGameStrats, deleteGameStrat };
