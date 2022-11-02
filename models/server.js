require('../server/config/config');

const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
    
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users'
        // Middleware
        this.middleware();
        // Router
        this.routes();
    }

    middleware(){
        // cors
        this.app.use(cors());
        // Public directory
        this.app.use(express.static('public'));
    }

    routes() {this.app.use(this.userPath, require('../routes/user.routes'));}
    listen() {this.app.listen(this.port), console.log(` Server running on local port ${this.port}`);}
}
 

module.exports = Server;