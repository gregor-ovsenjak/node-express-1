// where we write our queries
const db = require("../dbConfig.js");


//add, find, findById, update, ...
module.exports = {
    add,
    find,
    findById,
    remove,
    update,
    addMessage,
    findLessonMessages,
    removeMessage
};


async function add(lesson){
    //const [id] = await db('lessons').insert(lesson);
    //return id;
    return await db('lessons').insert(lesson,['id'])
};

async function find(){
    return db('lessons')
};

 function findById(id){
    return db('lessons').where({id}).first()
};

function remove(id) {
    return db('lessons')
    .where({id})
    .del()
}


function update(id,changes) {
    return db('lessons').
    where({id})
    .update(changes,[id])
    .then(()=> {return findById(id)})
}


function findMessageById(id){
    return db('messages')
    .where({id})
    .first();
}


async function addMessage(message,lesson_id){
    return await db('messages')
    .where({lesson_id})
    .insert(message,['id']);
};


async function findLessonMessages(lesson_id){
    return await db('lessons')
    .join('messages','lessons.id','messages.lesson_id')
    .select(
        'lessons.id as LessonsID',
        'lessons.name as LessonName',
        'messages.id as MessageID',
        'messages.sender',
        'messages.text'
    ).where({lesson_id});
}


async function removeMessage(id){
    return await db('messages')
    .where({id})
    .del();
}