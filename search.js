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

    // Create a date object from the timestamp
    var date = new Date(timestamp);

    return date.toLocaleString();

}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
var username = htmlEntities(decodeURI(getQueryVariable('username')));
console.log(username);
$.getJSON('https://www.faav.tk/v1/namemc/namehistory?username=' + username, function(data123) {
    console.log(data123);
    var input = document.getElementById('username');
    if (username != "") {
        input.value = username;
        buildTable(data123);
    }

//Name History Section
    function buildTable(data) {
        var table = document.getElementById('myTable')
        if (format(data[0].timestamp) == "12/31/1969, 7:00:00 PM") {
            var row = `<tr class="bold">
	  <td>${data.length}. <a href="https://viewmc.com/lookup?name=${data[0].username}">${data[0].username}</a><\/td>`
            table.innerHTML += row;
        } else {
            var row = `<tr class="bold">
	  <td>${data.length}. <a href="https://viewmc.com/lookup?name=${data[0].username}">${data[0].username}</a><\/td><td style="float:right;">${format(data[0].timestamp)}<\/td>
	                     <\/tr>`
            table.innerHTML += row;
            for (var i = 1; i < data.length - 1; i++) {
                var row1 = `<tr>
	  <td>${data[i].order}. <a href="https://viewmc.com/lookup?name=${data[i].username}">${data[i].username}<\/a><\/td><td style="float:right;">${format(data[i].timestamp)}<\/td>
	                     <\/tr>`
                table.innerHTML += row1;
            }
            var row2 = `<tr>
	  <td>${data[i].order}. <a href="https://viewmc.com/lookup?name=${data[i].username}">${data[i].username}</a><\/td>
	                     <\/tr>`
            table.innerHTML += row2
        }
    }
})
