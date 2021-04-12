function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
        return "";
    }
}

function format(timestamp) {
    var date = new Date(timestamp);
    return date.toLocaleString();
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
var username = htmlEntities(decodeURI(getQueryVariable('username')));
var error_message = "No user has that username!"; //The Error Message
var API_URL = "https://www.faav.tk/v1/namemc/namehistory?username="; //The API URL
console.log(username);
$.getJSON(API_URL + username, function(data123) {
    console.log(data123.error);
    var input = document.getElementById('username');
    input.value = username;
    if (data123.error !== "This user doesn't exist") {
        if (username == '') {
            buildTable(data123);
        } else {
            document.getElementById('myTable').innerHTML = '<td>' + error_message + '</td>';
        }
    }

    //Name History Section
    function buildTable(data) {
        var table = document.getElementById('myTable')
        if (format(data[0].timestamp) == "12/31/1969, 7:00:00 PM") {
            var row = `<tr class="bold">
	  <td>${data.length}. <a href="?username=${data[0].username}">${data[0].username}</a><\/td>`
            table.innerHTML += row;
        } else {
            var row = `<tr class="bold">
	  <td>${data.length}. <a href="?username=${data[0].username}">${data[0].username}</a><\/td><td style="float:right;">${format(data[0].timestamp)}<\/td>
	                     <\/tr>`
            table.innerHTML += row;
            for (var i = 1; i < data.length - 1; i++) {
                var row1 = `<tr>
	  <td>${data[i].order}. <a href="?username=${data[i].username}">${data[i].username}<\/a><\/td><td style="float:right;">${format(data[i].timestamp)}<\/td>
	                     <\/tr>`
                table.innerHTML += row1;
            }
            var row2 = `<tr>
	  <td>${data[i].order}. <a href="">${data[i].username}</a><\/td>
	                     <\/tr>`
            table.innerHTML += row2
        }
    }
})
