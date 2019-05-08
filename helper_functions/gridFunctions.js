function Cell(row, col){
    this.row = row;
    this.col = col;
    var values = [];
    var solved = false;
}

// fill 9x9 grid with array [1-9] 
function fillBlankGrid(grid){
    for (r = 0; r < 9; r++){
        grid.cells[r] = [];
        for (c = 0; c < 9; c++){
            grid.cells[r][c] = new Cell(r, c);
            for (i = 0; i < 9; i++){
                grid.cells[r][c].values[i] = i + 1;
            }
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