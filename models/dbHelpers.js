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
    update
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