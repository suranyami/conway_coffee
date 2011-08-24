class Game
  constructor: ->
    @x = 100
    @y = 100
    @board = []
  
  init_board: ->
    for x in [0..@x]
      for y in [0..@y]
        console.log "#{x} #{y}"
        @board[x][y] = Math.floor(Math.rand * 2)

  print_board: ->
    result = ""
    for x in [0..@x]
      for y in [0..@y]
        result += @board[x][y] + "X"
      result += "<br/>"
    result

$(document).ready ->
  game = new Game
  game.init_board
  $("#banana").html(game.print_board)
