const http = require('http');
const fs = require('fs');
const path = require('path');

// El contador se almacena en memoria. Se reiniciará si el servidor se reinicia.
let contador = 0;

const server = http.createServer((req, res) => {
    // Ruta principal: Sirve el archivo HTML
    if (req.url === '/' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error interno del servidor');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } 
    // Ruta para obtener el valor actual del contador
    else if (req.url === '/count' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ count: contador }));
    }
    // Ruta para incrementar el contador
    else if (req.url === '/increment' && req.method === 'POST') {
        contador++;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ count: contador }));
    } 
    // Ruta no encontrada
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Azure App Service proporciona el puerto a través de una variable de entorno
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});