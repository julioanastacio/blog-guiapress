const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Category.hasMany(Article); //UMA categoria tem MUITOS artigos - 1 - P - M
Article.belongsTo(Category); //UM artigo pertence a uma categoria - 1 - P - 1

//Article.sync({ force: true }); //Forçar a criar a tabela

module.exports = Article;
