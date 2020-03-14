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

  // var Tree = function(val) {
  //   this.value = val;
  //   this.children = [];
  // };

  // Tree.prototype.addChild = function(value) {
  //   let child = new Tree(value);
  //   this.children.push(child);
  // };

  // var solutionCount = 0;
  // let solutionBoard = new Board({ n: n });
  // let root = new Tree(solutionBoard);
  // let count = 0;

  // // if (n === 1) {
  // //   solutionCount++;
  // // }

  // let rookPlacer = function(parentTree) {
  //   //if parent tree has no kids then return
  //   //parentTree.count === n;
  //   if (count === n) {
  //     return;
  //   }

  //   for (let row = 0; row < n; row++) {
  //     //count++;

  //     for (var col = 0; col < n; col++) {
  //       let child = new Tree(new Board({ n: n }));
  //       console.log(child);

  //       child.value.togglePiece(row, col);
  //       if (!child.hasAnyRooksConflicts) {
  //         count++;
  //         parentTree.children.push(child);
  //         rookPlacer(child);
  //       }
  //     }
  //   }
  //   let increment = parentTree.children.length;
  //   solutionCount += increment;
  // };

  // rookPlacer(root);
  //Each Parent: Row 0[0] until row 0[n-1]

  //Recrusion/helper function will take in each parent

  // solutionBoard.togglePiece(i?, i?)
  //   //base case if hasNoConflicts -> count++

  //   //recursion
  //   if (!this.hasAnyRooksConflicts) {
  //     rookPlacer(....)
  //   } else {
  //     solutionBoard.togglePiece(?, ?),
  //     solutionBoard.togglePiece(same row?, next col?)
  //     recurse?
  //   }

  //if no conflict, then it's a child so recurse

  // //access matrix: arrays of arrays via .rows
  // let matrix = solutionBoard.rows();
  // let n = solutionBoard.get('n');

  // //start with row 0. recursed starting at each parent: col indices of row 0
  //   //place first piece at col 1

  //   //hasAnyRooksConflicts
  // for (let i = 0; i < solutionBoard[0].length; i++) {

  // }
  // let rookPlacer = function (solutionBoard) {
  //   //new board
  //   //parent

  //   //if there is no conflict, then add child
  //   //recursive children

  //   //the last row children would be the # of solutions for that parent
  //   for (let i = 0; i < n; i++) {

  //   }
  // }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  let solutionBoard = new Board({ n: n }); //fixme
  let solution = solutionBoard.rows();

  console.log(
    'Single solution for ' + n + ' queens:',
    JSON.stringify(solution)
  );
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  //edge case: min n with queen solutions is 4. double check

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
