/* Acceso a las variables globales de configuracion */
require('./config/config');

const express = require('express');
const app = express();


const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



/**Migdelaware   */
// app.use(express.static(__dirname + '/public')); /* Migdelware*/



app.get('/usuario', (req, res) => {
    res.json('get usuario');
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            usuario: body
        });

    }
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;

    res.json({
        id
    });
});

app.delete('/usuario', (req, res) => {
    res.json('delete usuario');
});



app.listen(process.env.PORT), console.log(`Servidor corriendo en puerto ${process.env.PORT}`);