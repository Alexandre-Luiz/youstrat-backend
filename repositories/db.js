import Sequelize from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const sequelize = new Sequelize(
  `postgres://${dbUser}:${dbPass}@tuffi.db.elephantsql.com/${dbUser}`,
  {
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: false,
    },
  }
);

export default { sequelize };
