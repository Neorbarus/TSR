var net = require('net');
var counter = 0;
var server = net.createServer(
  function(c) { //'connection' listener
  console.log('server connected');
  c.on('end', function() {
    console.log('server disconnected');
  }); 
  // Read what the client sent.
  c.on('data',  function(data) {
     // Increase the local counter.
     counter+=parseInt(data);
     // Print it to stdout.
     console.log(counter);
     // Send the result to the client.
     c.write(counter + " ");
	// Close connection.
	c.end();
  });	
});
server.listen(9000, 
  function() { //'listening' listener
  console.log('server bound');
});
