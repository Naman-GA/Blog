const Sequelize = require("sequelize");
const config=require('./config');

// Create a new Sequelize instance
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mssql",
  logging: false,
  dialectOptions: {
    options: {
      encrypt: true,
    },
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection is established");
  } catch (error) {
    console.log(error);
  }
})();

module.exports = sequelize;
