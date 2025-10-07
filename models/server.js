const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../db/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';


        //Connect DB
        this.connectDB();
        
        //MIddlewares
        this.middlewares();
        //Paths
        this.routes();
    }
    middlewares(){
        // CORS
        this.app.use(cors());

        //Read and parcer
        this.app.use(express.json());
        //Public Path
        this.app.use(express.static('public'))
    }
    async connectDB(){
        await dbConnection()
    }

    routes(){
        this.app.use(this.usersPath,require('../routes/user'));
    }
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Server running on port', this.port);
        });
    }
}
module.exports = Server