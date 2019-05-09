import {Cell} from './cellFunctions';

// declare Grid object
function Grid(){
    this.cells = [];
    this.solved = 0;
}

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
function importGrid(app, grid){
    // TODO: import values from app into grid!
    return grid;
}

// export grid to app
function exportGrid(app, grid){
    // TODO: write code!

    // this version will export grid as a 81 length array
    new_grid = [];
    for (r = 0; r < 9; r++){
        for (c = 0; c < 9; c++){
            grid_pos = r * 9 + c;
            new_grid[grid_pos] = grid[r][c].values;
        }
    }
}

// defines the start value of grid row or column
function defineBox(num){
    return (num - num % 3);
}