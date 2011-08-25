class Game
  constructor: ->
    @x = 15
    @y = 15
    @board = new Array(@x)
  
  random_cell: ->
    Math.floor(Math.random() * 2)

  init_board: ->
    for x in [0..@x - 1]
      @board[x] = new Array(@y)
      for y in [0..@y - 1]
        @board[x][y] = @random_cell()
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
        result += @board[cur_x][cur_y] unless (i == 0 and j == 0)
    result

  print_counts: ->
    result = ""
    for x in [0..@x - 1]
      result += "<tr>"
      for y in [0..@y - 1]
        count = @neighbour_count(x, y)
        result += "<td>#{count}</td>"
      result += "</tr>"
    "<table>#{result}</table>"

  print_input: ->
    result = ""
    for x in [0..@x - 1]
      result += "<tr>"
      for y in [0..@y - 1]
        result += "<td>#{@board[x][y]}</td>"
      result += "</tr>"
    "<table>#{result}</table>"

  print_output: ->
    result = ""
    for x in [0..@x - 1]
      result += "<tr>"
      for y in [0..@y - 1]
        val = " "
        val = "&#9689;" if @live_or_die(x,y)
        result += "<td>#{val}</td>"
      result += "</tr>"
    "<table>#{result}</table>"

  should_live: (x, y) ->
    count = @neighbour_count(x, y)
    if @board[x][y] == 1
      if 2 > count > 3
          return false
      else
          return true
    else
      return true if count == 3
    false
  
  new_board: ->
    new_board = new Array
    for x in [0..@x - 1]
      new_board[x] = new Array(@y)
      for y in [0..@y - 1]
        val = 0
        val = 1 if @should_live(x,y)
        new_board[x][y] = val
    @board = new_board
    console.log("new_board")
  
  show: ->
    $("#output").html(@print_output())
    @new_board()
    
    
$(document).ready ->
  game = new Game
  game.init_board()
  setInterval((-> game.show()), 100)

