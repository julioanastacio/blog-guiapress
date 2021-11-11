const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');

router.get('/categories', (req, res) => {
  res.send('Categorias');
});

router.get('/admin/colaborador/new', (req, res) => {
  res.render('admin/colaborador/new');
});

router.post('/categories/save', (req, res) => {
  let title = req.body.title;
  if (title != undefined && title != '' && title != null) {
    Category.create({
      title,
      slug: slugify(title),
    }).then(() => {
      res.redirect('/admin/colaborador');
    });
  } else {
    res.redirect('/admin/colaborador/new');
  }
});

router.get('/admin/colaborador', (req, res) => {
  Category.findAll().then((categories) => {
    res.render('admin/colaborador/index', { categories });
  });
});

router.post('/categories/delete', (req, res) => {
  let id = req.body.id;
  if (!isNaN(id) && id != '' && id != undefined && id != null) {
    //NaN = Not a Number
    Category.destroy({
      where: {
        id,
      },
    }).then(() => {
      res.redirect('/admin/colaborador');
    });
  } else {
    res.redirect('/admin/colaborador');
  }
});

router.get('/admin/colaborador/edit/:id', (req, res) => {
  let id = req.params.id;

  if (isNaN(id)) {
    res.redirect('/admin/colaborador');
  }

  Category.findByPk(id)
    .then((category) => {
      if (category != undefined) {
        res.render('admin/colaborador/edit', { category });
      } else {
        res.redirect('/admin/colaborador');
      }
    })
    .catch((error) => {
      res.redirect('/admin/colaborador');
    });
});

router.post('/categories/update', (req, res) => {
  let id = req.body.id;
  let title = req.body.title;

  Category.update({ title, slug: slugify(title) }, { where: { id: id } }).then(
    () => {
      res.redirect('/admin/colaborador');
    },
  );
});

module.exports = router;
