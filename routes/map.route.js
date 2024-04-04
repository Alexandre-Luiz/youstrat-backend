import express from 'express';
import mapController from '../Controllers/map.controller.js';

const router = express.Router();

router.post('/', mapController.createNewMap);
router.get('/', mapController.getMaps);
router.put('/', mapController.updateMap);
router.delete('/:mapId', mapController.deleteMapById);

export default router;
