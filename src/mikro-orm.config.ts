// require("dotenv").config();
// import { Options, PostgreSqlDriver } from "@mikro-orm/postgresql";
// import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

// const config: Options = {
//   migrations: {
//     path: "./dist/migrations", // Caminho para migrações compiladas
//     pathTs: "./src/migrations", // Caminho para arquivos TS de migrações
//     tableName: "migrations",
//     transactional: true,
//   },
//   driver: PostgreSqlDriver,
//   dbName: "dev_luiz",
//   user: "forceflow_usr_clt",
//   password: process.env.PASSWORD_DB,
//   host: "localhost",
//   port: 5432,
//   entities: ["./dist/tables/*.js"], // Atualize aqui para refletir o diretório das entidades compiladas
//   entitiesTs: ["./src/tables/*.ts"], // Atualize aqui para refletir o diretório das entidades TS
//   metadataProvider: TsMorphMetadataProvider,
//   debug: true, // Habilitar logs somente em desenvolvimento
//   driverOptions: {
//     connection: { ssl: false },
//   },
// };

// export default config;


require("dotenv").config();
import { Options, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const config: Options = {
  migrations: {
    path: "./dist/migrations",
    pathTs: "./src/migrations",
    tableName: "migrations",
    transactional: true,
  },
  driver: PostgreSqlDriver,
  dbName: process.env.NAME_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  host: process.env.HOST_DB,
  port: 5432, // Porta padrão do PostgreSQL é 5432
  entities: ["./dist/tables/*.js"],
  entitiesTs: ["./src/tables/*.ts"],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  driverOptions: {
    connection: {
      ssl: { rejectUnauthorized: false }, // Habilita a conexão SSL sem verificar o certificado
    },
  },
};

export default config;