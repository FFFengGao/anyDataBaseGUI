// const knex = from('knex')({ client: 'oracledb' });

import * as client from 'knex';
const knex: client = client({ client: 'oracledb' });

let sql = eval('knex.select("*").from("users").toString()');
console.log(sql);

let sql2 = knex({ a: 'table', b: 'table' })
  .select({
    aTitle: 'a.title',
    bTitle: 'b.title',
  })
  .whereRaw('?? = ??', ['a.column_1', 'b.column_2']).limit(100).offset(200).toString();
console.log(sql2);
