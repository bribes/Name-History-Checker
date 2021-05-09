/*jshint esversion: 8 */
//Gets a query
function getUsername() {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == "username") {
      var username = pair[1].split("+").join("%20");
      return username;
    }
    return "";
  }
}
//Formats timestamps
function formatTime(timestamp) {
  var date = new Date(timestamp).toLocaleString();
  return date;
}
//Formats the dropping time
function formatDrop(raw_date) {
  var date = new Date(raw_date);
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = `${month}/${day}/${year} at ${hours}:${minutes}:${seconds} ${ampm}`;
  return strTime;
}
//Makes the Error Messages
function errorMessage(username) {
  var error_message = "No minecraft account currently has that username!"; //The Error Message
  var error_invalid = "The name you entered has invalid characters!"; //The Error Message Invalid
  var error_short = "The name you entered is too short!"; //The Error Message Short
  var error_long = "The name you entered is too long!"; //The Error Message Long
  if (/^.{3,}$/.test(username) == false) return error_short;
  if (/^.{0,16}$/.test(username) == false) return error_long;
  if (/^[a-zA-Z0-9_]+$/.test(username) == false) return error_invalid;
  return error_message;
}
//Name History Section
function buildTable(data) {
  var table = document.getElementById("myTable");
  if (data.length === 1) {
    var row3 = `<tr class="bold">
	  <td>${data.length}. <a href="?username=${data[0].name}">${data[0].username}</a><\/td>`;
    table.innerHTML += row3;
  } else {
    var row = `<tr class="bold">
	  <td>${data.length}. <a href="?username=${data[0].name}">${data[0].username}</a><\/td><td class="right">${formatTime(data[0].changed_at)}<\/td>
	                     <\/tr>`;
    table.innerHTML += row;
    for (var i = 1; i < data.length - 1; i++) {
      var row1 = `<tr>
	  <td>${(data.length - i)}. <a href="?username=${data[i].name}">${data[i].username}<\/a><\/td><td class="right">${formatTime(data[i].changed_at)}<\/td>
	                     <\/tr>`;
      table.innerHTML += row1;
    }
    var row2 = `<tr>
	  <td>${(data.length - i)}. <a href="?username=${data[i].name}">${data[i].username}</a><\/td>
	                     <\/tr>`;
    table.innerHTML += row2;
  }
}
//Variables
var username = decodeURIComponent(getUsername()); //Username query
var API_URL = "https://playerdb.co/api/player/minecraft/"; //The API URL
var API = API_URL + username; //Full API URL (DONT EDIT)
var input = document.getElementById("username"); //The input
var blocked = "The name you entered is blocked!"; //The Error Message Blocked
var dropping = "The name you entered is dropping on "; //The Dropping Message

input.value = username; //Sets the input value to the username
function code() {
  if (username !== "") { //Checks if the username isn"t blank
    if (player.error === true) { //Checks if there is a error
      var table = document.getElementById("myTable");
      table.innerHTML = "<tr><td>" + errorMessage(username) + "</td></tr>";
    } else {
  if (username !== "") { //Checks if the username isn"t blank
    if (player.error === true) { //Checks if there is a error
      var table = document.getElementById("myTable");
      table.innerHTML = "<tr><td>" + errorMessage(username) + "</td></tr>";
    }
        }
        if (player.status == "blocked") {
          document.getElementById("myTable").innerHTML = `<td>${blocked}</td>`; //Makes the error message
        } else {
          if (player.status == "soon") {
            document.getElementById("myTable").innerHTML = `<td>${dropping}${formatDrop(player.droptime)}.</td>`; //Makes the error message
          } else {}
      var icon = `https://api.ashcon.app/mojang/v2/avatar/${player.username}`; // The Favicon
      var title = `${player.username} | Name History`; // The Title
      buildTable(player.name_history); //Makes the Name History
      document.title = title; //Adds the Title
      document.getElementById("icon").href = icon; //Adds the Favicon
}}
  }}
lookup(username);
