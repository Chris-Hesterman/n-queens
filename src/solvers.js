/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solutionBoard = new Board({ n: n });
  var solution = solutionBoard.rows();

  for (var i = 0; i < n; i++) {
    solutionBoard.togglePiece(i, i);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};
//time complexity O(n)

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var solutionBoard = new Board({ n: n });

  var searchNRooksSolutions = function(board, row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    //iterate each row and column to place piece (toggle)
    for (var col = 0; col < n; col++) {
      //place piece at the upper right corner as the starting point
      board.togglePiece(row, col);
      if (!board.hasAnyRooksConflicts()) {
        //recurse to place next piece, and increase the count by 1
        searchNRooksSolutions(board, row + 1);
      }
      //reset board
      board.togglePiece(row, col);
    }
  };

  searchNRooksSolutions(solutionBoard, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;
};
//time complexity O(n);

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
https: window.findNQueensSolution = function(n) {
  var solutionBoard = new Board({ n: n });
  var solution = null;

  var searchNQueensSolutions = function(solutionBoard, count) {
    if (count === n) {
      //return incremenent the solution count by one
      solution = solutionBoard.rows();
      return solution;
    }
    //iterate each row and column to place piece (toggle)
    for (var row = count; row < n; row++) {
      for (var col = 0; col < n; col++) {
        //place piece at the upper right corner as the starting point
        solutionBoard.togglePiece(row, col);
        //if has no conflict
        if (!solutionBoard.hasAnyQueensConflicts()) {
          //recurse to place next piece, and increase the count by 1
          if (searchNQueensSolutions(solutionBoard, count + 1) !== undefined) {
            return solution;
          }
        }
        //reset board
        solutionBoard.togglePiece(row, col);
        if (col === n - 1) {
          return;
        }
      }
    }
  };
  searchNQueensSolutions(solutionBoard, 0);

  //if no solution, return empty board (nested arrays)
  if (solution === null) {
    return solutionBoard.rows();
  }
  console.log(
    'Single solution for ' + n + ' queens:',
    JSON.stringify(solution)
  );

  return solution;
};
//time complexity O(n**2);  room for improvement

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  if (n === 0) {
    return solutionCount;
  }

  //create instance of the board as newboard
  var solutionBoard = new Board({ n: n });

  var searchNQueensSolutions = function(board, row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    //iterate column to place piece (toggle)
    for (var col = 0; col < n; col++) {
      //place piece at the upper right corner as the starting point
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        //recurse to place next piece, and increase the count by 1
        searchNQueensSolutions(board, row + 1);
      }
      //reset board
      board.togglePiece(row, col);
    }
  };
  searchNQueensSolutions(solutionBoard, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);

  return solutionCount;
};
//time complexity O(n);
