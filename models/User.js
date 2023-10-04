const { Model, Datatypes, DATE } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require ('../config/connection');

class User extends Model {
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true, 
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password.hash(updatedUserData.password, 10));
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: false,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;