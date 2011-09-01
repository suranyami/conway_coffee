(function() {
  var Game;
  Game = (function() {
    var BLOCK, GLIDER, HEIGHT, SURROUND, WIDTH;
    SURROUND = [-1, 0, 1];
    GLIDER = [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    BLOCK = [[0, 0], [0, 1], [1, 0], [1, 1]];
    WIDTH = 50;
    HEIGHT = 60;
    function Game() {
      this.init_board();
    }
    Game.prototype.random_cell = function() {
      return Math.floor(Math.random() * 2) === 1;
    };
    Game.prototype.random_board = function() {
      var x, y;
      return this.board = (function() {
        var _results;
        _results = [];
        for (x = 0; 0 <= WIDTH ? x < WIDTH : x > WIDTH; 0 <= WIDTH ? x++ : x--) {
          _results.push((function() {
            var _results2;
            _results2 = [];
            for (y = 0; 0 <= HEIGHT ? y < HEIGHT : y > HEIGHT; 0 <= HEIGHT ? y++ : y--) {
              _results2.push(this.random_cell());
            }
            return _results2;
          }).call(this));
        }
        return _results;
      }).call(this);
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
      var x, y;
      this.board = (function() {
        var _results;
        _results = [];
        for (x = 0; 0 <= WIDTH ? x < WIDTH : x > WIDTH; 0 <= WIDTH ? x++ : x--) {
          _results.push((function() {
            var _results2;
            _results2 = [];
            for (y = 0; 0 <= HEIGHT ? y < HEIGHT : y > HEIGHT; 0 <= HEIGHT ? y++ : y--) {
              _results2.push(false);
            }
            return _results2;
          })());
        }
        return _results;
      })();
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
          if (!((i === 0 && j === 0) || (cur_y >= HEIGHT) || (cur_y < 0) || (cur_x >= WIDTH) || (cur_x < 0))) {
            if (this.board[cur_x][cur_y]) {
              result += 1;
            }
          }
        }
      }
      return result;
    };
    Game.prototype.print_table = function() {
      var cell, cells, row, rows;
      rows = (function() {
        var _i, _len, _ref, _results;
        _ref = this.board;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          row = _ref[_i];
          cells = (function() {
            var _j, _len2, _results2;
            _results2 = [];
            for (_j = 0, _len2 = row.length; _j < _len2; _j++) {
              cell = row[_j];
              _results2.push("<td class='" + (this.cell_css(cell)) + "'>&nbsp;</td>");
            }
            return _results2;
          }).call(this);
          _results.push("<tr>" + cells + "</tr>");
        }
        return _results;
      }).call(this);
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
      var x, y;
      return this.board = (function() {
        var _results;
        _results = [];
        for (x = 0; 0 <= WIDTH ? x < WIDTH : x > WIDTH; 0 <= WIDTH ? x++ : x--) {
          _results.push((function() {
            var _results2;
            _results2 = [];
            for (y = 0; 0 <= HEIGHT ? y < HEIGHT : y > HEIGHT; 0 <= HEIGHT ? y++ : y--) {
              _results2.push(this.should_live(x, y));
            }
            return _results2;
          }).call(this));
        }
        return _results;
      }).call(this);
    };
    Game.prototype.show_cell = function(x, y) {
      if (this.board[x][y]) {
        return "active";
      }
      return "dead";
    };
    Game.prototype.cell_css = function(val) {
      if (val) {
        return "active";
      }
      return "dead";
    };
    Game.prototype.show = function() {
      console.log(this.print_table());
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
    }), 1000);
  });
}).call(this);
