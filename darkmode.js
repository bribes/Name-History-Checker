var mode;
mode = localStorage.getItem('mode');
if (mode === 'dark') {
	darkMode();
} else {
	lightMode();
}

function lightMode() {
	document.body.className = "lightmode-background";
	document.getElementById("darkmodebtn").className = "lightmode-button";
	document.getElementById("darkmodebtn").onclick = darkMode;
	localStorage.setItem('mode', 'light');
	mode = localStorage.getItem('mode');
}

function darkMode() {
	document.body.className = "darkmode-background";
	document.getElementById("darkmodebtn").className = "darkmode-button";
	document.getElementById("darkmodebtn").onclick = lightMode;
	localStorage.setItem('mode', 'dark');
	mode = localStorage.getItem('mode');
}
