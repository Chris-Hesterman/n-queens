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
  //give us matrix
  let solutionBoard = new Board({ n: n });
  let solution = solutionBoard.rows();

  for (let i = 0; i < n; i++) {
    solutionBoard.togglePiece(i, i);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  //create instance of the board as newboard
  var solutionBoard = new Board({ n: n });
  // //recursion function: input whole board
  // var rowCount = 0;
  // for (var row = count; row < n; row++) {
  var searchNRooksSolutions = function(board, count) {
    var row = count;
    //base case - if it has no child, last piece is placed using counter var
    if (count === n) {
      //return incremenent the solution count by one
      solutionCount++;
    }

    //iterate each row and column to place piece (toggle)
    while (row < n) {
      for (var col = 0; col < n; col++) {
        //place piece at the upper right corner as the starting point
        board.togglePiece(row, col);
        //if has no conflict
        if (!board.hasAnyRooksConflicts()) {
          //recurse to place next piece, and increase the count by 1
          searchNRooksSolutions(board, count + 1);
          //reset board
          board.togglePiece(row, col);
        } else {
          //remove piece and move onto the next iteration, un-toggle
          board.togglePiece(row, col);
        }
      }

      return;
    }
  };

  searchNRooksSolutions(solutionBoard, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // let solutionBoard = new Board({ n: n });
  // let solution = solutionBoard.rows();
  // let start = n === 1 ? 0 : 1;

  // for (var row = 0; row < n; row++) {
  //   if (row > 0) {
  //     start = 0;
  //   }
  //   for (var col = start; col < n; col++) {
  //     //place piece at the upper right corner as the starting point
  //     solutionBoard.togglePiece(row, col);

  //     //if has no conflict
  //     if (solutionBoard.hasAnyQueensConflicts()) {
  //       //remove piece and move onto the next iteration, un-toggle
  //       solutionBoard.togglePiece(row, col);
  //     } else {
  //       start = col + 2;
  //     }
  //   }
  // }
  let solutionBoard = new Board({ n: n });
  let solution = null;
  var searchNQueensSolutions = function(solutionBoard, count) {
    //base case - if it has no child, last piece is placed using counter var
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
        //if it iterates to the last column without a solution, then go back to parent
        if (col === n - 1) {
          return;
        }
      }
      // return;
    }
  };

  searchNQueensSolutions(solutionBoard, 0);

  //if no solution, return empty board (nested arrays)
  if (solution === null) {
    return solutionBoard.rows();
  }

  // let count = 0;
  // var searchNQueensSolutions = function(solutionBoard, row) {

  //   //base case - if it has no child, last piece is placed using counter var
  //   if (count === n) {
  //     //return incremenent the solution count by one
  //     return;
  //   }

  //   //iterate each row and column to place piece (toggle)
  //   while (row < n) {
  //     for (var col = 0; col < n; col++) {
  //       //place piece at the upper right corner as the starting point
  //       solutionBoard.togglePiece(row, col);
  //       //if has no conflict
  //       if (!solutionBoard.hasAnyQueensConflicts()) {
  //         //recurse to place next piece, and increase the count by 1
  //         count++;
  //         searchNQueensSolutions(solutionBoard, row + 1);
  //         //reset board
  //         //solutionBoard.togglePiece(row, col);
  //       } else {
  //         //remove piece and move onto the next iteration, un-toggle
  //         solutionBoard.togglePiece(row, col);
  //         if ((col = n - 1)) {
  //           row++;
  //         }
  //       }
  //     }

  //     // return solutionBoard.rows();
  //   }
  // };

  // let solution = solutionBoard.rows();
  console.log(
    'Single solution for ' + n + ' queens:',
    JSON.stringify(solution)
  );
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var nonRepeating = [];
  var solutionCount = 0; //fixme
  if (n === 0) {
    return solutionCount;
  }

  //create instance of the board as newboard
  var solutionBoard = new Board({ n: n });
  // //recursion function: input whole board
  // var rowCount = 0;
  // for (var row = count; row < n; row++) {
  var searchNQueensSolutions = function(board, row) {
    //base case - if it has no child, last piece is placed using counter var
    if (row === n) {
      //return incremenent the solution count by one

      // let solutionString = JSON.stringify(solutionInstance);
      // console.log(solutionInstance);
      console.log(board.rows());
      solutionCount++;
      return;
    }
    //iterate each row and column to place piece (toggle)
    // for (var row = count; row < n; row++) {
    for (var col = 0; col < n; col++) {
      //place piece at the upper right corner as the starting point
      board.togglePiece(row, col);

      //if has no conflict
      if (!board.hasAnyQueensConflicts()) {
        // board.togglePiece(row, col);
        //recurse to place next piece, and increase the count by 1
        searchNQueensSolutions(board, row + 1);
      }
      //reset board
      //remove piece and move onto the next iteration, un-toggle
      board.togglePiece(row, col);
    }
  };
  searchNQueensSolutions(solutionBoard, 0);

  //edge case: min n with queen solutions is 4. double check

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // console.log(nonRepeating);
  return solutionCount;
};
