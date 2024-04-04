import mapRepository from '../repositories/map.repository.js';

async function createNewMap(map) {
  try {
    return await mapRepository.createNewMap(map);
  } catch (error) {
    throw error;
  }
}

async function updateMap(map) {
  try {
    // This separates the inner object that comes from connections of the tables "cleaning" the object to send only the
    // data necessary for the update (the connections will be updated automatically)
    // .fromEntries turn a array of [[key:value], [key2:value2]] into a object {key:value, key2:value2}
    // .entries is the opposite of fromEntries - object of pairs to array of pairs
    const mapClean = Object.fromEntries(
      Object.entries(map).filter(([key, value]) => {
        return typeof value !== 'object';
      })
    );
    return await mapRepository.updateMap(mapClean);
  } catch (error) {
    throw error;
  }
}

async function getMaps(game) {
  try {
    // Check if query is sent, if not, get all maps from all games
    if (game) {
      return await mapRepository.getMapsByGame(game);
    }
    return await mapRepository.getMaps();
  } catch (error) {
    throw error;
  }
}

async function deleteMapById(stratId) {
  try {
    return await mapRepository.deleteMapById(stratId);
  } catch (error) {
    throw error;
  }
}
export default { createNewMap, updateMap, getMaps, deleteMapById };
