////////////////////////////////////////////////////////////////////////////////
// title: gitost
// description: node js application that watches for changes in the staging
// areas of your git directories
////////////////////////////////////////////////////////////////////////////////

var fs = require('fs'),
    sys = require('sys'),
    exec = require('child_process').exec; 

////////////////////////////////////////////////////////////////////////////////
// CONFIG
////////////////////////////////////////////////////////////////////////////////

var target = {
    process : 'open lahacksOST.mp3;',
    config : {}
};
var diffThreshold = 0.3;

////////////////////////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////////////////////////

var countLinesString = "find . \\( ! -regex '.*/\\..*' \\) -type f | xargs wc -l | tail -1";
// TODO: the following grep command also includes the diff summary +++ and --- lines
var checkGitDiff = "git diff --cached | grep ^[+-] | wc -l";

// Retrieves directories from environment variable
// $GIT_OST should be formated similar to $PATH
// Directories should be delimited by colon e.g. /dir1:/dir2:/dir3
var paths = process.env.GIT_OST;
if (paths) {
    paths = paths.split(':');
    console.log(paths);
} else {
    process.stderr.write("Error: GIT_OST environment variable is not set properly. Please set directories to watch");
    process.exit(1);
}
// Object to keep track of directories and total lines of code in each directory
var wau = {};
wau.countLines = function (directory, callback) {
    exec(countLinesString, {cwd:directory}, (function(err,stdout,stderr) {
        if (err || stderr) {
            process.stderr.write("countLines: "+(err||stderr)+'\n');
        }
        var totalLines = stdout.replace(/\s+/g,',').split(',')[1];
        if (!this.hasOwnProperty(directory)) {
            this[directory] = {};
        }
        this[directory].lines = totalLines;
        this[directory].name = directory;
        console.log(this[directory]);
        if (callback)
            callback(directory);
    }).bind(this));
}

for (var i in paths) {
    console.log(i);
    wau.countLines(paths[i]+'/', function(directory) {
        console.log("Watching directory: ", directory);
        fs.watchFile(directory+'/.git/index', function(curr,prev) {
            console.log("Detected change in " + directory);
            exec(checkGitDiff, {cwd:directory}, function(err,stdout,stderr) {
                if (err || stderr) {
                    process.stderr.write("checkGitDiff: "+(err||stderr));
                }
                var linesChanged = parseInt(stdout.replace(/\s+/g,'')),
                    denominator = wau[directory].lines || 1;
                console.log("Lines changed: ", linesChanged);
                console.log("Percentage changed: ", linesChanged/denominator);
                if (linesChanged/denominator > diffThreshold) {
                    exec(target.process+'terminal-notifier -message "DIR: '+directory+'" -title "IT\'s TIME TO COMMIT"', target.config, function(err,stdout,stderr) {
                        if (err || stderr) {
                            process.stderr.write("Error: "+(err||stderr));
                        }
                    });
                }
            });
        });
    });
    // Polls to update line count. 
    // TODO: need to write a listener on git commit instead
    //setInterval(wau.countLines, 60000, paths[i]);
}
