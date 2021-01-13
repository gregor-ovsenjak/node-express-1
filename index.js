// javascript module with built in functionality that allows simpler 
// web development --> very lightweight
const express = require('express');
const shortId = require ('shortid');
// creates a web server
const app = express();

app.use(express.json());

const PORT = 5000;

let channels = []
let lessons = []

app.get('/',(req,res)=>{
    res.json({hello:"world"});
});

app.get('/hello',(req,res)=>{
    res.json({hello:"world"});
});

app.post('/api/channels',(req,res)=> {
    const channelInfo = req.body;
    channelInfo.id = shortId.generate();
    channels.push(channelInfo);
    res.status(201).json(channelInfo);
});

app.get('/api/channels',(req,res)=> {
    res.status(200).json(channels);
});


app.post('/api/lessons',(req,res)=>{
    const lessonsInfo = req.body;
    lessonsInfo.id = shortId.generate();
    lessons.push(lessonsInfo); 
    res.status(201).json(lessonsInfo);
})

app.get('/api/lessons',(req,res)=> {
    res.status(200).json(lessons);
});


app.delete('/api/channels/:id',(req,res)=> {
    const {id} = req.params;
    const deleted = channels.find(channel => channel.id === id);
    if (deleted){
        channels = channels.filter(channel => channel.id != id );
        res.status(201).json(deleted)
    }else {
        res.status(404).json({message:"Channel you are looking for does not exist!"})
    }
});

app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
});