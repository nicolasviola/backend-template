import express from 'express'
import bodyParser from 'body-parser'
import boom from 'express-boom'
import mongoose from 'mongoose'
import cors from 'cors'
import router from './routes'
import config from './env'

const server = express()
const port = config.API_PORT
const uri = config.ATLAS_MONGO_DB_TEST

mongoose.connect(uri, { useNewUrlParser: true })

server.use(boom())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors())
server.use('/api', router)
server.use(express.static('public'))
server.listen(port)

console.log('Server running in localhost:', port)
