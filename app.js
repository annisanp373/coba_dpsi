const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sequelize = require('./models').sequelize;
const authRouter = require('./routes/auth');
const stakeholderRouter = require('./routes/stakeholders');
const requirementRouter = require('./routes/requirements');
const stakeholderPrioritizationRouter = require('./routes/stakeholdersPrioritization');
const requirementCollectionRouter = require('./routes/requirementCollection');
const requirementPrioritizationRouter = require('./routes/requirementPrioritization');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/stakeholders', stakeholderRouter);
app.use('/requirements', requirementRouter);
app.use('/stakeholder-prioritization', stakeholderPrioritizationRouter);
app.use('/requirement-collection', requirementCollectionRouter);
app.use('/requirement-prioritization', requirementPrioritizationRouter);

// Sync database
sequelize.sync().then(() => {
    console.log('Database connected and synchronized');
}).catch(err => {
    console.error('Database connection error:', err);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = app;
