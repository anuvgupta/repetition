var fs = require('fs');
var path = require('path');

var args = process.argv.slice(2);
if (args.length != 2) {
    console.log("missing/incorrect arguments");
    process.exit(1);
}

var num_digits = 3;
var num_start = 8;
var num_end = num_start + num_digits;
var episode_list_src = args[0];
var dir_path = args[1];
var episode_list = JSON.parse(fs.readFileSync(episode_list_src, { encoding: 'utf8', flag: 'r' }));

fs.readdir(dir_path, (err1, files) => {
    if (err1) return console.log("cannot read directory", err1);
    files.forEach(filename => {
        filename = `${filename}`;
        if (filename[0] == '.') return;

        var ep_num = parseInt(filename.substring(num_start, num_end));
        var ep_num_long = num_digits == 1 ? `${ep_num}` : (`${ep_num < 10 ? `${num_digits >= 3 ? '0' : ''}0${ep_num}` : `${num_digits >= 3 && ep_num < 100 ? '0' : ''}${ep_num}`}`);
        var ep_name = episode_list[`${ep_num}`];

        if (filename.includes(ep_num_long)) {
            var filename_new = filename.replace(ep_num_long, `${ep_num_long} ${ep_name}`);

            fs.rename(path.join(dir_path, filename), path.join(dir_path, filename_new), err2 => {
                if (err2) return console.log(`cannot rename file ${filename}`, err2);
                else console.log(`${filename} --> ${filename_new}`);
            });
        } else console.log(filename);
    });
});