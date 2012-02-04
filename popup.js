var SENotifyer = SENotifyer || {};

// Url request
SENotifyer.tag = "nlp";
SENotifyer.site = "stackoverflow";
SENotifyer.baseurl = "https://api.stackexchange.com/2.0/questions/no-answers";

SENotifyer.checkNewPost = function(){
	document.getElementById("SENotifyer-tag").innerText = SENotifyer.tag;
	document.getElementById("SENotifyer-site").innerText = SENotifyer.site;
	document.getElementById("SENotifyer-count").innerText = "?";
	var url = SENotifyer.baseurl + "?fromdate=1323043200&order=desc&sort=activity&tagged="+SENotifyer.tag+"&site="+SENotifyer.site;
	
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

window.onload = function(){
	SENotifyer.checkNewPost();
}