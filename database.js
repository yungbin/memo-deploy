const mariadb = require('mariadb');
const pool = mariadb.createPool(
    {host: 'svc.sel4.cloudtype.app', user: 'edohan', password: 'edohan', connectionLimit: 5, database: 'edohan'}
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
