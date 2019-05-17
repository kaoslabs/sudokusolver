import {Cell} from './cellFunctions';

// declare Grid object
function Grid(){
    this.cells = [];
    this.solved = 0;

    // fill 9x9 grid with array [1-9]
    // returns grid
    function fillBlankGrid(){
        for (r = 0; r < 9; r++){
            this.cells[r] = [];
            for (c = 0; c < 9; c++){
                this.cells[r][c] = new Cell(r, c);
            }
        }
    }

    // import app to grid
    // returns grid
    function importGrid(app){
        // TODO: import values from app into grid!
    }

    // export grid to app
    function exportGrid(app){
        // TODO: write code!

        // this version will export grid as a 81 length array
        grid_arr = [];
        for (r = 0; r < 9; r++){
            for (c = 0; c < 9; c++){
                grid_pos = r * 9 + c;
                grid_arr[grid_pos] = this.cells[r][c].values;
            }
        }

        // TODO: make this work! app.export(grid_arr)
    }

}

// defines the start value of grid row or column
// returns int value
var defineBox = num => (num - num % 3);