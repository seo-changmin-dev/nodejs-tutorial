const { sequelize } = require('./models/index');

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