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
      var row = this.get(rowIndex);
      var pieceCount = 0;

      for (var square of row) {
        //there is a piece at this square, increment piecepieceCount by 1
        if (square === 1) {
          pieceCount++;
        }
      }
      //true if pieceCount is more than one
      return pieceCount > 1;
    },
    //time complexity O(n)

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //iterate through n rows
      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },
    //time complexity O(n)

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    //at specific index of each row
    hasColConflictAt: function(colIndex) {
      var n = this.get('n');
      var pieceCount = 0;

      //iterate each row for colIndex (each column)
      for (var i = 0; i < n; i++) {
        //this.get[i] is each row
        if (this.get(i)[colIndex] === 1) {
          pieceCount++;
        }
      }
      return pieceCount > 1; // fixme
    },
    //time complexity O(n)

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var n = this.get('n');

      //iterate each row
      for (var i = 0; i < n; i++) {
        //check each column at each row
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },
    //time complexity O(n)

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var n = this.get('n');

      var pieceCount = 0;

      //if majorDiagonalColumnIndexAtFirstRow is positive
      for (var r = 0; r < n; r++) {
        var row = this.get(r);
        //if there's a piece at that row with that index then increase pieceCount
        if (row[majorDiagonalColumnIndexAtFirstRow] === 1) {
          pieceCount++;
        }
        //increment index for the next
        majorDiagonalColumnIndexAtFirstRow++;
      }

      return pieceCount > 1;
    },
    ////time complexity O(n)

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = this.get('n');
      //create an upper limit for majorDiagonalColumnIndexAtFirstRow
      var upperLimit = n - 2;

      for (var topRowIndex = 2 - n; topRowIndex <= upperLimit; topRowIndex++) {
        if (this.hasMajorDiagonalConflictAt(topRowIndex)) {
          return true;
        }
      }
      return false;
    },
    //time complexity O(n)

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var n = this.get('n');
      var pieceCount = 0;

      //iterating through each row
      for (var rowIndex = 0; rowIndex < n; rowIndex++) {
        var row = this.get(rowIndex);
        //if there's a piece at that row with that index then increase pieceCount
        if (row[minorDiagonalColumnIndexAtFirstRow] === 1) {
          pieceCount++;
        }
        //decrement index for the next
        if (minorDiagonalColumnIndexAtFirstRow > -1) {
          minorDiagonalColumnIndexAtFirstRow--;
        }
      }

      return pieceCount > 1;
    },
    //time complexity O(n)

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.get('n');
      //create an upper limit for minorDiagonalColumnIndexAtFirstRow
      var upperLimit = n + (n - 2);

      //for loop starts at row n-2, then decrements
      for (var i = 1; i <= upperLimit; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }
    //time complexity O(n)
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
