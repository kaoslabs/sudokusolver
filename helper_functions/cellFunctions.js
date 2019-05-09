import {propogateGrid} from './gridFunctions';

// Cell object constructor function
function Cell(row, col){
    this.row = row;
    this.col = col;
    values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    solved = false;
}

function setCell(cell, values, grid){
    cell.values = values;
    // end function if value is array
    if (value[0]){
        return cell;
    }
    // else complete cell and proceed with solving grid
    grid.solved++;
    if (grid.solved < 81){
        propogateGrid(cell.row, cell.col, values, grid);
    }
    else {
        // TODO: BREAK ALL ITERATIONS, sudoku is solved :D
    }
    return cell;
}

// removes values from cell
function removeValues(cell, values, grid){

    // checks if values is a single int and converts to an array
    if (!values.length){
        temp_value = values;
        values = [];
        values[0] = temp_value;
    }

    // iterates cell array
    // won't run if cell is not an array
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
    if (!cell.solved){
        setCell(cell, cell.values[0], grid);
    }
    return cell;
}