var fs = require("fs");
var path = require("path");
var open = require("open");

var args = process.argv.slice(2);
if (args.length < 1 || args.length > 2) {
    console.log("missing/incorrect arguments");
    process.exit(1);
}

var video_files = [];
var dir_path = args[0];
var valid_extensions =
    args.length >= 2 && args[1] && args[1] != ""
        ? args[1].toLowerCase().split(",")
        : [];

var rand_int = (min, max) => {
    // integer between min (inclusive) and max (inclusive)
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var process_path = (current_path, video_files) => {
    var extension = path.extname(current_path);
    if (fs.lstatSync(current_path).isDirectory()) {
        var files = fs.readdirSync(current_path);
        for (var f in files) {
            var filename = files[f];
            filename = `${filename}`;
            if (filename[0] == ".") continue;
            var sub_extension = path.extname(filename);
            var sub_path = path.join(current_path, filename);
            process_path(sub_path, video_files);
        }
    } else {
        if (
            !valid_extensions ||
            valid_extensions.length <= 0 ||
            valid_extensions.includes(extension.toLowerCase())
        )
            video_files.push(current_path);
    }
};

process_path(dir_path, video_files);

var selected_index = rand_int(0, video_files.length - 1);
var selected_path = video_files[selected_index];

console.log(selected_path);
open(selected_path);
