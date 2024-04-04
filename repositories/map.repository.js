import Game from '../models/game.model.js';
import Map from '../models/map.model.js';

async function createNewMap(map) {
  try {
    const createdMap = await Map.create(map);
    return await getMapById(createdMap.mapId);
  } catch (error) {
    throw error;
  }
}
async function updateMap(map) {
  try {
    await Map.update(map, {
      where: {
        mapId: map.mapId,
      },
    });
    return await getMapById(map.mapId);
  } catch (error) {
    throw error;
  }
}

async function getMaps() {
  try {
    return await Map.findAll({ include: [{ model: Game }] });
  } catch (error) {
    throw error;
  }
}

async function getMapById(mapId) {
  try {
    return await Map.findByPk(mapId, { include: [{ model: Game }] });
  } catch (error) {
    throw error;
  }
}

async function getMapsByGame(game) {
  try {
    return await Map.findAll({
      include: [
        {
          model: Game,
          where: { gameName: game },
        },
      ],
    });
  } catch (error) {
    throw error;
  }
}

async function deleteMapById(mapId) {
  try {
    await Map.destroy({
      where: {
        mapId,
      },
    });
  } catch (error) {
    throw error;
  }
}

export default { createNewMap, updateMap, getMaps, getMapsByGame, deleteMapById };
