const router = require('express').Router();
const { Tip } = require ('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req,res) => {
    try {
        const newTip = await Tip.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newTip)
    } catch (err) {
        res.status(400).json(err);
    }
});

//put route to delete?

router.delete('/id:', withAuth, async (req, res) => {
    try {
        const tipData = await Tip.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!tipData){
            res.status(404).json({ message: 'No id found with that id'});
        }
    } catch (err) {
        res.status(400).json(err);
        
    }
});
module.exports = router;