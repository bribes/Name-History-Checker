function getQueryVariable(variable)
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){
            return pair[1];
          } 
return "";
   }
}
function format(timestamp) {

	// Create a date object from the timestamp
	var date = new Date(timestamp);

return date.toLocaleString();

}
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
var username = htmlEntities(decodeURI(getQueryVariable('username')));
console.log(username);
 $.getJSON('https://www.faav.tk/v1/namemc/namehistory?username='+username, function(data123) {
console.log(data123);
if (username != "") {
	buildTable(data123);
}


	function buildTable(data){
		var table = document.getElementById('myTable')
		for (var i = 0; i < data.length - 1; i++) {
var row = `<tr>
<td>${data[i].username} | ${format(data[i].timestamp)}</td>
					  </tr>`
table.innerHTML += row;
		}
var row1 = `<tr>
<td>${data[data.length - 1].username} | Original</td>
					  </tr>`
table.innerHTML += row1
	}
}
)