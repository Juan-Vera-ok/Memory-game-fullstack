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

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '/\memory-game-client\.onrender\.com$/');
  res.header('Access-Control-Allow-Credentials', "true");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


const corsOptions ={
    origin:['https://memory-game-client.onrender.com/login','https://memory-game-client.onrender.com/'],
    methods: "GET,PUT,POST,DELETE",
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(userRoutes)

export default app