var SENotifyer = SENotifyer || {};

// Url request
SENotifyer.tag = localStorage["SENtag"] || "nlp";
SENotifyer.site = localStorage["SENsite"] || "stackoverflow";
SENotifyer.days = localStorage["SENdays"] || 2;
SENotifyer.baseurl = "https://api.stackexchange.com/2.0/questions/no-answers";

SENotifyer.checkNewPost = function(){
	document.getElementById("SENotifyer-tag").innerText = SENotifyer.tag;
	document.getElementById("SENotifyer-site").innerText = SENotifyer.site;
	document.getElementById("SENotifyer-count").innerText = "?";
	var startdate = Math.round(new Date().getTime() / 1000) - (24 * 3600 * SENotifyer.days);
	//alert(startdate);
	var url = SENotifyer.baseurl + "?order=desc&sort=activity&fromdate="+startdate+"&tagged="+SENotifyer.tag+"&site="+SENotifyer.site;
	
	var xhr = new XMLHttpRequest();	
	xhr.open("GET", url, true);	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var resp = JSON.parse(xhr.responseText);
			document.getElementById("SENotifyer-count").innerText = resp.items.length;
		}
	}
	xhr.send();	
}

// Save options to localStorage
SENotifyer.saveOptions = function() {
	localStorage["SENtag"] = document.getElementById("tag").value;
	localStorage["SENsite"] = document.getElementById("site").value;
	localStorage["SENdays"] = document.getElementById("days").value;

	// Update status to let user know options were saved.
	var status = document.getElementById("status");
	status.innerHTML = "Options Saved.";
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);
}

// Restores saved value from localStorage.
SENotifyer.restoreOptions = function () {
	document.getElementById("tag").value = localStorage["SENtag"] || "nlp";
	document.getElementById("site").value = localStorage["SENsite"] || "stackoverflow";
	document.getElementById("days").value = localStorage["SENdays"] || 2;
}