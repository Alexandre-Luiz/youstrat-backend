import Sequelize from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const sequelize = new Sequelize(
  //`postgres://${dbUser}:${dbPass}@tuffi.db.elephantsql.com/${dbUser}`,
  // `postgresql://postgres:${dbPass}@db.${dbUser}.supabase.co:5432/postgres`,
  `postgresql://postgres.${dbPass}:${dbUser}@aws-1-sa-east-1.pooler.supabase.com:5432/postgres`, //ipv4 pooler

  {
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: false,
    },
  }
);

export default { sequelize };
