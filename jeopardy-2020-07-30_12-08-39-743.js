// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds() {
	async function ids() {
		let cat = await axios.get('http://jservice.io/api/categories?count=100');
		return getCategory(cat.data[Math.floor(Math.random() * 100)].id);
	}
	ids();
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

function getCategory(catId) {
	async function getem() {
		let id = await axios.get(`http://jservice.io/api/category?id=${catId}`);
		console.log(id);
		categories = {
			title: id.data.title,
			clues: id.data.clues.map((clues) => [
				{
					question: clues.question,
					answer: clues.answer
				}
			])
		};
		console.log(categories);
	}
	return getem();
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
	$('.hcell.0').html(categories.title);
	return $('.0-0').html(categories.clues[Math.floor(Math.random() * 5)][0].question);
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

function setupAndStart() {
	makeHTMLBoard();
}
function makeHTMLBoard() {
	let container = document.getElementById('jeopardy');
	let table = document.createElement('TABLE');
	table.setAttribute('id', 'table');
	let top = document.createElement('tr');
	container.append(table);
	for (let x = 0; x < 6; x++) {
		let header = document.createElement('td');
		header.setAttribute('class', `hcell ${x}`);
		top.append(header);
	}

	table.append(top);

	for (let y = 0; y < 5; y++) {
		const row = document.createElement('tr');
		for (let x = 0; x < 6; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('class', `cell ${x}-${y}`);
			$(cell).on('click', function(e) {
				fillTable();
			});
			cell.innerHTML =
				'<img src="https://freesvg.org/img/purzen-Icon-with-question-mark.png" alt="Question Mark" style="width:50%;margin-right:auto;margin-left:auto;">';
			row.append(cell);
		}
		table.append(row);
	}
}
setupAndStart();
getCategoryIds();
/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO
