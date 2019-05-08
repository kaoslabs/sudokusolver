import {propogateGrid} from './gridFunctions';

function setCell(cell, value, grid){
    cell = value;
    grid.solved++;
    if (grid.solved < 81){
        propogateGrid(row, col, values, grid);
    }
    else {
        // TODO: BREAK ALL ITERATIONS, sudoku is solved :D
    }
    return cell;
}