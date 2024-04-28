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

/*app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', "true");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
*/

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    ['https://memory-game-client.onrender.com/login',
      'https://memory-game-client.onrender.com/',
      'https://memory-game-client.onrender.com/sign-up',
      'https://memory-game-client.onrender.com',
      'https://memory-game-client.onrender.com/:1',
      'memory-game-client.onrender.com/:1']

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



const corsOptions = {
  origin: ['https://memory-game-client.onrender.com/login',
    'https://memory-game-client.onrender.com/',
    'https://memory-game-client.onrender.com/sign-up',
    'https://memory-game-client.onrender.com',
    'https://memory-game-client.onrender.com/:1',
    'memory-game-client.onrender.com/:1'],
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,            //access-control-allow-credentials:true,
  optionSuccessStatus: 200,
  allowedHeaders: ['Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials',
    'Content-type',
    'Access-Control-Allow-Headers'],
  preflightContinue: true
}
app.use(cors(corsOptions));

app.use(userRoutes)

export default app