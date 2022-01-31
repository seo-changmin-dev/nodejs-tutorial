const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

const config = require(__dirname + '/../config/config.json')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connected!");
  } catch (err) {
    console.log("Not Connected");
    console.warn(err);
  }
};

testConnection();

const User = require('./user')(sequelize, Sequelize.DataTypes);

const db = {};
db.sequelize = sequelize;
db.User = User;
module.exports = db;
