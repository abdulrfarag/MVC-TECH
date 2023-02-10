const router = require('express').Router();
const { Techblog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all techblogs and JOIN with user data
      const techblogData = await Techblog.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });


    // Serialize data so the template can read it
    const techblogs = techblogData.map((techblog) => techblog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
        techblogs, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/techblog/:id', async (req, res) => {
    try {
      const techblogData = await Techblog.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });

      const techblog = techblogData.get({ plain: true });

    res.render('techblog', {
      ...techblog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Techblog }],
      });

      const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;

