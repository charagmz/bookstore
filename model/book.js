module.exports = {

    get:function (conn, func) {
        conn.any('SELECT * FROM books')
        .then(func)
        .catch((error) => {
            console.log('ERROR:', error)
          });
    },
    insert:function (conn, data, files, func) {
        conn.none('INSERT INTO books (name, image) VALUES ($1, $2)', [data.name, files.filename])
        .then(func)
        .catch((error) => {
            console.log('ERROR:', error)
          });
    },
    getById:function (conn, id, func) {
        conn.one('SELECT * FROM books WHERE id=$1 LIMIT 1', [id])
        .then(func)
        .catch((error) => {
            console.log('ERROR:', error)
          });
    },
    delete:function (conn, id, func) {
        conn.result('DELETE FROM books WHERE id=$1', [id])
        .then(func)
        .catch((error) => {
            console.log('ERROR:', error)
          });
    },
    update:function (conn, data, func) {
        conn.none('UPDATE books SET name=$1 WHERE id=$2', [data.name, data.id])
        .then(func)
        .catch((error) => {
            console.log('ERROR:', error)
          });
    },
    updateImg:function (conn, data, file, func) {
        conn.none('UPDATE books SET image=$1 WHERE id=$2', [file.filename, data.id])
        .then(func)
        .catch((error) => {
            console.log('ERROR:', error)
          });
    },
}