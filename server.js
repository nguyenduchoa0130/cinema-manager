require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const methodOverride = require('method-override');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

routes(app);

app.listen(PORT, () => {
    console.log('Server is running at ' + PORT);
});
