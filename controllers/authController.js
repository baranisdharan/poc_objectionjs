const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('../config/passport')

const authController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.query().insert({ username, password: hashedPassword });
      const token = generateToken(newUser);
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error registering user.' });
    }
  },

  login: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { return res.status(401).json({ message: 'Incorrect username or password.' }); }

      const token = generateToken(user);
      return res.json({ token });
    })(req, res, next);
  }
};

function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, 'your-secret-key-is-secret-key', { expiresIn: '1h' });
}

module.exports = authController;
