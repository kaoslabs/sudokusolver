# sudokusolver
Personal project to create a sudoku solver. The goal is to practice coding and problem solving by converting my sudoku solving process into code WITHOUT using established methods.

The code will create a 9x9 matrix of cells (an array length 9 with each item another array length 9). Each cell will be initialized with an array of 1-9, and methods will be used to eliminate possibilities until each cell may be solved.

Terms:
- cell - refers to individual squares
- box - refers to any of the nine 3x3 cell sections
- grid - refers to the whole 9x9 puzzle

The initially given cells will be set to unsolved so that they may be propogated at the start of the solver.

The order of methods used:

1. Propogating: The main tool used is propogating cells. Whenever a cell is solved, the propogate methods will eliminate the solved number from each cell in that row, column, and box.
* this function is highly recursive and may be several iterations deep at any point
* a cell is considered solved when the possible values array is reduced to one value OR if another method solves the cell early

2. Find Solos: The next tool will check for solo values. This will determine if any row, column, or box has one remaining possibility for a number. The cell will then be considered solved, and the propogate function will be called.

3. Find Pairs: This tool will find pairs (can be modified for triplets, etc). A pair is two cells in the same row, column, or box which share the same 2 possible values. We can then treat the remaining cells in that row, column, or box as not having the 2 possible values. The propogate function can take an array specifically for the purpose of higher level functions like finding pairs. The code may be modified to find larger groupings (triplets, etc).

4. Guess: The final tool would be the hardest (most resource intensive) to implement as code: guessing. If sufficient iterations of previous methods fail to solve the puzzle, you may take a cell from a known pair and guess a value. Then, the other methods could continue until the puzzle is either solved or a cell fails (all values removed), at which point the puzzle would need to be reset to before the guess and then proceed using the alternate value.
* This method will not be written initially and would only be a last resort should no other methods prevail. I assume that this method is a more "human" approach which should not be necessary given that a machine would follow all steps completely and make no mistakes.
* I only personally use this method on the hardest rated puzzles when I am stuck and am not making notes along the way.

TODO:
- finish the raw code
- test on multiple puzzles of varying difficulties
- refine the input/output process
- convert to an AWS Lambda function*
- add logs to track computer "vision": the current cell of interest, the method being used, and the related values**

* the ultimate goal is to make this an AWS Lambda function which will take a puzzle (probably an 81 length array for maximum compatability) and return just the solution (another array)

** logs may help with troubleshooting and optimization / analytics. Logs could also be exported to create a simulated solver. For example, a visual aid could show 1-9 in each cell which updates as possibilities are eliminated as well as highlighting cells, rows, columns, and boxes being involved in methods.
