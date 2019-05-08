import {defineBox} from './defineBox';
import {removeValues} from './removeValues';


function propogateGrid(row, col, values, grid){
    grid = propogateRow(row, values, grid);
    grid = propogateCol(col, values, grid);
    grid = propogateBox(row, col, values, grid);
}

function propogateRow(row, values, grid){
    var cell;
    // iterate cells across row
    for (c = 0; c < 9; c++){
        cell = grid[row][c];
        // only remove values from cell IF cell is still an array
        if (cell[0]){
            grid[row][c] = removeValues(cell, values);
        }
    }
    return grid;
}

function propogateCol(col, values, grid){
    var cell;
    // iterate cells down column
    for (r = 0; r < 9; r++){
        cell = grid[r][col];
        // only remove values from cell IF cell is still an array
        if (cell[0]){
            grid[r][col] = removeValues(cell, values);
        }
    }
    return grid;
}

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
                grid[r][c] = removeValues(cell, values);
            }
        }
    }
    return grid;
}