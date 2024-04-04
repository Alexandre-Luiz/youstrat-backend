import Sequelize from 'sequelize';
import db from '../repositories/db.js';
import Map from './map.model.js';

const Cs2Strat = db.sequelize.define(
  'cs_strategies',
  {
    stratId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    stratName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    videoUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true }
);

Cs2Strat.belongsTo(Map, { foreignKey: 'mapId' });

export default Cs2Strat;
