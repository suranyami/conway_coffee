(function() {
  var Game;
  Game = (function() {
    function Game() {
      this.x = 10;
      this.y = 10;
      this.board = new Array(this.x);
    }
    Game.prototype.random_cell = function() {
      return Math.floor(Math.random() * 2);
    };
    Game.prototype.init_board = function() {
      var x, y, _ref, _ref2;
      for (x = 0, _ref = this.x - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        this.board[x] = new Array(this.y);
        for (y = 0, _ref2 = this.y - 1; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          this.board[x][y] = this.random_cell();
        }
      }
      return console.log(this.board);
    };
    Game.prototype.neighbour_count = function(x, y) {
      var cur_x, cur_y, i, j, result, _i, _len, _ref, _results;
      result = 0;
      _ref = [-1, 0, 1];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        cur_x = x + i;
        if (cur_x >= this.x) {
          cur_x = 0;
        }
        if (cur_x <= 0) {
          cur_x = this.x - 1;
        }
        _results.push((function() {
          var _j, _len2, _ref2, _results2;
          _ref2 = [-1, 0, 1];
          _results2 = [];
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            j = _ref2[_j];
            cur_y = y + i;
            if (cur_y >= this.y) {
              cur_y = 0;
            }
            if (cur_y <= 0) {
              cur_y = this.y - 1;
            }
            _results2.push(!(i = 0 && (j = 0)) ? result += this.board[cur_x][cur_y] : void 0);
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    Game.prototype.print_board = function() {
      var count, result, x, y, _ref, _ref2;
      result = "";
      for (x = 0, _ref = this.x - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        result += "<tr>";
        for (y = 0, _ref2 = this.y - 1; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          count = this.neighbour_count(x, y);
          result += "<td>" + count + "</td>";
        }
        result += "</tr>";
      }
      return "<table>" + result + "</table>";
    };
    Game.prototype.live_or_die = function(x, y) {
      return neighbour_count(x, y);
    };
    return Game;
  })();
  $(document).ready(function() {
    var game;
    game = new Game;
    game.init_board();
    return $("#banana").html(game.print_board());
  });
}).call(this);
