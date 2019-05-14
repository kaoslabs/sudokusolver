// import functions
import {Grid, fillBlankGrid, importGrid, exportGrid} from './gridFunctions';
import {setCell} from './cellFunctions';

// init function
function init(){
    grid = new Grid();
    grid = fillBlankGrid(grid);
    grid = importGrid(app, grid);
}

// run the app
function run(grid){
    // TODO: start the program!

    // begin by iterating through grid for imported cells
    // setCell will begin propogation
    for (r = 0; r < 9; r++){
        for (c = 0; c < 9; c++){
            cell = grid.cells[r][c];
            if (cell.values.length == 1){
                grid = setCell(cell, values, grid);
            }
        }
    }
}

// finish the app
function finish(grid){
    // TODO: break all recursive functions (propogations)
    exportGrid(app, grid);
}