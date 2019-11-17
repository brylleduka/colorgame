let numSquares = 6;
let colors = [];
let pickedColor;
const squares = document.querySelectorAll('.square');
let colorDisplay = document.querySelector('#colorDisplay');
let messageDisplay = document.querySelector('#message');
const header = document.querySelector('.header');
const resetBtn = document.querySelector('#reset');
const modeBtn = document.querySelectorAll('.mode');

init();
function init() {
	//mode button event listener
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons() {
	for (let i = 0; i < modeBtn.length; i++) {
		modeBtn[i].addEventListener('click', function() {
			modeBtn[0].classList.remove('selected');
			modeBtn[1].classList.remove('selected');
			this.classList.add('selected');

			//ternary operator
			this.textContent === 'Easy' ? (numSquares = 3) : (numSquares = 6);

			//ternary operator is the as this if else
			//// if(this.textContent === "Easy"){
			//// 	numSquares = 3;
			//// }else{
			//// 	numSquares = 6;
			//// }
			reset();
		});
	}
}

function setupSquares() {
	for (let i = 0; i < squares.length; i++) {
		//add click listener to squares
		squares[i].addEventListener('click', function() {
			//grab color of clicked square
			const clickedColor = this.style.backgroundColor;
			//compare color to the picked color
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = 'Correct!';
				changeColors(clickedColor);
				header.style.backgroundColor = clickedColor;

				resetBtn.textContent = 'Play again?';
			} else {
				this.style.backgroundColor = '#232323';
				messageDisplay.textContent = 'Try Again';
			}
		});
	}
}
function reset() {
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change color display to match picked color
	colorDisplay.textContent = pickedColor;

	header.style.backgroundColor = 'steelblue';
	resetBtn.textContent = 'New Colors';
	messageDisplay.textContent = '';

	//change colors of squares
	for (let i = 0; i < squares.length; i++) {
		//if else ternary operator
		colors[i]
			? ((squares[i].style.display = 'block'), (squares[i].style.backgroundColor = colors[i]))
			: (squares[i].style.display = 'none');

		//if else alternative
		//// if (colors[i]) {
		//// 	squares[i].style.display = 'block';
		//// 	squares[i].style.backgroundColor = colors[i];
		//// } else {
		//// 	squares[i].style.display = 'none';
		//// }
	}
}

resetBtn.addEventListener('click', function() {
	reset();
});

const changeColors = (color) => {
	//loop through all squares using for loop
	// for (let i = 0; i < squares.length; i++) {
	// 	squares[i].style.backgroundColor = color;
	// }
	//loop using array.forEach
	squares.forEach((element) => {
		element.style.backgroundColor = color;
	});

	//change each color to match given color
};

function pickColor() {
	const random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//make an array
	let arr = [];
	//repeat num times
	for (let i = 0; i < num; i++) {
		arr.push(randomColor());
		//get random color and push into arr
	}
	//return that array;
	return arr;
}

function randomColor() {
	//pick a "red" from 0 - 255
	const r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	const g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 - 255
	const b = Math.floor(Math.random() * 256);

	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
