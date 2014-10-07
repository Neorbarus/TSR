var net = require('net');

// We assume that the server is in our
// same machine.
var client = net.connect({port: 9000},
    function() { //'connect' listener
  console.log('client connected');
  // This is sent to the server.
  client.write('1');
});
client.on('data', function(data) {
  // Write the received data on stdout.
  console.log(data.toString());
  // Close connection.
  client.end();
});
client.on('end', function() {
  console.log('client disconnected');
});