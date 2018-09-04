// From https://stackoverflow.com/a/12646864/185596
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }
}

let nameList = document.querySelector('#names');
let generate = document.querySelector('#generate');
let countInput = document.querySelector('#count');

countInput.onkeyup = e => {
	generate.disabled = countInput.validity.patternMismatch;
}

generate.onclick = e => {
	if (countInput.validity.patternMismatch) {
		return;
	}

	let results = document.querySelector('#results');
	let count = countInput.value;
	var i, names =  Array.from(document.querySelectorAll('#names div')).map(div => div.textContent.trim());
/*
	while (names.length % count != 0) {
		names.push("Empty slot");
	}
*/
	shuffleArray(names);

	let tables = [];
	let tableCount = Math.ceil(names.length / count);
	console.log(tableCount);
	
	for (i = 0; i < names.length; i++) {
		if (typeof tables[i % tableCount] == 'undefined') {
			tables[i % tableCount] = [];
		}
		tables[i % tableCount].push(names[i]);
	}

//	let chunks = chunkArray(names, count);
	results.innerHTML = tables.map(arr => "<li>" + arr.join("<br>") + "</li>").join(" ");
	
	document.querySelector('#results').style.display = 'block';
};
