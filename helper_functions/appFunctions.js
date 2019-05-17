// import functions
import {Grid} from './gridFunctions';
import {initializeCells} from './solverFunctions';

var app;

// init function
function init(app){
    grid = new Grid();
    grid.fillBlankGrid();
    grid.importGrid(app);
    run(grid);
}

// run the app
function run(grid){
    grid = initializeCells(grid);
}

// finish the app
function finish(grid){
    // TODO: break all recursive functions (propogations)
    // TODO: get app variable
    exportGrid(app);
}