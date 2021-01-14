const express = require('express');
const shortId = require ('shortid');
const lessons = require('../models/dbHelpers.js');
// creates a web server
const app = express();

app.use(express.json());
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

app.post('/api/lessons/:id/messages',(req,res)=>{
    const {id} = req.params;
    const msg = req.body;
    if (!msg.lesson_id){
        msg['lesson_id'] =parseInt(id,10)
    }
    lessons.findById(id).then(lesson => {
        if(!lesson){
            res.status(404).json({message:'invalid Id'});
        }
        if (!msg.sender || !msg.text){
            res.status(404).json({message:'Must provide both sender and text'});
        }
        lessons.addMessage(msg,id)
        .then(message =>{
            if (message){
                res.status(200).json(message);
            }
        })
        .catch(error =>{res.status(500).json({message:'Failed to add message'});})
    }).catch(error => {
        res.status(500).json({message:'Error finding lesson'});
    });
});


app.get('/api/lessons/:id/messages',(req,res)=>{
    const {id}  = req.params;
    lessons.findLessonMessages(id)
    .then(lessons => {
        res.status(200).json(lessons);
    }).catch(error => {res.status(500).json({message:'Error retrieving message'})});
});


app.delete('/api/messages/:id',(req,res)=>{
    const {id}  = req.params;
    lessons.removeMessage(id)
    .then(count => {
        if (count >0){
            res.status(200).json({message:`Message with ${id} successfully deleted.`})
        }else {
            res.status(404).json({message:`No message with this id.`});
        }  
    }).catch(error => {res.status(500).json({message:'Error while deleting message'})});
});


module.exports = app;