const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const { static } = require('express');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./users/UsersController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/Users');

//Sessions
app.use(
  session({
    secret: 'qualquercoisa',
    cookie: { maxAge: 3000000 },
  }),
);

//View Engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database Connection
connection
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco feita com sucesso!');
  })
  .catch((error) => {
    console.log(error);
  });

app.use('/', categoriesController);
app.use('/', articlesController);
app.use('/', usersController);

app.get('/', (req, res) => {
  Article.findAll({
    order: [['id', 'DESC']],
    limit: 4,
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render('index', { articles, categories });
    });
  });
});

app.get('/:slug', (req, res) => {
  let slug = req.params.slug;
  Article.findOne({
    where: {
      slug,
    },
  })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render('article', { article, categories });
        });
      } else {
        res.redirect('/');
      }
    })
    .catch((error) => {
      res.redirect('/');
    });
});

app.get('/category/:slug', (req, res) => {
  let slug = req.params.slug;
  Category.findOne({
    where: {
      slug,
    },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category != undefined) {
        Category.findAll().then((categories) => {
          res.render('index', {
            articles: category.articles,
            categories,
          });
        });
      } else {
        res.redirect('/');
      }
    })
    .catch((error) => {
      res.redirect('/');
    });
});

app.listen(8080, () => {
  console.log('O servidor está rodando!');
});
