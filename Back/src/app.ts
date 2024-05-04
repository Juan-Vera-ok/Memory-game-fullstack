import express, { RequestHandler } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import config from './config'
import userRoutes from './routes/user.routes'
import cookieParser from "cookie-parser"
import { authenticator } from './authenticator'

const app = express()

const setCORSHeaders: RequestHandler = (_req, res, next): void => {
  res.header('Access-Control-Allow-Origin', config.ALLOWED_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type, Cookie");
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
};

app.use(setCORSHeaders);
app.use(authenticator);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('PORT', config.PORT);
app.use(cookieParser());
app.use(morgan('dev'));
app.use(userRoutes);

export default app
