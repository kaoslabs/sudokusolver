import {Grid, defineBox} from './gridFunctions';
import {Cell} from './cellFunctions';

function Solver(){

    // begin by iterating through grid for imported cells
    this.initializeCells = function(){
        // setCell will begin propogation
        for (let r = 0; r < 9; r++){
            for (let c = 0; c < 9; c++){
                grid.cells[r][c].checkCell();
            }
        }
    }

    // remove values from cells in grid
    // calls all other propogate functions
    this.propogateGrid = function(row, col, values){
        propogateRow(row, values);
        propogateCol(col, values);
        propogateBox(row, col, values);
    }

    // remove values from cells in row
    // xcols parameter will also set values for given columns
    this.propogateRow = function(row, values, xcols){
        if (!xcols) xcols = [];
        // iterate cells across row
        for (let c = 0; c < 9; c++){
            let cell = grid.cells[row][c];
            // set cells in given columns to values
            if(xcols.includes(c)){
                cell.setCell(values);
                continue;
            }
            // only remove values from cell IF cell is not solved
            if (!cell.solved){
                cell.removeValues(values);
            }
        }
    }

    // remove values from cells in column
    // xrows parameter will also set values for given rows
    this.propogateCol = function(col, values, xrows){
        if (!xrows) xrows = [];
        // iterate cells down column
        for (let r = 0; r < 9; r++){
            let cell = grid.cells[r][col];
            // set cells in given rows to values
            if(xrows.includes(r)){
                cell.setCell(values);
                continue;
            }
            // only remove values from cell IF cell is not solved
            if (!cell.solved){
                cell.removeValues(values);
            }
        }
    }

    // remove values from cells in box
    // xcells parameter will also set values for given rows & columns
    // xcells must be passed in as an array [0-8] counting left to right, top to bottom
    // 0 is top left of box, 2 is top right, 6 is bottom left, 8 is bottom right
    this.propogateBox = function(row, col, values, xcells){
        if (!xcells) xcells = [];
        let row_box = defineBox(row);
        let col_box = defineBox(col);
        // iterate cells in box
        for (let r = row_box; r < row_box + 3; r++){
            for (let c = col_box; c < col_box + 3; c++){
                let cell = grid.cells[r][c];
                if (xcells.includes(convertBoxToNine(r, c))){
                    cell.setCell(values);
                    continue;
                }
                // only remove values from cell IF cell is not solved
                if (!cell.solved){
                    cell.removeValues(values);
                }
            }
        }
    }

    // check for solo values
    this.findSolosGrid = function(){
        for (let r = 0; r < 9; r++){
            findSolosRow(row);
        }
        for (let c = 0; c < 9; c++){
            findSolosCol(col);
        }
        for (let r = 0; r < 9; r+= 3){
            for (let c = 0; c < 9; c+= 3){
                findSolosBox(row, col);
            }
        }
    }

    // check for solo values in row
    this.findSolosRow = function(row){
        for (let i = 1; i <= 9; i++){
            let count = 0;
            let col = 0;
            for (let c = 0; c < 9; c++){
                if (grid.cells[row][c].checkValue(i)){
                    count++;
                    col = c;
                }
                if (count > 1) break;
            }
            // if there is only one of value i in row, set cell to i
            // note: setCell will then propogate
            if (count == 1){
                grid.cells[row][col].setCell(i);
            }
        }
    }

    // check for solo values in column
    this.findSolosCol = function(col){
        for (let i = 1; i <= 9; i++){
            let count = 0;
            let row = 0;
            for (let r = 0; r < 9; r++){
                if (grid.cells[r][col].checkValue(i)){
                    count++;
                    row = r;
                }
                if (count > 1) break;
            }
            // if there is only one of value i in col, set cell to i
            // note: setCell will then propogate
            if (count == 1){
                grid.cells[row][col].setCell(i);
            }
        }
    }

    // check for solo values in boxes
    this.findSolosBox = function(row, col){
        let row_box = defineBox(row);
        let col_box = defineBox(col);
        for (i = 1; i <= 9; i++){
            let count = 0;
            let row = 0;
            let col = 0;
            for (r = row_box; r < row_box + 3; r++){
                for (c = col_box; c < col_box + 3; c++){
                    if (grid.cells[r][c].checkValue(i)){
                        count++;
                        row = r;
                        col = c;
                    }
                    if (count > 1) break;
                }
            }

            // if there is only one of value i in box, set cell to i
            // note: setCell will then propogate
            if (count == 1){
                grid.cells[row][col].setCell(i);
            }
        }

        // begins to look for pairs across rows, columns, boxes
        this.findPairs = function(){
            for (let r = 0; r < 9; r++){
                findPairsRow(r);
            }
            for (let c = 0; c < 9; c++){
                findPairsCol(c);
            }
            for (let r = 0; r < 9; r+= 3){
                for (let c = 0; c < 9; c+= 3){
                    findPairsBox(r, c);
                }
            }
        }

        // searches row for pairs and propogates
        this.findPairsRow = function(row){
            // create array of values arrays
            let row_values = grid.getRowValues(row);
            for (let c = 0; c < 9; c++){
                // skip cell if not 2 values in cell
                if (row_values[c].length != 2) continue;
                // compare against future cells 
                for (let c_2 = c + 1; c_2 < 9; c_2++){
                    if (compareArraysEqual(row_values[c], row_values[c_2])){
                        propogateRow(row, row_values[c], [c, c_2]);
                    }
                }
            }
        }

        // searches col for pairs and propogates
        this.findPairsCol = function(col){
            // create array of values arrays
            let col_values = grid.getColValues(col);
            for (let r = 0; r < 9; r++){
                // skip cell if not 2 values in cell
                if (col_values[r].length != 2) continue;
                // compare against future cells
                for (let r_2 = r + 1; r_2 < 9; r_2++){
                    if (compareArraysEqual(col_values[r], col_values[r_2])){
                        propogateCol(col, col_values[r], [r, r_2]);
                    }
                }
            }
            
        }

        // searches box for pairs and propogates
        this.findPairsBox = function(row, col){
            let row_box = defineBox(row);
            let col_box = defineBox(col);
            // create array of values arrays
            let box_values = grid.getBoxValues(row, col);
            for (let r = row_box; r < row_box + 3; r++){
                for (let c = col_box; c < col_box + 3; c++){
                    let pos = convertBoxToNine(r, c);
                    // skip cell if not 2 values in cell
                    if (box_values[pos].length != 2) continue;
                    // compare against future cells
                    for (let r_2 = r; r_2 < row_box + 3; r++){
                        for (let c_2 = c + 1; c_2 < c_box + 3; c++){
                            let pos_2 = convertBoxToNine(r_2, c_2);
                            if (compareArraysEqual(box_values[pos], box_values[pos_2])){
                                propogateBox(row, col, box_values[pos], [pos, pos_2]);
                            }
                        }
                    }
                }
            }
        }
    }
}

// specific function for comparing arrays of VALUES ONLY
// returns boolean
function compareArraysEqual(arr1, arr2){
    if (arr1.length != arr2.length) return false;
    for (i = 0; i < arr1.length; i++){
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
}

// converts row col to position in box
var convertBoxToNine = (row, col) => (row % 3 * 3 + col % 3);