require('dotenv').config({quiet:true})
const Server = require('./models/server')

const server = new Server();

server.listen();