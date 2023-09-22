//importing modules

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 8080
const connectionDb = require('./config/dbase');
const Routes = require('./routes/Routes');

//initialize express
const app = express(); 
//calling db connection here
connectionDb; 

//adding middlware
app.use(cors({origin:'http://localhost:5173'}));
app.use(express.json({ limit: '100mb' }));
app.use(express.static(__dirname + '/Frontend'));
app.use('/', Routes);  


//listening to the PORT
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
