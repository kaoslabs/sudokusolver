import {Cell} from './cellFunctions';

// fill 9x9 grid with array [1-9] 
function fillBlankGrid(grid){
    for (r = 0; r < 9; r++){
        grid.cells[r] = [];
        for (c = 0; c < 9; c++){
            grid.cells[r][c] = new Cell(r, c);
        }
    }
    return grid;
}

// import app to grid
function importGrid(app_grid, grid){
    // TODO: import values from app into grid!
    return grid;
}

// export grid to app
function exportGrid(grid){
    // TODO: write code!
}