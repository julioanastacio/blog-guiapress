const Sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

//User.sync({ force: true }); //Forçar a criar a tabela

module.exports = User;
