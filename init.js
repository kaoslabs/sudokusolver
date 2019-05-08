// import functions
import {fillBlankGrid} from './helper_functions/gridFunctions';

// declare grid object
var grid = {
    cells: [],
    solved: 0
};

// init function
function init(){
    grid = fillBlankGrid(grid);
    // TODO: define app_grid from app
    grid = importGrid(app_grid, grid);
    // TODO: begin iterating cells and propogating completed cells
}

