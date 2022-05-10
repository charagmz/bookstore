const pgp = require('pg-promise')()
const dbconn = pgp('postgres://phs-adm:phs-adm@localhost:5432/bookstore')

/*
dbconn.any('SELECT * FROM books', [])
.then((rows) => {
  console.log(rows)
})
.catch((error) => {
  console.log('ERROR:', error)
})
*/


module.exports = dbconn;
