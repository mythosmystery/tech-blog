const { User, Post } = require('../models');
const sequelize = require('../config/connection');
const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
   await sequelize.sync({ force: true });

   const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
   });

   const posts = await Post.bulkCreate(postData);
   console.log('Seeding complete');
   process.exit(0);
};

seedDatabase();
