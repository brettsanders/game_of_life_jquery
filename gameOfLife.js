var dimension = 15;
var chanceOfLiveCell = 0.5;
// cache table and cells, don't load all the time
var table;
var cells;

$(document).ready(function(){
  table = $('#main');
  initializeGame();
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