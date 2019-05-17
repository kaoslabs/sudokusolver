import {defineBox} from './gridFunctions';
import {removeValues, checkValue, setCell} from './cellFunctions';

// begin by iterating through grid for imported cells
// returns grid
function initializeCells(grid){
    // setCell will begin propogation
    for (r = 0; r < 9; r++){
        for (c = 0; c < 9; c++){
            cell = grid.cells[r][c];
            if (cell.values.length == 1){
                grid.setCell(cell, values);
            }
        }
    }
    return grid;
}

// remove values from cells in grid
// calls all other propogate functions
// returns grid
function propogateGrid(row, col, values, grid){
    grid = propogateRow(row, values, grid);
    grid = propogateCol(col, values, grid);
    grid = propogateBox(row, col, values, grid);
    return grid;
}

// remove values from cells in row
// returns grid
function propogateRow(row, values, grid){
    var cell;
    // iterate cells across row
    for (c = 0; c < 9; c++){
        cell = grid.cells[row][c];
        // only remove values from cell IF cell is still an array
        if (!cell.solved){
            grid = removeValues(cell, values, grid);
        }
    }
    return grid;
}

// remove values from cells in column
// returns grid
function propogateCol(col, values, grid){
    var cell;
    // iterate cells down column
    for (r = 0; r < 9; r++){
        cell = grid.cells[r][col];
        // only remove values from cell IF cell is still an array
        if (!cell.solved){
            grid = removeValues(cell, values, grid);
        }
    }
    return grid;
}

// remove values from cells in box
// returns grid
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
                grid = removeValues(cell, values, grid);
            }
        }
    }
    return grid;
}

// check for solo values
// returns grid
function findSolosGrid(grid){
    grid = findSolosRow(grid);
    grid = findSolosCol(grid);
    grid = findSolosBox(grid);
    return grid;
}

// check for solo values in rows
// returns grid
function findSolosRow(row, grid){
    for (i = 1; i <= 9; i++){
        count = 0;
        col = 0;
        for (c = 0; c < 9; c++){
            if (checkValue(grid.cells[row][c], i)){
                count++;
                col = c;
            }
            if (count > 1) break;
        }
        // if there is only one of value i in row, set cell to i
        // note: setCell will then propogate
        if (count == 1){
            grid = setCell(grid.cells[row][col], i, grid);
        }
    }
    return grid;
}

// check for solo values in columns
// returns grid
function findSolosCol(col, grid){
    for (i = 1; i   <= 9; i++){
        count = 0;
        row = 0;
        for (r = 0; r < 9; r++){
            if (checkValue(grid.cells[r][col], i)){
                count++;
                row = r;
            }
            if (count > 1) break;
        }
        // if there is only one of value i in col, set cell to i
        // note: setCell will then propogate
        if (count == 1){
            grid = setCell(grid.cells[row][col], i, grid);
        }
    }
    return grid;
}

// check for solo values in boxes
// returns grid
function findSolosBox(row, col, grid){
    row_box = defineBox(row);
    col_box = defineBox(col);
    for (i = 1; i <= 9; i++){
        count = 0;
        row = 0;
        col = 0;
        for (r = row_box; r < row_box + 2; r++){
            for (c = col_box; c < col_box + 2; c++){
                if (checkValue(grid.cells[r][c], i)){
                    count++;
                    row = r;
                    col = c;
                }
                if (count > 1) break;
            }
        }

        // if there is only one of value i in row, set cell to i
        // note: setCell will then propogate
        if (count == 1){
            grid = setCell(grid.cells[row][col], i, grid);
        }
    }
    return grid;
}