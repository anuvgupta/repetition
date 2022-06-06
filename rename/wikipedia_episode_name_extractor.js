
var arr = $(".wikitable.plainrowheaders.wikiepisodetable tbody .vevent");
var arr_length = arr.length;
var counter = 0;
var mapping = {};
arr.each((i, e) => {
    var $e = $(e);
    var episode_num = parseInt($e.children('th').html());
    var summary_text = $e.children('td.summary').html();
    var first_quote = summary_text.indexOf('"');
    var second_quote = summary_text.substring(first_quote + 1).indexOf('"');
    summary_text = summary_text.substring(first_quote + 1, second_quote + 1);
    mapping[`${episode_num}`] = summary_text;
    counter++;
    if (counter >= arr_length)
        console.log(JSON.stringify(mapping));
});