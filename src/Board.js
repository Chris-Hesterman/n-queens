// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {
  window.Board = Backbone.Model.extend({
    initialize: function(params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log(
          'Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:'
        );
        console.log(
          '\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: grey;'
        );
        console.log(
          '\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: blue;',
          'color: black;',
          'color: grey;'
        );
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = +!this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(
          this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)
        ) ||
        this.hasMinorDiagonalConflictAt(
          this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex)
        )
      );
    },

    hasAnyQueensConflicts: function() {
      return (
        this.hasAnyRooksConflicts() ||
        this.hasAnyMajorDiagonalConflicts() ||
        this.hasAnyMinorDiagonalConflicts()
      );
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex &&
        rowIndex < this.get('n') &&
        0 <= colIndex &&
        colIndex < this.get('n')
      );
    },

    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //create row variable for the input index
      let row = this.get(rowIndex);
      let count = 0;

      //iterate through each square of the row
      for (let square of row) {
        //there is a piece at this square, increment count by 1
        if (square === 1) {
          count++;
        }
      }
      //true if count is more than one
      return count > 1; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //iterate through n rows
      for (let i = 0; i < this.get('n'); i++) {
        //use method to check for conflict at each row
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    //at specific index of each row
    hasColConflictAt: function(colIndex) {
      //this.get(rowIndex)[colIndex]
      //n = this.get('n');

      //number of rows (n)
      let n = this.get('n');
      let count = 0;

      //iterate each row for colIndex (each column)
      for (let i = 0; i < n; i++) {
        //this.get[i] is each row
        if (this.get(i)[colIndex] === 1) {
          count++;
        }
      }
      return count > 1; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //variable for #
      let n = this.get('n');

      //iterate each row
      for (var i = 0; i < n; i++) {
        //check each column at each row
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //check bottom right to see if there is a piece

      //get size of matrix, n rows/columns
      let n = this.get('n');

      //count variable for pieces
      let count;

      //if majorDiagonalColumnIndexAtFirstRow is positive
      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        //iterating through each row
        count = 0;
        for (var r = 0; r < n - 1; r++) {
          //var row at that index
          let row = this.get(r);
          //if there's a piece at that row with that index then increase count
          if (row[majorDiagonalColumnIndexAtFirstRow] === 1) {
            count++;
          }
          //increment index for the next
          majorDiagonalColumnIndexAtFirstRow++;
        }
      } else {
        count = 0;
        //r will now be starting row index, needs to be positive
        let r2 = Math.abs(majorDiagonalColumnIndexAtFirstRow);

        //starting index for column
        let col = 0;

        //iterate each row
        for (r2; r2 < n; r2++) {
          //access to row
          let row2 = this.get(r2);

          //within the row , start index will be 0
          if (row2[col] === 1) {
            count++;
          }
          col++;
        }
      }
      return count > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //get the matrix, this will give us the n rows/columns
      let n = this.get('n');

      //create a lower limit for majorDiagonalColumnIndexAtFirstRow
      let lowerLimit = -(n - 2);
      //create an upper limit for majorDiagonalColumnIndexAtFirstRow
      let upperLimit = n - 2;

      //for loop starts at row n-2, then decrements
      for (lowerLimit; lowerLimit <= upperLimit; lowerLimit++) {
        if (this.hasMajorDiagonalConflictAt(lowerLimit)) {
          return true;
        }
      }
      return false; // fixme
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //row needs to increment starting at 0
      //col needs to decrement
      //get size of matrix, n rows/columns
      let n = this.get('n');

      //count variable for pieces
      let count = 0;

      if (minorDiagonalColumnIndexAtFirstRow <= n - 1) {
        //iterating through each row
        for (var r = 0; r < n; r++) {
          //var row at that index
          let row = this.get(r);
          //if there's a piece at that row with that index then increase count
          if (row[minorDiagonalColumnIndexAtFirstRow] === 1) {
            count++;
          }
          //increment index for the next
          minorDiagonalColumnIndexAtFirstRow--;
        }
      } else {
        //start with row [minor - (n - 1)], and column index [n-1]
        //row increment
        //column decrement
        count = 0;
        //r will now be starting row index
        let r2 = minorDiagonalColumnIndexAtFirstRow - (n - 1);

        //starting index for column
        let col = n - 1;

        //iterate each row
        for (r2; r2 < n; r2++) {
          //access to row
          let row2 = this.get(r2);

          //within the row , start index will be n - 1
          if (row2[col] === 1) {
            count++;
          }
          col--;
        }
      }

      return count > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //start at 0 and end at n + 1

      //get the matrix, this will give us the n rows/columns
      let n = this.get('n');

      //create a lower limit for minorDiagonalColumnIndexAtFirstRow
      let lowerLimit = 1;
      //create an upper limit for minorDiagonalColumnIndexAtFirstRow
      let upperLimit = n + 1;

      //for loop starts at row n-2, then decrements
      for (lowerLimit; lowerLimit <= upperLimit; lowerLimit++) {
        if (this.hasMinorDiagonalConflictAt(lowerLimit)) {
          return true;
        }
      }
      return false; // fixme
    }
    /*--------------------  End of Helper Functions  ---------------------*/
  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };
})();
