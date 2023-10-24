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
            {
                model: Comment,
                attributes: ["comment_body"],
            },
        ],
        });
        const tips = tipData.map((tip) => tip.get({plain: true}));

        res.render('homepage', {
            tips,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
//find single tip
router.get('/tip/:id', async (req,res) => {
    try {
        const tipData = await Tip.findByPK(req.params.id, {
            include: [{
                    model: User,
                    attributes: ['name'],
            },
            {
                model: Comment,
                include: [User],
            },
        ],
        });


        const tip = tipData.get({plain: true });

        res.render('tip', {
            ...tip,
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(err)    
    }
});
//Auth route
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

//New Post Page
router.get("/create", async (req,res) => {
    try {
        if (req.session.logged_in){
            res.render("create", {
                logged_in: req.session.logged_in,
                userId: req.session.user_id,
            });
            return;
        } else {
            res.redirect("/login");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Edit existing tip
router.get("/create/:id", async (req, res) => {
    try {
        const tipData = await Tip.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    mod: Comment,
                    include: [User], 
                },
            ],
        });
        const tip = tip.get({ plain: true });

        if(req.session.logged_in){
            res.render("edit", {
                ...Tip,
                logged_in: req.session.logged_in,
                userId: req.session.user_id,
            });
            return;
        } else {
            res.redirect("/login");
        }
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