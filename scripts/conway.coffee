class Game
  SURROUND = [-1, 0, 1]
  GLIDER = [ [0, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
  BLOCK = [ [0, 0], [0, 1], [1, 0], [1, 1]]
  
  constructor: ->
    @x = 50
    @y = 60
    @random_board()
  
  random_cell: ->
    (Math.floor(Math.random() * 2) == 1)

  random_board: ->
    @board = new Array(@x)
    for row, x in @board
      @board[x] = new Array(@y)
      for cell, y in @board[x]
        @board[x][y] = @random_cell()
  
  predefined: ->
    for coords in GLIDER
      @board[coords[0] + 10][coords[1] + 10] = true

  init_board: ->
    @board = new Array(@x)
    for row, x in @board
      @board[x] = new Array(@y)
      for cell, y in @board[x]
        @board[x][y] = false
    @random_board()
    
  neighbour_count: (x, y) ->
    result = 0
    for i in SURROUND
      cur_x = x + i
      for j in SURROUND
        cur_y = y + j
        unless (i == 0 and j == 0) or (cur_y >= @y) or (cur_y < 0) or (cur_x >= @x) or (cur_x < 0)
          if @board[cur_x][cur_y]
            result += 1 
    result

  print_table: ->
    rows = ""
    for row, x in @board
      cells = ""
      for cell, y in @board[x]
        # cells += "<td class='#{@show_cell(x, y)}'>#{@neighbour_count(x, y)}:#{@live_message(x, y)}</td>"
        cells += "<td class='#{@show_cell(x, y)}'>&nbsp;</td>"
      rows += "<tr>#{cells}</tr>"
    "<table>#{rows}</table>"

  
  live_message: (x, y) ->
    return "L" if @should_live(x, y)
    "&nbsp;"

  toggle: (x, y) ->
    new_val = !@board[x][y]

  should_live: (x, y) ->
    neighbours = @neighbour_count(x, y)
    alive = @board[x][y]
    underpopulated = alive and neighbours < 2
    overpopulated  = alive and neighbours > 3
    reproducing    = !alive and neighbours == 3
    return !@board[x][y] if underpopulated || overpopulated || reproducing
    @board[x][y]
  
  new_board: ->
    new_board = new Array(@x)
    for row, x in new_board
      new_board[x] = new Array(@y)
      for cell, y in new_board[x]
        new_board[x][y] = @should_live(x, y)
    @board = new_board
  
  show_cell: (x, y) ->
    return "active" if @board[x][y]
    "dead"
  
  
  show: ->
    $("#output").html(@print_table())
    @new_board()
    
    
$(document).ready ->
  game = new Game
  game.init_board()
  game.show()
  setInterval((-> game.show()), 100)

