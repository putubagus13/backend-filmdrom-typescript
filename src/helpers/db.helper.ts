import {Pool} from 'pg'
import dotenv from 'dotenv'
dotenv.config({
    path: '.env'
})

const db = new Pool({
    connectionString: process.env.DATABASE
})

db.connect().then(()=>{
    console.log('Database Connected');
}).catch((err)=>{
    console.log('Database not Connected', err);
})

export default db



