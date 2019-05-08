import {propogateGrid} from './gridFunctions';

function setCell(cell, value, grid){
    cell.values = value;
    // end function if value is array
    if (value[0]){
        return cell;
    }
    // else complete cell and proceed with solving grid
    grid.solved++;
    if (grid.solved < 81){
        propogateGrid(cell.row, cell.col, value, grid);
    }
    else {
        // TODO: BREAK ALL ITERATIONS, sudoku is solved :D
    }
    return cell;
}