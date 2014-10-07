/*

1) No ha habido condiciones de carrera, el valor final es 10. La variable 'counter' se incrementando en 1 con cada petición de cada uno de los clientes que se van conectando al servidor.

2) Lo que ocurre es que trata el '1' que envía el cliente como lo que es: un string. Cuando en el servidor se ejecuta 'counter+=data;' se transforma el valor de counter a '0' y se concatena '1' ('0' + '1'), y así sucesivamente. Al cabo de 10 ejecuciones del cliente obtenemos '01111111111'.

3) A continuación podemos encontrar el código modificado de Act3Client.js. El resultado de la ejecución es que los diferentes clientes no se conectan al servidor en el orden que son invocados, sino que en cada ejecución el orden es diferente. De nuevo, no tenemos condiciones de carrera y el resultado es el esperado en todas las ejecuciones que lanzamos de los 10 clientes al servidor.

*/

var net = require('net');

// Recibimos un parámetro y validamos que tengamos exáctamente un parámetro
var myArgs = process.argv;

if(myArgs.length != 3) {
	return;
}

var inputValue = myArgs[2];
console.log("Update being sent: " + inputValue);

// We assume that the server is in our
// same machine.
var client = net.connect(
	{port: 9000},
	function() { //'connect' listener
  		console.log('client connected');
  		// This is sent to the server.
  		client.write(inputValue);
	}
);

client.on('data', function(data) {
	// Write the received data on stdout.
	console.log(data.toString());
	// Close connection.
  	client.end();
});

client.on('end', function() {
  console.log('client disconnected');
});
