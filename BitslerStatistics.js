var roll;

function getRoll() {
	return parseFloat($('#history-my-bets-dice tr').first().find('td:last').prev().text());
}

var chance = 0.1;
var counterMax = 350;
var counter = 0;

var profit = parseFloat($('#auto_stats_profit').text());

$('#history-my-bets-dice').unbind();

$('#history-my-bets-dice').bind("DOMSubtreeModified", function(event) {
  console.clear();
  
  if ($(event.currentTarget)) {
    roll = getRoll();
    
    if (roll >= chance) {
      counter++;
    } else {
      counter = 0;
    }
    
    if (counter > counterMax) {
      console.clear();
      console.log(counter);
      $('#btn-bet-stop-pilot-dice').trigger('click');
    }
  }
 });