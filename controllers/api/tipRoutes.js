const router = require('express').Router();
const { Tip } = require ('../../models');
const withAuth = require('../../utils/auth');

//create Tip
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

//Edit Tip
router.put("/:id", withAuth, async (req,res) => {
    try {
        const tipData = await Tip.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if(!tipData){
            res.status(404).json({message: "No tip found with that ID!"});
            return;
        }
        res.status(200).json(tipData);
    } catch (err) {
        res.status(400).json(err)
    }
});

// Delete Tip
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
        res.status(200).json(tipData);
    } catch (err) {
        res.status(400).json(err);
        
    }
});
module.exports = router;