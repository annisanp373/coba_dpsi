const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Requirement = sequelize.define('Requirement', {
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        priority: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

    return Requirement;
};
