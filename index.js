const sketchArea = document.querySelector('#sketchArea');
const btnChangeSize = document.querySelector('#btnChangeSize');
const btnResetGrid = document.querySelector('#btnResetGrid');

function inputGridSize () {
    // checks to see if user input is valid. if it is, then returns that integer
    // if it's null or empty, returns null. if it's present but contains invalid input, asks for input again
    let userInput;
    let userTryingToChangeSize = true;

    while(userTryingToChangeSize){
        userInput = prompt('Enter the integer number of squares per side (max 100) for a new grid:');
        if(userInput == null || userInput == '') {
            userTryingToChangeSize = false;
            return null;
        } else {
            if(isNaN(userInput) || parseFloat(userInput) > 100 || parseFloat(userInput) < 1) {
                continue;
            } else {
                userTryingToChangeSize = false;
                return parseInt(userInput);
            }
        }
    }
}

function clearGrid () {
    sketchArea.textContent = '';
}

function createGrid (size) {
  for (i=0; i < size; i++) {
        //create the row and add the class
        let row = document.createElement('div');
        row.classList.add('row');

        for (j=0; j < size; j++) {
            //create the square and add the class
            let square = document.createElement('div');
            square.classList.add('square');

            //insert square into the current rows innerHTML
            let squareTag = square.outerHTML;
            row.innerHTML+=squareTag;
        }

        // insert row into the sketchArea innerHTML
        let rowTag = row.outerHTML;
        sketchArea.innerHTML+=rowTag; 
    }
}

function sketch (size) {
    // this function creates the grid and adds functionality to squares
    createGrid(size);

    // adds functionality to make the mouse leave a trail as it hovers over the canvas
    //TODO: make the color random each time
    const squares = document.querySelectorAll('.square')
    squares.forEach((square) => {
        square.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = 'gray';
        });
    });
}

function main() {
    let gridSize = 16;
    sketch(gridSize);

    btnChangeSize.addEventListener('click', () => {
        let tempSize = inputGridSize();
        if(tempSize != null){
            gridSize = tempSize;
            clearGrid();
            sketch(gridSize);
        }   
    });

    btnResetGrid.addEventListener('click', () => {
        clearGrid();
        sketch(gridSize);
    });
}

main();
