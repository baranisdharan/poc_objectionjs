const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./db/knexfile');

// Initialize database connection
const knex = Knex(knexConfig.development);
Model.knex(knex);

// Passport configuration
require('./config/passport');

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use('/auth', authRoutes); 
app.use('/posts', postRoutes); 
app.use('/comments', commentRoutes); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
