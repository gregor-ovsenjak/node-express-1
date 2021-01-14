// where we write our queries
const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);


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
    const [id] = await db('lessons').insert(lesson);
    return id;
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
    const [id] = await db('messages')
    .insert(message)
    .where({lesson_id})
    .insert(message);

    return findMessageById(id);
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