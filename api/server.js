const express = require('express');
const lessonsRouter = require('../routes/lessons_routes.js');
const messagesRouter = require('../routes/messages_routes.js');

const lessons = require('../models/dbHelpers.js');
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.json({message:"Hello world"})
});

app.use('/api/lessons',lessonsRouter);
app.use('/api/messages',messagesRouter);

module.exports = app;