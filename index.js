// javascript module with built in functionality that allows simpler 
// web development --> very lightweight
const express = require('express');
const shortId = require ('shortid');
const lessons = require('./models/dbHelpers.js');
// creates a web server
const app = express();

app.use(express.json());

const PORT = 5000;

app.get('/',(req,res)=>{
    res.json({message:"Hello world"})
});

app.post('/api/lessons',(req,res)=> {
    lessons.add(req.body).then(lesson => {
        res.status(200).json(lesson);
    }).catch(error => {
        res.status(500).json({message:"cannot add lesson"});
    });
});

app.get('/api/lessons',(req,res)=> {
    lessons.find()
    .then(lesson => {
        res.status(200).json(lesson);
    }).catch(error => {
        res.status(500).json({message:"unable to retrieve lessons"});
    });
});

app.get('/api/lessons/:id',(req,res)=> {
    const {id} = req.params;
    lessons.findById(id).then(lesson=> {
        if (lesson) {
            res.status(200).json(lesson);
        }else {
            res.status(404).json({message: "Unable to find this id"});
        }
    }).catch(error => res.status(500).json({message:"Unable to perform operation"}));
});



app.delete('/api/lessons/:id',(req,res)=> {
    const {id} = req.params;
    lessons.remove(id)
    .then(count =>{
        if(count>0){
            res.status(200).json({message:"Deleted"});
        }else {
            res.status(404).json({message:"Unable to locate record"});
        }
    }).catch(error => {
        res.status(500).json({message:"Unable to delete"});
    });
});


app.patch('/api/lessons/:id',(req,res)=>{
    const {id} = req.params;
    const changes = req.body;
    lessons.update(id,changes)
    .then(lesson => {
        if (lesson) {
            res.status(200).json(lesson);
        }else {
            res.status(404).json({message:"Unable to locate record"});
        }
    }).catch(error => {
        res.status(500).json({message:"Error updating record."})
    });
});

app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
});