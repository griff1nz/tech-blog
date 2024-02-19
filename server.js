// Average server.js file 
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const hbs = exphbs.create({});
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();

const sess = {
    secret: 'Lmao',
    cookie: {
        maxAge: 60*60*1000, // Times out after an hour
        // httpOnly: true,
        // secure: false,
        // sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/index'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log("Server listening on http://localhost:" + PORT);
    })
})
