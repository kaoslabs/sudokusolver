// import dependencies
import {getSolved, addSolved} from 'solvedVar.js';

function setCell(cell, value, grid){
    cell = value;
    addSolved();
    if (getSolved() < 81){
        propogateGrid(row, col, values, grid);
    }
    else {
        // TODO: BREAK ALL ITERATIONS, sudoku is solved :D
    }
}