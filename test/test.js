const knex = require('knex')({ client: 'pg' })
// let sql2 = knex('users').where('id', 1).limit(100).offset(200).toString()
// console.log(sql2)

let sql3 = knex.count('*').from('users').toString()

console.log(sql3)
