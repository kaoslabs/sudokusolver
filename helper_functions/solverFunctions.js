import {defineBox} from './gridFunctions';
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
    this.propogateRow = function(row, values){
        // iterate cells across row
        for (let c = 0; c < 9; c++){
            let cell = grid.cells[row][c];
            // only remove values from cell IF cell is still an array
            if (!cell.solved){
                cell.removeValues(values);
            }
        }
    }

    // remove values from cells in column
    this.propogateCol = function(col, values){
        // iterate cells down column
        for (let r = 0; r < 9; r++){
            let cell = grid.cells[r][col];
            // only remove values from cell IF cell is still an array
            if (!cell.solved){
                cell.removeValues(values);
            }
        }
    }

    // remove values from cells in box
    this.propogateBox = function(row, col, values){
        let row_box = defineBox(row);
        let col_box = defineBox(col);
        // iterate cells in box
        for (let r = row_box; r < row_box + 3; r++){
            for (let c = col_box; c < col_box + 3; c++){
                let cell = grid.cells[r][c];
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
    this.findSolosBox = function(row_box, col_box){
        // row_box = defineBox(row);
        // col_box = defineBox(col);
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
    }
}