// import functions
import {fillBlankGrid, importGrid, exportGrid} from './gridFunctions';
import {setCell} from './cellFunctions';

// declare grid object
var grid = {
    cells: [],
    solved: 0
};

// init function
function init(){
    grid = fillBlankGrid(grid);
    // TODO: define app_grid from app
    grid = importGrid(app, grid);
    // TODO: begin iterating cells and propogating completed cells
}

// run the app
function run(grid){
    // TODO: start the program!

    // begin by iterating through grid for imported cells
    // setCell will begin propogation
    for (r = 0; r < 9; r++){
        for (c = 0; c < 9; c++){
            cell = grid[r][c];
            if (cell.values.length == 1){
                setCell(cell, values, grid);
            }
        }
    }
}

// finish the app
function finish(grid){
    // TODO: break all recursive functions (propogations)
    exportGrid(app, grid);
}