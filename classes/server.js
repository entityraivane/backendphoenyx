const express = require("express");
const cors = require("cors");
const { MongoConfig } = require("../database/mongodbconfig");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.rutas = {
      usuario: "/api/usuario",
      auth: "/api/auth",
    };
    this.middlewares();
    this.routes();
    this.mongoConnect();
  }
  async mongoConnect() {
    await MongoConfig();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.rutas.usuario, require("../routes/usuario"));
    this.app.use(this.rutas.auth, require("../routes/auth"));
  }
  listen() {
    this.app.listen(this.port, () =>
      console.log(`Example app listening on port ${this.port}!`)
    );
  }
}
module.exports = {
  Server,
};
