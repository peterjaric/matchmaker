// Shuffle an array in place
// From https://stackoverflow.com/a/12646864/185596
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let nameList = document.querySelector('.names');
let generate = document.querySelector('.generate');
let countInput = document.querySelector('.count');

// Disable/enable generate button when the count value changes
countInput.onkeyup = e => {
	generate.disabled = countInput.validity.patternMismatch;
}

generate.onclick = e => {
	if (countInput.validity.patternMismatch) {
		// The generate button was enabled although the count value vas invalid,
		// let's fix that and cancel this operation.
		generate.disabled = countInput.validity.patternMismatch;
		return;
	}

	let results = document.querySelector('.results');
	let count = countInput.value;
	let tables = [];
	let names =  document.querySelector('.names').innerText.trim().split('\n').map(name => name.trim());
	shuffleArray(names);

	let tableCount = Math.ceil(names.length / count);

	// Distribute players as evenly as possible over the available tables
	for (let i = 0; i < names.length; i++) {
		if (typeof tables[i % tableCount] == 'undefined') {
			tables[i % tableCount] = [];
		}
		tables[i % tableCount].push(names[i]);
	}

	// Create list items for the resulting tables
	results.innerHTML = tables.map(arr => "<li>" + arr.join("<br>") + "</li>").join(" ");

	// Show list of tables
	document.querySelector('.results').style.display = 'block';
};
