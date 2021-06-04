const { User, Post } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
   await sequelize.sync({ force: true });

   const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
   });

   const posts = await post.bulkCreate(postData);
   console.log('Seeding complete');
   process.exit(0);
};

seedDatabase();
