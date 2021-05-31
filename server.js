require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const methodOverride = require('method-override');
const ejsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const routes = require('./routes/index');
const appMid = require('./middlewares/app.middleware');
const errorHandler = require('./middlewares/errorHandler');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(cors()); // accept all origin
app.use(cookieParser());
app.set('trust proxy', 1); // trust first proxy
app.use(
    session({
        secret: process.env.SESSION_SERCET || 'session_sercet',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 60000 },
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(ejsLayouts);

appMid.index(app); // Mount Middlewares
routes(app); // Mount Routes
// app.use(errorHandler); // Mount Error Handlers

app.listen(PORT, () => {
    console.log('Server is running at ' + PORT);
});
