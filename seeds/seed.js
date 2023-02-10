const sequelize = require('../config/connection');
const { User, Techblog } = require('../models');

const userData = require('./userData.json');
const techblogData = require('./techblogData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const techblog of techblogData) {
    await Techblog.create({
      ...techblog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
