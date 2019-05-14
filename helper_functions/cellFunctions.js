import {propogateGrid} from './solverFunctions';
import {finish} from './appFunctions';

// Cell object constructor function
function Cell(row, col){
    this.row = row;
    this.col = col;
    this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.solved = false;
}

// sets cell to given value(s)
// returns grid
function setCell(cell, values, grid){

    // checks if values is a single int and converts to an array
    if (!values.length){
        temp_value = values;
        values = [];
        values[0] = temp_value;
    }
    cell.values = values;

    // end function if values is > 1 because cell is not solved
    if (values.length > 1){
        return grid;
    }

    // else complete cell and proceed with solving grid
    cell.solved = true;
    grid.solved++;
    if (grid.solved < 81){
        propogateGrid(cell.row, cell.col, values, grid);
    }
    else {
        // TODO: BREAK ALL ITERATIONS, sudoku is solved :D
        finish(grid);
    }
    return grid;
}

// checks cell for value
// returns boolean
function checkValue(cell, value){
    for (i = 0; i < cell.values.length; i++){
        if (cell.values[i] == value) return true;
        if (cell.values[i] > value) break;
    }
    return false;
}

// removes values from cell
// returns grid
function removeValues(cell, values, grid){
    // exits early if cell is already solved or if cell.values has only 1 item
    if (cell.solved || cell.values.length == 1){
        return grid;
    }

    // checks if values is a single int and converts to an array
    if (!values.length){
        temp_value = values;
        values = [];
        values[0] = temp_value;
    }

    // iterates cell array
    for (i = 0; i < cell.values.length; i++){
        // iterates given values
        for (j = 0; j < values.length; j++){
            // checks if value matches cell
            // TODO: optimize this to break loop when values[j] < cell[i] to reduce iterations
            if (cell[i] == values[j]){
                // remove value from cell
                cell.values.splice(i,1);
            }
        }
    }
    grid = setCell(cell, cell.values[0], grid);
    return grid;
}