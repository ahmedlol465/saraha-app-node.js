import express from 'express'
import userRouter from './src/modules/user/user.route.js'
import messageRouter from './src/modules/messages/messages.routs.js'
import db_connection from './DB/moduls/connection.js'
import {config} from 'dotenv'
import { globalResponse } from './src/middelWare/globalRespons.js'
config({path:'./config/dev.config.env'})
const app = express()
app.use(express.json())
const port = process.env.port




app.use('/user', userRouter)  // user in postman 
app.use('/msg', messageRouter)

app.use(globalResponse)  // Next

db_connection ()

app.listen(port, ()=> console.log('app is work'))




// 200 sucess
// 201 created
// 204 no succese with no data 

// 400 wrong data
// 401 unezurized
// 409 comflect already exist 
// 404  not found 
// 403 forbiden  not found 

// 500 internet server error 
// 502 bad getwar