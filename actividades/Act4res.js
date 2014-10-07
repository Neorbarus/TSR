var http = require('http');
var fs  = require('fs');
var path = require('path');
http.createServer(function (request, response) {
  // Primero compruebo si no se ha especificado un recurso para servir index.html
  if(request.url == "/") {
    recurso = "/index.html";
  }
  else {
    recurso = request.url;
  }
  var url = path.join(__dirname, recurso);
  fs.readFile(url, 'utf-8', function(error, content) {
    if(error) {
      response.writeHead(404);
      response.write("not found");
      response.end("");
    }
    else {
      response.writeHead(200);
      response.write(content);
      response.end();
    }
  });
  /*
  // response is a ServerResponse.
  // Its writeHead() method sets the response header.
  response.writeHead(200, {'Content-Type': 'text/plain'});
  // The end() method is needed to communicate that both the header
  // and body of the response have already been sent. As a result, the response can
  // be considered complete. Its optional argument may be used for including the last
  // part of the body section.
  response.end('Hello World\n');
  // listen() is used in an http.Server in order to start listening for
  // new connections. It sets the port and (optionally) the IP address.
  */
}).listen(1337, "127.0.0.1");
console.log('Server running at m http://127.0.0.1:1337/');
