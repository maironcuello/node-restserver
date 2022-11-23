require('../server/config/config');

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.database');


class Server {
    constructor() {
    
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';
        this.authPath = '/api/auth';
        //Database connection 
        this.connectDB(); 
        // Middleware
        this.middleware();
        // Router
        this.routes();
    }
    
    // database
    async connectDB() {
        await dbConnection();
    }

    middleware(){
        // cors
        this.app.use(cors());
        // To read and parse body
        this.app.use(express.json());
        // Public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.userPath, require('../routes/user.routes'));
    }
    listen() {this.app.listen(this.port), console.log(` Server running on local port ${this.port}`);}
}
 

module.exports = Server;