const { sequelize, User } = require('./models/index');

async function syncModelToDB() {
  try {
    // await User.sync(); // If Table Already Exists, Do Nothing.
    await User.sync({ force: true }); // Whether there is table, created new one and drop previous one.
    // await User.sync({ alter: true }); // Save Table Datas while table changes.

    // await sequelize.sync(); // Sync All Models Defined.
    
    console.log("Synced");
  } catch (err) {
    console.log("Not Synced");
    console.warn(err);
  }

  // await User.create({ firstName: "Jane", lastName: "Doe"});
};

async function dropModelToDB() {
  try {
    await User.drop(); // Drop This Model on DB
    await sequelize.drop(); // Drop All Models on sequlize(=DB)
  } catch (err) {
    console.log("Not Dropped");
    console.warn(err);
  }
}

// Dangerous Code:
// syncModelToDB();
// dropModelToDB();

// Each Function has same priority on excution.
// Therefore, each function works same time (parallel excution)
// This causes following error
// Check Table Existence (Function A) -> Drop Table (Function B)
// -> Query on Table that satisfies existence (Function A) -> Throw SequelizeDatabaseError(codee: ER_NO_SUCH_TABLE)

// Better Code
syncModelToDB().then(() => {
  // dropModelToDB();
});

// 'sync' is only recommended for development level
// for production, consider 'migration' instead of 'sync'