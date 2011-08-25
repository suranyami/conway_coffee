(function() {
  var Game;
  Game = (function() {
    var BLOCK, GLIDER, SURROUND;
    SURROUND = [-1, 0, 1];
    GLIDER = [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    BLOCK = [[0, 0], [0, 1], [1, 0], [1, 1]];
    function Game() {
      this.x = 50;
      this.y = 60;
      this.random_board();
    }
    Game.prototype.random_cell = function() {
      return Math.floor(Math.random() * 2) === 1;
    };
    Game.prototype.random_board = function() {
      var cell, row, x, y, _len, _ref, _results;
      this.board = new Array(this.x);
      _ref = this.board;
      _results = [];
      for (x = 0, _len = _ref.length; x < _len; x++) {
        row = _ref[x];
        this.board[x] = new Array(this.y);
        _results.push((function() {
          var _len2, _ref2, _results2;
          _ref2 = this.board[x];
          _results2 = [];
          for (y = 0, _len2 = _ref2.length; y < _len2; y++) {
            cell = _ref2[y];
            _results2.push(this.board[x][y] = this.random_cell());
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    Game.prototype.predefined = function() {
      var coords, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = GLIDER.length; _i < _len; _i++) {
        coords = GLIDER[_i];
        _results.push(this.board[coords[0] + 10][coords[1] + 10] = true);
      }
      return _results;
    };
    Game.prototype.init_board = function() {
      var cell, row, x, y, _len, _len2, _ref, _ref2;
      this.board = new Array(this.x);
      _ref = this.board;
      for (x = 0, _len = _ref.length; x < _len; x++) {
        row = _ref[x];
        this.board[x] = new Array(this.y);
        _ref2 = this.board[x];
        for (y = 0, _len2 = _ref2.length; y < _len2; y++) {
          cell = _ref2[y];
          this.board[x][y] = false;
        }
      }
      return this.random_board();
    };
    Game.prototype.neighbour_count = function(x, y) {
      var cur_x, cur_y, i, j, result, _i, _j, _len, _len2;
      result = 0;
      for (_i = 0, _len = SURROUND.length; _i < _len; _i++) {
        i = SURROUND[_i];
        cur_x = x + i;
        for (_j = 0, _len2 = SURROUND.length; _j < _len2; _j++) {
          j = SURROUND[_j];
          cur_y = y + j;
          if (!((i === 0 && j === 0) || (cur_y >= this.y) || (cur_y < 0) || (cur_x >= this.x) || (cur_x < 0))) {
            if (this.board[cur_x][cur_y]) {
              result += 1;
            }
          }
        }
      }
      return result;
    };
    Game.prototype.print_table = function() {
      var cell, cells, row, rows, x, y, _len, _len2, _ref, _ref2;
      rows = "";
      _ref = this.board;
      for (x = 0, _len = _ref.length; x < _len; x++) {
        row = _ref[x];
        cells = "";
        _ref2 = this.board[x];
        for (y = 0, _len2 = _ref2.length; y < _len2; y++) {
          cell = _ref2[y];
          cells += "<td class='" + (this.show_cell(x, y)) + "'>&nbsp;</td>";
        }
        rows += "<tr>" + cells + "</tr>";
      }
      return "<table>" + rows + "</table>";
    };
    Game.prototype.live_message = function(x, y) {
      if (this.should_live(x, y)) {
        return "L";
      }
      return "&nbsp;";
    };
    Game.prototype.toggle = function(x, y) {
      var new_val;
      return new_val = !this.board[x][y];
    };
    Game.prototype.should_live = function(x, y) {
      var alive, neighbours, overpopulated, reproducing, underpopulated;
      neighbours = this.neighbour_count(x, y);
      alive = this.board[x][y];
      underpopulated = alive && neighbours < 2;
      overpopulated = alive && neighbours > 3;
      reproducing = !alive && neighbours === 3;
      if (underpopulated || overpopulated || reproducing) {
        return !this.board[x][y];
      }
      return this.board[x][y];
    };
    Game.prototype.new_board = function() {
      var cell, new_board, row, x, y, _len, _len2, _ref;
      new_board = new Array(this.x);
      for (x = 0, _len = new_board.length; x < _len; x++) {
        row = new_board[x];
        new_board[x] = new Array(this.y);
        _ref = new_board[x];
        for (y = 0, _len2 = _ref.length; y < _len2; y++) {
          cell = _ref[y];
          new_board[x][y] = this.should_live(x, y);
        }
      }
      return this.board = new_board;
    };
    Game.prototype.show_cell = function(x, y) {
      if (this.board[x][y]) {
        return "active";
      }
      return "dead";
    };
    Game.prototype.show = function() {
      $("#output").html(this.print_table());
      return this.new_board();
    };
    return Game;
  })();
  $(document).ready(function() {
    var game;
    game = new Game;
    game.init_board();
    game.show();
    return setInterval((function() {
      return game.show();
    }), 100);
  });
}).call(this);
