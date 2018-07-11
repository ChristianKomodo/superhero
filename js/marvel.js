let page = 0;

// Query the API with the current parameters/modifiers
function queryAPI() {
	const whichAPI = document.getElementById("api").value;
	const nameStartsWith = document.getElementById("starts-with").value;
	const numOfResults = document.getElementById("num-of-results");
	let numOfResultsValue = numOfResults.options[numOfResults.selectedIndex].value;
	let results = parseInt(numOfResultsValue);
	
	if (whichAPI === 'marvel') {
		if (nameStartsWith.length > 0) {
			nameStarts = `nameStartsWith=${nameStartsWith}`;
		} else {
			nameStarts = ``;
		}
		const apiBaseUrl = "http://gateway.marvel.com/v1/public/";
		const pubKey = "f920384417ae0b0f4b66483348535bac";
		const privKey = "460c757a253cd0d47add65f5f148b92bfb86cdd5";
		let ts = new Date().getTime();
		let hash = CryptoJS.MD5(ts + privKey + pubKey).toString();
		const method = "characters";
		let modifiers = `?${nameStarts}&limit=${results}&offset=${page}`;
		$.ajax({
			type: "GET",
			url: apiBaseUrl + method + modifiers,
			data: {
				apikey: pubKey,
				ts: ts,
				hash: hash
			},
			dataType: "json",
			contentType: "application/json"
		})
		.then(function (data) {
			displayData(data);
		},
		function (error) {
			alert('failed! ' + error.responseText);
		});
	} else if(whichAPI === 'superhero') {

		// Working URL
		// superheroapi.com/api.php/10156571734903060/50


		// var xhr = new XMLHttpRequest();
		// xhr.open('GET', 'http://www.superheroapi.com/api.php/10156571734903060/50');
		// xhr.onload = function() {
		// 	if (xhr.status === 200) {
		// 		alert('User\'s name is ' + xhr.responseText);
		// 	}
		// 	else {
		// 		alert('Request failed.  Returned status of ' + xhr.status);
		// 	}
		// };
		// xhr.send();

		// return;


		const apikey = '10156571734903060';
		const name = nameStartsWith.length > 0 ? nameStartsWith : 'a';
		// const queryURL = `http://superheroapi.com/api/${apikey}/search/${name}`;
		// const superheroURL = 'http://superheroapi.com/api/10156571734903060/search/baby';
		const superheroURL = 'http://superheroapi.com/api/10156571734903060/50';
		console.log('superhero url is ', superheroURL);
		$.ajax({
			type: "GET",
			url: superheroURL,
			mode: 'no-cors',
			// data: {
			// },
			dataType: "json",
			contentType: "application/json"
		})
		.then(function (data) {
			displayData(data);
		},
		function (error) {
			alert('failed! ' + error.responseText);
		});
	}
}


// Display the returned data
function displayData(data) {
	myData = data.data.results;
	var dataRow = document.getElementById('data-row');
	var rowData = ``;

	for (var i = 0; i < myData.length; i++) {
		var name = myData[i].name;
		var description = myData[i].description;
		var thumbnail = myData[i].thumbnail.path;
		var extension = myData[i].thumbnail.extension;
		// Only show characters that have an image thumbnail
		if (!myData[i].thumbnail.path.includes('image_not_available')) {
			rowData += `
				<div class="column">
					<div class="card">
						<div class="card-section">
							<img src="${thumbnail}.${extension}">
						</div>
						<div class="card-section">
							<h4>${name}</h4>
							<p>${description}</p>
						</div>
					</div>
				</div>
			`;
		}
	}
	dataRow.innerHTML = rowData;
}

function spinner(state) {
	//
}