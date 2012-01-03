class Game
  SURROUND = [-1, 0, 1]
  GLIDER = [ [0, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
  BLOCK = [ [0, 0], [0, 1], [1, 0], [1, 1]]
  
  WIDTH = 60
  HEIGHT = 70
  
  constructor: ->
    @init_board()
    @random_board()
  
   
  random_board: -> @board = (@random_cell() for y in [0...HEIGHT] for x in [0...WIDTH])
  
  random_cell: -> (Math.floor(Math.random() * 2) == 1)
  
  predefined: ->
    for coords in GLIDER
      @board[coords[0] + 10][coords[1] + 10] = true

  neighbour_count: (x, y) ->
    result = 0
    for i in SURROUND
      cur_x = x + i
      for j in SURROUND
        cur_y = y + j
        unless (i == 0 and j == 0) or
          (cur_y >= HEIGHT) or (cur_y < 0) or
          (cur_x >= WIDTH) or (cur_x < 0)
            if @board[cur_x][cur_y]
              result += 1 
    result

  format_cells: (row) -> ("<td class='#{@cell_css(cell)}'>&nbsp;</td>" for cell in row).join("")
  format_rows: () -> ("<tr>#{@format_cells(row)}</tr>" for row in @board).join("")
  format_table: -> "<table>#{@format_rows()}</table>"

  live_message: (x, y) ->
    return "L" if @should_live(x, y)
    "&nbsp;"

  should_live: (x, y) ->
    neighbours = @neighbour_count(x, y)
    alive = @board[x][y]
    return !alive if (alive and (neighbours < 2 or neighbours > 3)) or
      (!alive and neighbours == 3)
    alive
  
  new_board: -> (@should_live(x, y) for y in [0...HEIGHT] for x in [0...WIDTH])
      
  show_cell: (x, y) ->
    return "active" if @board[x][y]
    "dead"
  
  cell_css: (val) ->
    return "active" if val
    "dead"

  update: ->
    $("#output").html(@format_table())
    @board = @new_board()
    
$(document).ready ->
  game = new Game
  game.update()
  setInterval((-> game.update()), 200)

