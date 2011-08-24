(function() {
  var Game;
  Game = (function() {
    function Game() {
      this.x = 100;
      this.y = 100;
      this.board = [];
    }
    Game.prototype.init_board = function() {
      var x, y, _ref, _results;
      _results = [];
      for (x = 0, _ref = this.x; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (y = 0, _ref2 = this.y; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
            console.log("" + x + " " + y);
            _results2.push(this.board[x][y] = Math.floor(Math.rand * 2));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    Game.prototype.print_board = function() {
      var result, x, y, _ref, _ref2;
      result = "";
      for (x = 0, _ref = this.x; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        for (y = 0, _ref2 = this.y; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          result += this.board[x][y] + "X";
        }
        result += "<br/>";
      }
      return result;
    };
    return Game;
  })();
  $(document).ready(function() {
    var game;
    game = new Game;
    game.init_board;
    return $("#banana").html(game.print_board);
  });
}).call(this);
