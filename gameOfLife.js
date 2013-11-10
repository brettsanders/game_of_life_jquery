var dimension = 15;
var chanceOfLiveCell = 0.5;
// cache table and cells, don't load all the time
var table;
var cells;

$(document).ready(function(){
  table = $('#main');
  initializeGame();
  // cache the cells
  cells = table.find('td');
  placeRandomCells();
});

function initializeGame(){
  // create table of dimension x dimension
  var trHtml = [];
  for (var y = 0; y < dimension; y++) {
    trHtml.push('<tr>');
    for (var x = 0; x < dimension; x++) {
      trHtml.push('<td>&nbsp;</td>');
    }
    trHtml.push('</tr>');
  }
  trHtml = trHtml.join('');
  // instead of string, jQuery node to be used
  table.append($(trHtml));
}

function placeRandomCells(){
  for (var y = 0; y < dimension; y++) {
    for (var x = 0; x < dimension; x++) {
      var cell = getCell(x, y);
      if (Math.random () > chanceOfLiveCell) {
        cell.addClass('alive');
      } else {
        cell.removeClass('alive');
      }
    }
  }
}

function getCell(x, y){
  // board in theory endless, make sure to come back
  // don't actually need these 4 lines to work
  if (x >= dimension) { x = 0; }
  if (y >= dimension) { y = 0; }
  if (x < 0) { x = dimension - 1; }
  if (y < 0) { y = dimension - 1; }
  // cells is a 1 dimensional array of all cells
  // loops by a factor of y
  return $(cells[y * dimension + x]);
}

function playGame(){
  playGeneration();
}

function playGeneration(){
  prepareNextGeneration();
  renderNextGeneration();
}

function prepareNextGeneration(){
  for (var y = 0; y < dimension; y++) {
    for (var x = 0; x < dimension; x++) {
      var cell = getCell(x, y);
      var neighbours = getLiveNeighbourCount(x, y);

      // add 'isalive' attribute to store state for rendering
      // defaults to false, implicitly implements rules 1 and 3
      // kills live cells as if by under-population or overcrowding
      cell.attr('isalive', 'false');

      // alive branch
      if (cell.attr('class') === 'alive') {
        // rule 2: live cells with 2 or 3 neighbours live on
        if (neighbours === 2 || neighbours === 3) {
          cell.attr('isalive', 'true');
        }
      }
      // dead branch
      // rule 4: any dead cell with exactly 3 live neighbours
      // becomes a live cell, as if by reproduction
      else if (neighbours === 3) {
        cell.attr('isalive', 'true');
      }

    }
  }
}

function renderNextGeneration(){

}


