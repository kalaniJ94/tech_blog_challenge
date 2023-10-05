const router = require('express').Router();
const { Tip, User } = require('../models')
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    try {
        const tipData = await Tip.findAll({
            include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
        });
        const tips = tipData.map((tip) => tip.get({plain: true}));

        res.render('homepage', {
            tips,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(err);
    }
});

router.get('/tip/:id', async (req,res) => {
    try {
        const tipData = await Tip.findByPK(req.params.id, {
            include: [{
                    model: User,
                    attributes: ['name'],
            },
        ],
        });
        const tip = tipData.get({plain: true });

        res.render('tip', {
            // ..tip,
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(err)    }
});
//Finish "withAuth"
router.get('/profile', withAuth, async (req,res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Tip }],
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

router.get('login', (req,res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
}); 

module.exports = router;