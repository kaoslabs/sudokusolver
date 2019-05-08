import {defineBox} from './defineBox';
import {removeValues} from './removeValues';

// remove values from cells in grid
// calls all other propogate functions
function propogateGrid(row, col, values, grid){
    grid = propogateRow(row, values, grid);
    grid = propogateCol(col, values, grid);
    grid = propogateBox(row, col, values, grid);
    return grid;
}

// remove values from cells in row
function propogateRow(row, values, grid){
    var cell;
    // iterate cells across row
    for (c = 0; c < 9; c++){
        cell = grid[row][c];
        // only remove values from cell IF cell is still an array
        if (cell[0]){
            grid[row][c] = removeValues(cell, values, grid);
        }
    }
    return grid;
}

// remove values from cells in column
function propogateCol(col, values, grid){
    var cell;
    // iterate cells down column
    for (r = 0; r < 9; r++){
        cell = grid[r][col];
        // only remove values from cell IF cell is still an array
        if (cell[0]){
            grid[r][col] = removeValues(cell, values, grid);
        }
    }
    return grid;
}

// remove values from cells in box
function propogateBox(row, col, values, grid){
    var cell;
    row = defineBox(row);
    col = defineBox(col);
    // iterate cells in box
    for (r = row; r < row + 3; r++){
        for (c = col; c < col + 3; c++){
            cell = grid[r][c];
            // only remove values from cell IF cell is still an array
            if (cell[0]){
                grid[r][c] = removeValues(cell, values, grid);
            }
        }
    }
    return grid;
}