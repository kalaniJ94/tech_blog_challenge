
const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tip extends Model {}

Tip.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        description: {
            type: Datatypes.TEXT,
        },
        date_created: {
            type: Datatypes.DATE,
            allowNull: false,
            defaultValue: Datatypes.NOW
        },
        user_id: {
            type: Datatypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'tip',
    }
);

module.exports = Tip;