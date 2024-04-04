import Sequelize from 'sequelize';
import db from '../repositories/db.js';

const Game = db.sequelize.define(
  'games',
  {
    gameId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    gameName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true }
);

export default Game;
