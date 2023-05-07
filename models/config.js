const express = require('express')
const cors = require('cors')
const { MongoConfig } = require('../database/dataconfig')
class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.rutas = {
            usuario: `/api/usuario`,
            auth: `/api/auth`
        }
        this.middlewares()
        this.routes()
        this.conectarDb()
    }
    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
    }
    async conectarDb() {
        await MongoConfig()
    }
    sockets(){
      
    }
    routes() {
        this.app.use(this.rutas.usuario, require('../routes/usuario'))
        this.app.use(this.rutas.auth, require('../routes/auth'))
    }
    listen() {
        this.server.listen(this.port, () => console.log(`Example app listening on port ${this.port}!`))
    }
}
module.exports = { Server }