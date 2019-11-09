const { Router } = require('express');
const read = require('node-readability');

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
    const url = req.body.url;

    read(url, (err, result) => {
      if (err || !result) {
        res.status = 500;
        return next(new Error('Error downloading article'));
      }

      Article.create(
        { title: result.title, content: result.content },
        (err, article) => {
          if (err) return next(err);
          res.send(article);
        }
      );
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
