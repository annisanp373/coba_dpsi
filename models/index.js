const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('database_dinda', 'root', ' ', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = require('./user')(sequelize);
const Stakeholder = require('./stakeholder')(sequelize);
const Requirement = require('./requirement')(sequelize);

// Define associations if any

sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch(err => {
    console.error('Error synchronizing database:', err);
});

module.exports = {
    sequelize,
    User,
    Stakeholder,
    Requirement
};
