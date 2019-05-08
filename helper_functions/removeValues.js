import {setCell} from './setCell';

// removes values from cell
function removeValues(cell, values, grid){

    // checks if values is a single int and converts to an array
    if (!values.length){
        var temp_value = values;
        values = [];
        values[0] = temp_value;
    }

    // iterates cell array
    // won't run if cell is not an array
    for (i = 0; i < cell.length; i++){
        // iterates given values
        for (j = 0; j < values.length; j++){
            // checks if value matches cell
            // TODO: optimize this to break loop when values[j] < cell[i] to reduce iterations
            if (cell[i] == values[j]){
                // remove value from cell
                cell.splice(i,1);
            }
        }
    }
    if (!cell[0]){
        setCell(cell, cell[0], grid);
    }
    return cell;
}