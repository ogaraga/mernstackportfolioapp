//importing packages

require('dotenv').config();
const mongoose = require('mongoose');

//connecting to database

const connectionDb = mongoose.connect(process.env.PORTFOLIO_BASE, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log('Portfolio Database access-connection granted!')).catch(()=>console.log('Portfolio Database access-connection refused!'));

module.exports= connectionDb;