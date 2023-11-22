const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/blogRoutes');
const path = require('path');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/createBlog', blogRoutes); 
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });