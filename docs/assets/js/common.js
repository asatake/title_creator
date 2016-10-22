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
var i = 0;

window.onload = function(){
    createArrayFromCSV('dictionary.csv', function(data){
        $("#ct_btn").click(function() {
            var r = Math.floor(Math.random() * data.length);
            document.getElementById('c_title').innerHTML = '<h3>' +  data[r][1] + '</h3>\n<h3>' + data[r][2] + '</h3>';
            i++;
        });
    });
};
