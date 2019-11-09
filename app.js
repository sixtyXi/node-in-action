const express = require('express');

const articleRouter = require('./routes/article.route');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/articles', articleRouter);

app.listen(app.get('port'), () => {
  console.log(
    `Express web app available at http://localhost:${app.get('port')}`
  );
});
