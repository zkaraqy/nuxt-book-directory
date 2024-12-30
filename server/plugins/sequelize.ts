import { Sequelize } from "sequelize";
import { initModels } from "../models";

const { host, username, password, database, port } = useRuntimeConfig();

export default defineNitroPlugin(async (nitro) => {
  const sequelize = new Sequelize({
    dialect: "mysql",
    // host: process.env.DB_HOST || 'localhost',
    // username: process.env.DB_USERNAME || 'root',
    // password: process.env.DB_PASSWORD || '',
    // database: process.env.DB_NAME || 'kantin_go',
    // port: Number(process.env.DB_PORT) || 3306,
    host: host,
    username: username,
    password: password,
    database: database,
    port: port,
  });

  initModels(sequelize);
});
