import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'
import userRoutes from './routes/user.routes'
const app = express ()

app.set('PORT',config.PORT)

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(userRoutes)

export default app