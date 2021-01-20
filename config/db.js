const { query } = require('express');
const {createPool} = require('mysql');
const pool=createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT

})
pool.getConnection((err)=>{
    if(err){
        console.log(" error connecting to database " + err )
    }
    else{
        console.log("Connected...")
    }
})
const runQuery=(query,paramArray)=>{
    return new Promise((resolve,reject)=>{
        try{
            pool.query(query,paramArray,(err,rows)=>{
                if(err) return reject(err);
                resolve(rows)
            })
        }
        catch(err){
           reject(err)
        }
    })
}
module.exports={runQuery};