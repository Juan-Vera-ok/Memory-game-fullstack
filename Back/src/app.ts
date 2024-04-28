import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'
import userRoutes from './routes/user.routes'
import cookieParser from "cookie-parser"
import { access } from 'fs'
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('PORT', config.PORT)
app.use(cookieParser())

app.use(morgan('dev'));

/*
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin","https://memory-game-client.onrender.com"
  );
  res.setHeader(
    "Access-Control-Allow-Origin","https://memory-game-client.onrender.com/:1"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS", "CONNECT", "TRACE"]
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    ["Access-Control-Allow-Origin","Content-Type", "Authorization", "X-Content-Type-Options", "Accept", "X-Requested-With", "Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"]
  );
  res.setHeader("Access-Control-Allow-Credentials", 'true');
  res.setHeader("Access-Control-Allow-Private-Network", 'true');
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});
*/

let Regex = RegExp(/[0-9]+/i);

var whitelist = ["https://memory-game-client.onrender.com",
"https://memory-game-client.onrender.com/",
"memory-game-client.onrender.com/:1"]

const corsOptions = {
  origin: function(origin:any, callback:any) {
    if (whitelist.includes(origin)|| !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
    console.log(callback)
    console.log(origin)
  },
  methods: ["GET", "PUT", "POST", "DELETE","OPTIONS"],
  credentials: true,            //access-control-allow-credentials:true,
  optionSuccessStatus: 200,
  allowedHeaders: '*'}
app.use(cors(corsOptions));

app.use(userRoutes)

export default app