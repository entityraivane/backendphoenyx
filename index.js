const { Server } = require('./classes/server')

require('dotenv').config()
const server = new Server()
server.listen()