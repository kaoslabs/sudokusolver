import {Cell} from './cellFunctions';

// declare Grid object
function Grid(){
    this.solver = new Solver();
    this.cells = [];
    this.solved = 0;

    // fill 9x9 grid with array [1-9]
    this.fillBlankGrid = function(){
        for (r = 0; r < 9; r++){
            this.cells[r] = [];
            for (c = 0; c < 9; c++){
                this.cells[r][c] = new Cell(r, c);
            }
        }
    }

    // import app to grid
    this.importGrid = function(app){
        // TODO: import values from app into grid!
    }

    // export grid to app
    this.exportGrid = function(app){
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

    // returns array of all values in given row
    this.getRowValues = function(row){
        let arr = [];
        for (c = 0; c < 9; c++){
            arr.push(cells[row][c].values);
        }
        return arr;
    }

    // returns array of all values in given column
    this.getColValues = function(col){
        let arr = [];
        for (r = 0; r < 9; r++){
            arr.push(cells[r][col].values);
        }
        return arr;
    }

    // returns array of all values in given box
    this.getBoxValues = function(row, col){
        row_box = defineBox(row);
        col_box = defineBox(col);
        let arr = [];
        for (r = row_box; r < row_box + 3; r++){
            for (c = col_box; c < col_box + 3; c++){
                arr.push(cells[r][c].values);
            }
        }
        return arr;
    }
}

// defines the start value of grid row or column
// returns int value
var defineBox = num => (num - num % 3);