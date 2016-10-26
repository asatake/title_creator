function createArrayFromCSV(url,callback){
	  var xhr = new XMLHttpRequest();
	  xhr.open("get",url,true);
	  xhr.send(null);
	  xhr.onload = function(){
		    var csv = xhr.responseText.split("\n");
		    var result = new Array();
		    for(var i=0 ; i < csv.length ; i++){
			      result[i] = csv[i].split(",");
		    }
		    callback(result);
	  };
};

// $.get('./dictionary.csv', function(data) {
//     var csv = $.csv()(data);
//     console.log(csv.length);
// }).fail(function(e) {
//     console.log(e);
// }).then(function(e) {
//     alert(e.length);
// });

window.onload = function(){
    createArrayFromCSV('dictionary.csv', function(data){
        // Twitter
        !function(d,s,id) {
            var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
            if(!d.getElementById(id)){
                js=d.createElement(s);
                js.id = id;
                js.src = p + '://platform.twitter.com/widgets.js';
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, 'script', 'twitter-wjs');

        $("#ct_btn").click(function() {
            var r = Math.floor(Math.random() * data.length);
            document.getElementById('c_title').innerHTML = '<h3>' +  data[r][1] + '</h3>\n<h3>' + data[r][2] + '</h3>';

            // remove any previous clone
            $('#tweet-area').empty();

            // create a clone of the twitter share button template
            var clone = $('.twitter-share-button-template').clone();

            // fix up our clone
            clone.removeAttr('style'); // unhide the clone
            clone.attr('data-text', 'Title: ' + data[r][1] + ' (' + data[r][2] + ')');
            clone.attr('class', 'twitter-share-button');

            // copy cloned button into div that we can clear later
            $('#tweet-area').append(clone);

            // reload twitter scripts to force them to run, converting a to iframe
            $.getScript('http://platform.twitter.com/widgets.js');
        });
    });
};
