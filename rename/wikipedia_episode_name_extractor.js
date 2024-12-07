// wikipedia episode name extractor
// run in browser console
// example page: https://en.wikipedia.org/wiki/How_I_Met_Your_Mother_(season_1)
// (wikipedia pages have jquery on them already)


var ep_num_setting = "in_season"; // set to "overall" or "in_season"
var arr = $(".wikitable.plainrowheaders.wikiepisodetable tbody .vevent");
var arr_length = arr.length;
var counter = 0;
var mapping = {};
arr.each((i, e) => {
    var $e = $(e);
    var episode_num_overall = parseInt($e.children('th').html());
    var episode_num_in_season = parseInt($e.children('td')[0].innerHTML);
	var episode_num = ep_num_setting === "overall" ? episode_num_overall : episode_num_in_season;
    var summary_text = $e.children('td.summary').html();
    var first_quote = summary_text.indexOf('"');
    var last_quote = summary_text.lastIndexOf('"');
	summary_text = summary_text.substring(first_quote + 1, last_quote);
	// fix links
	var elem_temp = document.createElement("div");
	elem_temp.innerHTML = summary_text;
	var $elem_temp = $(elem_temp);
	var $elem_temp_children = $elem_temp.children().toArray();
	if ($elem_temp_children.length > 0) {
		var anchor_elem = $elem_temp_children[0];
		var anchor_text = anchor_elem.innerHTML;
		if (anchor_text.length > 0)
			summary_text = anchor_text;
	}
    mapping[`${episode_num}`] = summary_text;
    counter++;
    if (counter >= arr_length)
        console.log(JSON.stringify(mapping, 0, 2));
});










// OLD
// var arr = $(".wikitable.plainrowheaders.wikiepisodetable tbody .vevent");
// var arr_length = arr.length;
// var counter = 0;
// var mapping = {};
// arr.each((i, e) => {
//     var $e = $(e);
//     var episode_num = parseInt($e.children('th').html());
//     var summary_text = $e.children('td.summary').html();
//     var first_quote = summary_text.indexOf('"');
//     var second_quote = summary_text.substring(first_quote + 1).indexOf('"');
//     summary_text = summary_text.substring(first_quote + 1, second_quote + 1);
//     mapping[`${episode_num}`] = summary_text;
//     counter++;
//     if (counter >= arr_length)
//         console.log(JSON.stringify(mapping));
// });