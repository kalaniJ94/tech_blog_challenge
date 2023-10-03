const router = require('express').Router();
//insert models here
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    try {
        // const newData = await //insert model.findAll here
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
            //include
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
        
    } catch (error) {
        
    }
});

//finish if user is logged in

module.exports = router;