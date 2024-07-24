const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Stakeholder = sequelize.define('Stakeholder', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        influence: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        interest: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Stakeholder;
};
