// Required external modules.
fs = require('fs');
path = require('path');
bb = require('bluebird');
os = require('os'); // Needed for the end-of-line constant, in order to be
                    // system-independent.

// Get a copy of the arguments array.
var argv = process.argv;
// Get the name of this JavaScript file, without the extension.
var scriptName = path.basename(argv[1], ".js");
// Current file name.
var filename = "";
// Information to be printed at the end.
var smallestFile = "";
var largestFile = "";
var smallestLength = 0;
var largestLength = 0;
var totalLength = 0;
// Needed in the onFulfilled handler.
var numProcessed = 2;

/*************************************************************************/
/* Auxiliary functions.                                                  */
/*************************************************************************/

function onError(err) {
    // If the file does not exist, print an error message.
    console.log("Please use the name of an existant file!!");
}

function atTheEnd() {
    console.log( "The shortest file is %s with %d bytes.", smallestFile, smallestLength );
    console.log( "The largest file is %s with %d bytes.", largestFile, largestLength );
    console.log( "The aggregate length of all files is %d bytes.", totalLength );
}
   
function processFile(data) {
    console.log("%s: %d bytes", filename, data.length);
    var myLength = data.length;
    // Update overall results, if needed.
    if (smallestFile == "" || myLength < smallestLength) {
	smallestFile = filename;
	smallestLength = myLength;
    }
    if (largestFile == "" || myLength > largestLength) {
	largestFile = filename;
	largestLength = myLength;
    }
    totalLength += myLength;
    
    // Print the summary information when the last file is processed.
    numProcessed++;
    if (numProcessed == argv.length)
	atTheEnd();
}

/*************************************************************************/
/* Main programme.                                                       */
/*************************************************************************/

// Check whether the needed arguments have been received or not.
if (argv.length<3) {
    // If not, print usage instructions and exit.
    console.log("Usage: node " + scriptName + " files");
    console.log("Print the length of every file received as argument.");
    console.log("If multiple files are given, print also their aggregate length.");
    process.exit();
}

// Convert fs.readFile() into a promise.
readPromise = bb.promisify(fs.readFile,fs);

// Invoke the promises and wait for their results.
for (var i=2; i<argv.length; i++) {
    // Set the current filename.
    filename=argv[i];
    // Use the promise.
    readPromise(argv[i], "utf8").then(processFile,onError);
}

