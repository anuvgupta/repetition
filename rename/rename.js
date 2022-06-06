var fs = require('fs');
var path = require('path');

var args = process.argv.slice(2);
if (args.length != 3) {
    console.log("missing/incorrect arguments");
    process.exit(1);
}

var dir_path = args[0];
var token1 = args[1];
var token2 = args[2];

fs.readdir(dir_path, (err1, files) => {
    if (err1) return console.log("cannot read directory", err1);
    files.forEach(filename => {
        filename = `${filename}`;
        if (filename[0] == '.') return;

        if (filename.includes(token1)) {
            var filename_new = filename.replace(token1, token2);

            fs.rename(path.join(dir_path, filename), path.join(dir_path, filename_new), err2 => {
                if (err2) return console.log(`cannot rename file ${filename}`, err2);
                else console.log(`${filename} --> ${filename_new}`);
            });

        } else console.log(filename);
    });
});