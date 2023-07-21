const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const db = require('./config/dbConfig');

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const routes = require('./routes');

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});