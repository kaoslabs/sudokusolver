import {propogateGrid} from './solverFunctions';
import {finish} from './appFunctions';

// Cell object constructor function
function Cell(row, col){
    this.row = row;
    this.col = col;
    this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.isSolved = false;

    // sets cell to given value(s)
    this.setCell = function(values){

        // checks if values is a single int and converts to an array
        if (!values.length){
            temp_value = values;
            values = [];
            values[0] = temp_value;
        }
        this.values = values;
        checkCell();
    }

    // checks if cell is not "solved" and has one value remaining
    // if so, sets to "solved" and propogates the value
    this.checkCell = function(){
        // end function if values is > 1 because cell is not solved
        if (this.values.length > 1){
            return;
        }
                // else complete cell and proceed with solving grid
        this.isSolved = true;
        grid.solved++;
        if (grid.solved < 81){
            propogateGrid(this.row, this.col, this.values);
        }
        else {
            // TODO: BREAK ALL ITERATIONS, sudoku is solved :D
            finish(grid);
        }
    }

    // checks cell for value
    // returns boolean
    this.checkValue = function(value){
        for (i = 0; i < this.values.length; i++){
            if (this.values[i] == value) return true;
            if (this.values[i] > value) break;
        }
        return false;
    }

    // removes values from cell
    this.removeValues = function(values){
        // exits early if cell is already solved or if cell.values has only 1 item
        if (this.isSolved || this.values.length == 1){
            return;
        }

        // checks if values is a single int and converts to an array
        if (!values.length){
            temp_value = values;
            values = [];
            values[0] = temp_value;
        }

        // iterates cell array
        for (i = 0; i < this.values.length; i++){
            // iterates given values
            for (j = 0; j < values.length; j++){
                // checks if value matches cell
                // TODO: optimize this to break loop when values[j] < cell[i] to reduce iterations
                if (this.values[i] == values[j]){
                    // remove value from cell
                    this.values.splice(i,1);
                }
            }
        }
        checkCell();
    }
}