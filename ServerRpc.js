//Servidor mensaje TCP
var http = require('http');
var net = require('net');
var fs = require ('fs');
const  url  =  require('url'); 

var server = http.createServer(function(req,res){
    const  objetourl  =  url.parse(req.url);
    let  camino='static'+objetourl.pathname;
    if (camino=='static/')
    camino='static/alerta.html';
    fs.readFile(camino,function(error,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data,'utf-8');
    })
}).listen(1000,'192.168.1.90');

var io=require('socket.io')(server);

var enchufe_tcp = new net.Socket();
enchufe_tcp.connect(3000, '192.168.1.90')

enchufe_tcp.on('data', function(data){
    data=data.toString();
    io.emit('lectura',data);
}, 100);

