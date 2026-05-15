// Express App initialization
const express = require("express");
const router = require("./routes");
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;