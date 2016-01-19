/*
Alex Bieg CSE 154 fall 2014 AG hw9
Javascript for babaynames website
*/

"use strict";

(function () {
	//runs when window is loaded gets names from server and assigns event hadlers
	window.onload = function  () {
		document.getElementById("search").onclick = search;
		document.getElementById("form").onsubmit = search;
	};

	//searches for data and displays it for the selected name when the search button is clicked
	function search () {
		var name = document.getElementById("name").value;
		var gender = getGender();
		if(name){
			var ajax = new XMLHttpRequest();
			ajax.onload = addData;
			ajax.open("GET", "getnames.php?name=" + name + "&gender=" + gender);
			ajax.send();
		}
		return false;
	}

	//adds data from server about the name searched to the page. It creates a graph and
	//displays the meaning of the name.
	function addData () {
		if(this.status == 200){
			document.getElementById("resultsarea").style.display = "initial";
			var json = JSON.parse(this.responseText);
			var graph = document.getElementById("graph");
			var meaningDiv = document.getElementById("meaning");

			graph.innerHTML = "";
			meaningDiv.innerHTML = "";
			document.getElementById("errors").innerHTML = "";

			var headRow = document.createElement("tr");
			var rankRow = document.createElement("tr");
			var ranks = json.rank;
			var year = parseInt(json.start);
			for (var i = 0; i < ranks.length; i++) {
				var rank = parseInt(ranks[i]);
				var bar = document.createElement("div");
				var cell = document.createElement("td");
				bar.innerHTML = rank;
				if(rank){
					bar.style.height = parseInt((1000-rank)/4) + "px";
				}else{
					bar.style.height = 0 +"px";
				}
				cell.appendChild(bar);
				rankRow.appendChild(cell);

				var th = document.createElement("th");
				th.innerHTML = year;
				headRow.appendChild(th);
				year += 10;
			}
			graph.appendChild(headRow);
			graph.appendChild(rankRow);

			var meaning = json.meaning;
			meaningDiv.innerHTML = meaning;
			document.getElementById("loadingmeaning").classList.add("hidden");
			document.getElementById("loadinggraph").classList.add("hidden");
		}else{
			document.getElementById("resultsarea").style.display = "none";
			document.getElementById("errors").innerHTML = "That Name Could Not Be Found With That Gender";
			console.log(this.responseText);
		}
	}

	//returns the gender either "m" or "f" depending on which radio button is selected
	function getGender () {
		var gender = "";
		if(document.getElementById("genderm").checked){
			gender = "m";
		}else{
			gender = "f";
		}
		return gender;
	}

	

}());