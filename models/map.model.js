import Sequelize from 'sequelize';
import db from '../repositories/db.js';
import Game from './game.model.js';

const Map = db.sequelize.define(
  'maps',
  {
    mapId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    mapName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true }
);

Map.belongsTo(Game, { foreignKey: 'gameId' });

export default Map;
