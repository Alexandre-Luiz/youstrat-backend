import mapService from '../services/map.service.js';

async function createNewMap(req, res, next) {
  try {
    const map = req.body;
    if (req.session.user.role !== 'admin') {
      return res.status(403).send({ message: 'Forbidden' });
    }

    res.status(200).send(await mapService.createNewMap(map));
  } catch (error) {
    next(error);
  }
}

async function updateMap(req, res, next) {
  try {
    const map = req.body;
    if (req.session.user.role !== 'admin') {
      return res.status(403).send({ message: 'Forbidden' });
    }

    res.status(200).send(await mapService.updateMap(map));
  } catch (error) {
    next(error);
  }
}
async function getMaps(req, res, next) {
  try {
    const { game } = req.query;
    res.status(200).send(await mapService.getMaps(game));
  } catch (error) {
    next(error);
  }
}

async function deleteMapById(req, res, next) {
  try {
    const mapId = +req.params.mapId;
    if (req.session.user.role !== 'admin') {
      return res.status(403).send({ message: 'Forbidden' });
    }
    await mapService.deleteMapById(mapId);
    res.status(200).send({ message: `Map id ${mapId} deleted successfully` });
  } catch (error) {
    next(error);
  }
}

export default { createNewMap, updateMap, getMaps, deleteMapById };
