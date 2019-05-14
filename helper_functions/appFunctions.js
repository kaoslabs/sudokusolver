// import functions
import {Grid, fillBlankGrid, importGrid, exportGrid} from './gridFunctions';
import {initializeCells} from './solverFunctions';

// init function
function init(app){
    grid = new Grid();
    grid = fillBlankGrid(grid);
    grid = importGrid(app, grid);
    run(grid);
}

// run the app
function run(grid){
    initializeCells(grid);
}

// finish the app
function finish(grid){
    // TODO: break all recursive functions (propogations)
    exportGrid(app, grid);
}