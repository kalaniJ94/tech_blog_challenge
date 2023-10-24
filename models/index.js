const User = require('./User');
const Tip = require('./Tip');
const Comment = require('./comment')

User.hasMany(Tip, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Tip.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User,{
    foreignKey: 'user_id',
});

Comment.belongsTo(Tip,{
    foreignKey: 'tip_id',
    onDelete: 'CASCADE',
});

Tip.hasMany(Comment, {
    foreignKey: 'tip_id',
    onDelete: 'CASCADE',
});

module.exports = { User, Tip, Comment };