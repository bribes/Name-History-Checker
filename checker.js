/*jshint esversion: 6 */
//Gets a query
function getUsername() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == 'username') {
            var username = pair[1].split('+').join('%20');
            return username;
        }
        return "";
    }
}
//Formats the dates
function formatTime(timestamp) {
    var date = new Date(timestamp);
    return date.toLocaleString();
}
var username = decodeURIComponent(getUsername()); //Username query
var error_message = "No minecraft account currently has that username!"; //The Error Message
var API_URL = "https://playerdb.co/api/player/minecraft/"; //The API URL
var API = API_URL + username; //Full API URL (DONT EDIT)
var input = document.getElementById('username'); //The input
input.value = username; //Sets the input value to the username
fetch(API).then(response => response.json()).then((data) => {
    if (username !== '') { //Checks if the username isn't blank
        if (data.error === true) { //Checks if there is a error
            document.getElementById('myTable').innerHTML = '<td>' + error_message + '</td>'; //Makes the error message
            console.clear();
        } else {
            buildTable(data.data.player.meta.name_history.reverse()); //Makes the Name History
        }
    }
    //Name History Section
    function buildTable(data) {
        var table = document.getElementById('myTable');
        if (data.length === 1) {
            var row = `<tr class="bold">
	  <td>` + data.length + `. <a href="?username=` + data[0].name + `">` + data[0].name + `</a><\/td>`;
            table.innerHTML += row;
        } else {
            var row = `<tr class="bold">
	  <td>` + data.length + `. <a href="?username=` + data[0].name + `">` + data[0].name + `</a><\/td><td class="right">` + formatTime(data[0].changedToAt) + `<\/td>
	                     <\/tr>`;
            table.innerHTML += row;
            for (var i = 1; i < data.length - 1; i++) {
                var row1 = `<tr>
	  <td>` + (data.length - i) + `. <a href="?username=` + data[i].name + `">` + data[i].name + `<\/a><\/td><td class="right">` + formatTime(data[i].changedToAt) + `<\/td>
	                     <\/tr>`;
                table.innerHTML += row1;
            }
            var row2 = `<tr>
	  <td>` + (data.length - i) + `. <a href="?username=` + data[i].name + `">` + data[i].name + `</a><\/td>
	                     <\/tr>`;
            table.innerHTML += row2;
        }
    }
});
