const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const dbConnection = mongoose.connection;

dbConnection.on('connected', ()=>{
    console.log("Database connection established");
});

dbConnection.on('error', (err)=>{
    console.log("databases connection error");
    console.log(err.message);
});

module.exports = dbConnection;