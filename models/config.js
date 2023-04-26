const express = require('express')
const cors = require('cors')
const { MongoConfig } = require('../database/dataconfig')
class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
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
    routes() {
        this.app.use(this.rutas.usuario, require('../routes/usuario'))
        this.app.use(this.rutas.auth, require('../routes/auth'))
    }
    listen() {
        this.app.listen(this.port, () => console.log(`Example app listening on port ${this.port}!`))
    }
}
module.exports = { Server }