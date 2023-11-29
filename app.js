const express = require('express');
const path = require('path');
const sequelize = require('./util/database');
const rootDir = require('./util/path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

const blogRoutes = require('./routes/blog');

app.use(express.json());
app.use(express.static(path.join(rootDir, 'public')));
app.use(express.static('views'));
app.use(blogRoutes);

sequelize
    .sync()
    .then(result => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });



