const knex = require('knex')({ client: 'pg' })

let sql = knex.select('*').from('users').limit(10).offset(30).toString()
console.log(sql)

let sql2 = knex({ a: 'table', b: 'table' })
  .select({
    aTitle: 'a.title',
    bTitle: 'b.title'
  })
  .whereRaw('?? = ??', [ 'a.column_1', 'b.column_2' ]).limit(100).offset(200).toString()
console.log(sql2)
