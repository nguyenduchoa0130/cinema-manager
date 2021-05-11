require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const methodOverride = require('method-override');
const ejsLayouts = require('express-ejs-layouts');
const cors = require('cors');
const routes = require('./routes/index');
const appMid = require('./middlewares/app.middleware');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(cors());// accept all origin

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(ejsLayouts);

appMid.index(app); // Mount Middlewares
routes(app); // Mount Routes
app.use(errorHandler); // Mount Error Handlers

app.listen(PORT, () => {
    console.log('Server is running at ' + PORT);
});
