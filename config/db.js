const {Pool} = require("pg");

const pool = new Pool({
    user:"postgres",
    password:"admin",
    host:"localhost",
    database:"PPOB",
    port:5432,
    idleTimeoutMillis:500
});

// (async()=>{
//     try {
//         console.log(await pool.query('select now()'))
//     } catch (error) {
//         console.log(error);
//     }
// })

// ()

module.exports = pool


