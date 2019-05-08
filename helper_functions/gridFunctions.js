// Cell object constructor function
function Cell(row, col){
    this.row = row;
    this.col = col;
    values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    solved = false;
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
function importGrid(grid){
    // TODO: import values from app into grid!
    return grid;
}

// export grid to app
function exportGrid(grid){
    // TODO: write code!
}