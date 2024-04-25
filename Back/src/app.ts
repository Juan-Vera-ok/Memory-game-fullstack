import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'
import userRoutes from './routes/user.routes'
import cookieParser from "cookie-parser"
const app = express ()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.set('PORT',config.PORT)
app.use(cookieParser())

app.use(morgan('dev'));

app.use(cors());



app.use(userRoutes)

export default app