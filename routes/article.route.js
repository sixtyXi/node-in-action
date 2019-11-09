const { Router } = require('express');

const Article = require('../models/article.orm');

const router = Router();

// router.param('articleId', (req, res, next, id) => {
//   console.log('Router.param:', id);
//   next();
// });

router
  .route('/')
  .get((req, res, next) => {
    Article.all((err, articles) => {
      if (err) return next(err);
      res.send(articles);
    });
  })
  .post((req, res, next) => {
    const article = { title: req.body.title };
    Article.create(article, err => {
      if (err) return next(err);
      res.send({ message: 'Created' });
    });
  });

router
  .route('/:articleId')
  .get((req, res, next) => {
    const id = req.params.articleId;

    Article.find(id, (err, article) => {
      if (err) return next(err);
      res.send(article);
    });
  })
  .delete((req, res, next) => {
    const id = req.params.articleId;
    Article.delete(id, err => {
      if (err) return next(err);
      res.send({ message: 'Deleted' });
    });
  });

module.exports = router;
