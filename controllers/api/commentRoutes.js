const router = require("express").Router();
const { Tip, Comment, User } = require("../../models");

//Create comment
router.post("/", async (req, res) => {
    try {
        const comment = await Comment.create({
            comment_body: req.body.comment_body,
            tip_id: req.body.tip_id,
            user_id: req.session.user_id || req.body.user_id,
        });
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Read comments
router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],

                },
                {
                    model: Tip,
                    attributes: ["id"],
                },
            ],
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update 
router.put("/:id", async (req, res) => {
    try {
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if(!updatedComment[0]){
            res.status(404).json({message: "No comment found with that ID!"});
            return;
        }

        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete
router.delete("/:id", async (req,res) => {
    try{
        const comment = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        if(!comment){
            res.status(404).json({ message: "No comment found with that ID!"});
            return;
        }
        res.status(200).json(comment);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;