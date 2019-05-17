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
    // xcols parameter will instead set values for given columns
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
            // only remove values from cell IF cell is still an array
            if (!cell.solved){
                cell.removeValues(values);
            }
        }
    }

    // remove values from cells in column
    // xrows parameter will instead set values for given rows
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
            // only remove values from cell IF cell is still an array
            if (!cell.solved){
                cell.removeValues(values);
            }
        }
    }

    // remove values from cells in box
    // xcells parameter will instead set values for given rows & columns
    // xcells must be passed in as an object array [{row: r, col: c}, ...]
    this.propogateBox = function(row, col, values, xcells){
        if (!xcells) xcells = [];
        let row_box = defineBox(row);
        let col_box = defineBox(col);
        // iterate cells in box
        for (let r = row_box; r < row_box + 3; r++){
            for (let c = col_box; c < col_box + 3; c++){
                let cell = grid.cells[r][c];
                if (xcells.includes({row: r, col: c})){
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
            // TODO: FIX includes! Needs an index for second cell!!
            let row_values = grid.getRowValues;
            for (let c = 0; c < 9; c++){
                let values = grid.cells[row][c].values;
                if(row_values.includes(values, c + 1)){
                    let xcols = [c, twofers[j].col];
                    propogateRow(row, twofers[i].values, xcols);
                }
            }
        }

        this.findPairsCol = function(col){
            let twofers = [];
            for (let r = 0; r < 9; r++){
                let values = grid.cells[row][c].values;
                if (values.length == 2) twofers.push({values: values, row: r});
            }
            if (twofers.length >= 2){
                for (let i = 0; i < twofers.length - 1; i++){
                    for (let j = i + 1; j < twofers.length; j++){
                        if (twofers[i].values == twofers[j].values){
                            let xrows = [twofers[i].row, twofers[j].row];
                            propogateCol(col, twofers[i].values, xrows);
                        }
                    }
                }
            }
            
        }

        this.findPairsBox = function(row, col){
            let twofers = [];
            let row_box = defineBox(row);
            let col_box = defineBox(col);
            for (let r = row_box; r < row_box + 3; r++){
                for (let c = col_box; c < col_box + 3; c++){
                    let values = grid.cells[r][c].values;
                    if (values.length == 2) twofers.push({values: values, row: r, col: c});
                }
                if (twofers.length >= 2){
                    for (let i = 0; i < twofers.length - 1; i++){
                        for (let j = i + 1; j < twofers.length; j++){
                            if (twofers[i].values == twofers[j].values){
                                let xcells = [
                                                {
                                                    row: twofers[i].row,
                                                    col: twofers[i].col
                                                },
                                                {
                                                    row: twofers[j].row,
                                                    col: twofers[j].col
                                                }
                                            ];
                                propogateBox(row, col, values, xcells);
                            }
                        }
                    }
                }
            }
        }
    }
}