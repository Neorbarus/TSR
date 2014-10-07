// Required external modules.
fs = require('fs');
path = require('path');
os = require('os'); // Needed for the end-of-line constant, in order to be
                    // system-independent.

// Get a copy of the arguments array.
var argv = process.argv;
// Get the name of this JavaScript file, without the extension.
var scriptName = path.basename(argv[1], ".js");

/*************************************************************************/
/* Auxiliary functions.                                                  */
/*************************************************************************/

function contentsToArray(contents) {
    // Converts the contents of the file into an array of text lines.
    // Returns the array.
    return contents.split(os.EOL);
}
function parseArray(contents,pattern) {
    // Parse each array slot (i.e., each text line).
    for(var i in contents) {
	// If such line has the "pattern" as a substring...
	// Note that search() returns the position of its argument
	// on the string where it is used. If it is not found,
	// search() returns -1.
	if (contents[i].search(pattern) > -1)
	    // Prints it to standard output.
	    console.log(contents[i]);
    }
}
function processFile(data,pattern) {
    // Converts the file into an array of text lines and parses it,
    // looking for the pattern given in the second argument.
    parseArray(contentsToArray(data),pattern);
}

/*************************************************************************/
/* Main programme.                                                       */
/*************************************************************************/
// Check whether the needed arguments have been received or not.
if (argv.length<4) {
    // If not, print usage instructions and exit.
    console.log("Usage: node " + scriptName + " pattern file");
    console.log("Print all lines of 'file' that contain" +
		" the 'pattern' substring.");
    process.exit();
}

// Get the contents of the file, assuming that it is a text file.
fs.readFile(argv[3], "utf8", function(err,data){
    if (err) {
	// If the file does not exist, print an error message and exit.
	console.log("Please use the name of an existant file!!");
    } else {
	// Otherwise, process the file contents.
	processFile(data,argv[2]);
    }
});

