const { Comment } = require('../models');

const commentData = [
  {
    comment_text: "I can't wait to finish this BootCamp and get a job",
    post_id: 3,
    user_id: 1
  },
  {
    comment_text: "Handlebars partials help you with avoiding to write repetitive code",
    post_id: 1,
    user_id: 4
  },
  {
    comment_text: "I love every single form potatoes can be made",
    post_id: 4,
    user_id: 2
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;