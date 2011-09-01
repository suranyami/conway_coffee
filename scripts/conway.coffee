class Game
  SURROUND = [-1, 0, 1]
  GLIDER = [ [0, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
  BLOCK = [ [0, 0], [0, 1], [1, 0], [1, 1]]
  
  WIDTH = 50
  HEIGHT = 60
  
  constructor: ->
    @init_board()
  
  random_cell: ->
    (Math.floor(Math.random() * 2) == 1)

  random_board: ->
    @board =  for x in [0...WIDTH]
      for y in [0...HEIGHT]
        @random_cell()
  
  predefined: ->
    for coords in GLIDER
      @board[coords[0] + 10][coords[1] + 10] = true

  init_board: ->
    @board = for x in [0...WIDTH]
      for y in [0...HEIGHT]
        false
    @random_board()
    
  neighbour_count: (x, y) ->
    result = 0
    for i in SURROUND
      cur_x = x + i
      for j in SURROUND
        cur_y = y + j
        unless (i == 0 and j == 0) or (cur_y >= HEIGHT) or (cur_y < 0) or (cur_x >= WIDTH) or (cur_x < 0)
          if @board[cur_x][cur_y]
            result += 1 
    result

  print_table: ->
    rows = for row in @board
      cells = for cell in row
        "<td class='#{@cell_css(cell)}'>&nbsp;</td>"
      "<tr>#{cells.join("")}</tr>"
    "<table>#{rows.join("")}</table>"

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
    @board = for x in [0...WIDTH]
      for y in [0...HEIGHT]
        @should_live(x, y)
  
  show_cell: (x, y) ->
    return "active" if @board[x][y]
    "dead"
  
  cell_css: (val) ->
    return "active" if val
    "dead"

  show: ->
    console.log @print_table()
    $("#output").html(@print_table())
    @new_board()
    
    
$(document).ready ->
  game = new Game
  game.init_board()
  game.show()
  setInterval((-> game.show()), 300)

