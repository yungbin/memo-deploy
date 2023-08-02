const mariadb = require('mariadb');
const pool = mariadb.createPool(
    {host: '127.0.0.1', user: 'root', password: 'root', connectionLimit: 5, database: 'memo'}
);

module.exports = {
    async run(query, params) {
        return new Promise((resalve) =>{
            pool
            .getConnection()
            .then(conn => {
                conn
                .query(query, params)
                .then((rows) => {
                    resalve(rows);
                    conn.end();
                })
                    .catch(err => {
                        console.log(err);
                        conn.end();
                    })

                })
                .catch(err => {
                //not connected
            });
        })
    }
}