(function() {
  var Game;
  Game = (function() {
    function Game() {
      this.x = 100;
      this.y = 100;
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
      var cur_x, cur_y, i, j, result, _i, _j, _len, _len2, _ref, _ref2;
      result = 0;
      _ref = [-1, 0, 1];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        cur_x = x + i;
        if (cur_x >= this.x) {
          cur_x = 0;
        }
        if (cur_x <= 0) {
          cur_x = this.x - 1;
        }
        _ref2 = [-1, 0, 1];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          j = _ref2[_j];
          cur_y = y + i;
          if (cur_y >= this.y) {
            cur_y = 0;
          }
          if (cur_y <= 0) {
            cur_y = this.y - 1;
          }
          if (!(i === 0 && j === 0)) {
            result += this.board[cur_x][cur_y];
          }
        }
      }
      return result;
    };
    Game.prototype.print_counts = function() {
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
    Game.prototype.print_input = function() {
      var result, x, y, _ref, _ref2;
      result = "";
      for (x = 0, _ref = this.x - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        result += "<tr>";
        for (y = 0, _ref2 = this.y - 1; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          result += "<td>" + this.board[x][y] + "</td>";
        }
        result += "</tr>";
      }
      return "<table>" + result + "</table>";
    };
    Game.prototype.print_output = function() {
      var result, val, x, y, _ref, _ref2;
      result = "";
      for (x = 0, _ref = this.x - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        result += "<tr>";
        for (y = 0, _ref2 = this.y - 1; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          val = " ";
          if (this.live_or_die(x, y)) {
            val = "&#9689;";
          }
          result += "<td>" + val + "</td>";
        }
        result += "</tr>";
      }
      return "<table>" + result + "</table>";
    };
    Game.prototype.live_or_die = function(x, y) {
      var count;
      count = this.neighbour_count(x, y);
      if (this.board[x][y] === 1) {
        switch (false) {
          case !(count < 2):
            return false;
          case !(count > 3):
            return false;
          default:
            return true;
        }
      } else {
        if (count === 3) {
          return true;
        }
      }
      return false;
    };
    Game.prototype.new_board = function() {
      var new_board, val, x, y, _ref, _ref2;
      new_board = new Array;
      for (x = 0, _ref = this.x - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        new_board[x] = new Array(this.y);
        for (y = 0, _ref2 = this.y - 1; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          val = 0;
          if (this.live_or_die(x, y)) {
            val = 1;
          }
          new_board[x][y] = val;
        }
      }
      this.board = new_board;
      return console.log("new_board");
    };
    Game.prototype.show = function() {
      $("#output").html(this.print_output());
      return this.new_board();
    };
    return Game;
  })();
  $(document).ready(function() {
    var game;
    game = new Game;
    game.init_board();
    return setInterval((function() {
      return game.show();
    }), 100);
  });
}).call(this);
