(function() {
  var Game;

  Game = (function() {
    var BLOCK, GLIDER, HEIGHT, SURROUND, WIDTH;

    SURROUND = [-1, 0, 1];

    GLIDER = [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]];

    BLOCK = [[0, 0], [0, 1], [1, 0], [1, 1]];

    WIDTH = 60;

    HEIGHT = 70;

    function Game() {
      this.init_board();
      this.random_board();
    }

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

    Game.prototype.random_cell = function() {
      return Math.floor(Math.random() * 2) === 1;
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
            if (this.board[cur_x][cur_y]) result += 1;
          }
        }
      }
      return result;
    };

    Game.prototype.format_cells = function(row) {
      var cell;
      return ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = row.length; _i < _len; _i++) {
          cell = row[_i];
          _results.push("<td class='" + (this.cell_css(cell)) + "'>&nbsp;</td>");
        }
        return _results;
      }).call(this)).join("");
    };

    Game.prototype.format_rows = function() {
      var row;
      return ((function() {
        var _i, _len, _ref, _results;
        _ref = this.board;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          row = _ref[_i];
          _results.push("<tr>" + (this.format_cells(row)) + "</tr>");
        }
        return _results;
      }).call(this)).join("");
    };

    Game.prototype.format_table = function() {
      return "<table>" + (this.format_rows()) + "</table>";
    };

    Game.prototype.live_message = function(x, y) {
      if (this.should_live(x, y)) return "L";
      return "&nbsp;";
    };

    Game.prototype.should_live = function(x, y) {
      var alive, neighbours;
      neighbours = this.neighbour_count(x, y);
      alive = this.board[x][y];
      if ((alive && (neighbours < 2 || neighbours > 3)) || (!alive && neighbours === 3)) {
        return !alive;
      }
      return alive;
    };

    Game.prototype.new_board = function() {
      var x, y, _results;
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
    };

    Game.prototype.show_cell = function(x, y) {
      if (this.board[x][y]) return "active";
      return "dead";
    };

    Game.prototype.cell_css = function(val) {
      if (val) return "active";
      return "dead";
    };

    Game.prototype.update = function() {
      $("#output").html(this.format_table());
      return this.board = this.new_board();
    };

    return Game;

  })();

  $(document).ready(function() {
    var game;
    game = new Game;
    game.update();
    return setInterval((function() {
      return game.update();
    }), 200);
  });

}).call(this);
