const { Server } = require('./models/config')
require('dotenv').config()
const server = new  Server()
server.listen()

