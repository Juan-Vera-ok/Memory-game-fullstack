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

const corsOptions ={
    origin:['https://memory-game-client.onrender.com','https://memory-game-client.onrender.com/'],
    methods: "GET,PUT,POST,DELETE",
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(userRoutes)

export default app