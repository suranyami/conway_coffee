class Game
  constructor: ->
    @x = 10
    @y = 10
    @board = new Array(@x)
  
  random_cell: ->
    Math.floor(Math.random() * 2)

  init_board: ->
    for x in [0..@x - 1]
      @board[x] = new Array(@y)
      for y in [0..@y - 1]
        @board[x][y] = this.random_cell()
    console.log(@board)

  neighbour_count: (x, y) ->
    result = 0
    for i in [-1, 0, 1]
      cur_x = x + i
      cur_x = 0 if cur_x >= @x
      cur_x = @x - 1 if cur_x <= 0
      for j in [-1, 0, 1]
        cur_y = y + i
        cur_y = 0 if cur_y >= @y
        cur_y = @y - 1 if cur_y <= 0
        result += @board[cur_x][cur_y] unless i = 0 and j = 0

  print_board: ->
    result = ""
    for x in [0..@x - 1]
      result += "<tr>"
      for y in [0..@y - 1]
        count = this.neighbour_count(x, y)
        result += "<td>#{count}</td>"
      result += "</tr>"
    "<table>#{result}</table>"
    
  live_or_die: (x, y) ->
    neighbour_count(x, y)
              
$(document).ready ->
  game = new Game
  game.init_board()
  
  
  $("#banana").html(game.print_board())
