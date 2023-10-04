const User = require('./User');
const Tip = require('./Tip');

User.hasMany(Tip, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Tip.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Tip };