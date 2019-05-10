import {defineBox} from './gridFunctions';
import {removeValues} from './cellFunctions';

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
        cell = grid.cells[row][c];
        // only remove values from cell IF cell is still an array
        if (!cell.solved){
            grid.cells[row][c].values = removeValues(cell, values, grid);
        }
    }
    return grid;
}

// remove values from cells in column
function propogateCol(col, values, grid){
    var cell;
    // iterate cells down column
    for (r = 0; r < 9; r++){
        cell = grid.cells[r][col];
        // only remove values from cell IF cell is still an array
        if (!cell.solved){
            grid.cells[r][col].values = removeValues(cell, values, grid);
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
            cell = grid.cells[r][c];
            // only remove values from cell IF cell is not solved
            if (!cell.solved){
                grid.cells[r][c].values = removeValues(cell, values, grid);
            }
        }
    }
    return grid;
}

// check for solo values
function findSolosGrid(grid){
    grid = findSolosRow(grid);
    grid = findSolosCol(grid);
    grid = findSolosBox(grid);
}

// check for solo values in rows
function findSolosRow(row, grid){
    for (c = 0; c < 9; c++){
        count = 0;
        for (i = 1; i <= 9; i++){
            
        }
    }
}

// check for solo values in columns
function findSolosCol(col, grid){
    
}

// check for solo values in boxes
function findSolosBox(row, col, grid){
    
}