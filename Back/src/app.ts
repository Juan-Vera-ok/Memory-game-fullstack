import express from 'express'
import config from './config'
const app = express ()

app.set('PORT',config.PORT)

export default app