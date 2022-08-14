var fs = require("fs");
var path = require("path");

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
        fs.readdir(current_path, (err1, files) => {
            if (err1) return console.log("cannot read directory", err1);
            files.forEach((filename) => {
                filename = `${filename}`;
                if (filename[0] == ".") return;
                var sub_extension = path.extname(filename);
                var sub_path = path.join(current_path, filename);
                process_path(sub_path, video_files);
            });
        });
    } else {
        if (
            !valid_extensions ||
            valid_extensions.length <= 0 ||
            valid_extensions.includes(extension.toLowerCase())
        )
            video_files.push(current_path);
    }
};

var randomize_video = (_) => {
    var selected_index = rand_int(0, video_files.length - 1);
    var selected_path = video_files[selected_index];
    console.log(selected_path);
};

var length_last = 0;
var verify_on = true;
var verify_attempts = 0;
var verify_attempts_req = 10;
var verify_callback = (_) => {
    var verified = length_last === video_files.length;
    // console.log(video_files.length, verified, verify_attempts);
    length_last = video_files.length;
    return verified;
};
var done_callback = randomize_video;
setInterval((_) => {
    if (verify_on) {
        if (verify_callback()) verify_attempts++;
        else verify_attempts = 0;
        if (verify_attempts >= verify_attempts_req) {
            verify_on = false;
            done_callback();
        }
    }
}, 20);

process_path(dir_path, video_files, verify_callback);

/* 


var recursion_tracer_gen = (
    complete_callback = null,
    initial_branch_value = 0
) => {
    var atomic_branch_counter = initial_branch_value;
    return {
        branch: (branches = 1) => {
            atomic_branch_counter += branches;
            // console.log(atomic_branch_counter);
        },
        join: (_) => {
            atomic_branch_counter--;
            if (atomic_branch_counter <= initial_branch_value) {
                if (complete_callback) complete_callback();
            }
        },
    };
};


*/
