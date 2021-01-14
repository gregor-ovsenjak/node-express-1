const express = require('express');
const lessons = require('../models/dbHelpers.js');

const router = express.Router();


router.post('/',(req,res)=> {
    lessons.add(req.body).then(lesson => {
        res.status(200).json(lesson);
    }).catch(error => {
        res.status(500).json({message:"cannot add lesson"});
    });
});

router.get('/',(req,res)=> {
    lessons.find()
    .then(lesson => {
        res.status(200).json(lesson);
    }).catch(error => {
        res.status(500).json({message:"unable to retrieve lessons"});
    });
});

router.get('/:id',(req,res)=> {
    const {id} = req.params;
    lessons.findById(id).then(lesson=> {
        if (lesson) {
            res.status(200).json(lesson);
        }else {
            res.status(404).json({message: "Unable to find this id"});
        }
    }).catch(error => res.status(500).json({message:"Unable to perform operation"}));
});



router.delete('/:id',(req,res)=> {
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


router.patch('/:id',(req,res)=>{
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

router.post('/:id/messages',(req,res)=>{
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


router.get('/:id/messages',(req,res)=>{
    const {id}  = req.params;
    lessons.findLessonMessages(id)
    .then(lessons => {
        res.status(200).json(lessons);
    }).catch(error => {res.status(500).json({message:'Error retrieving message'})});
});


module.exports = router;