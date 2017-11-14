/**

Bitsler dice gambling bot
Degressive martingale

/!\ You can't beat the house ! You will loose everything ! 
For educational purposes only

  __  __           _        _             _____                        
 |  \/  |         | |      | |           |  __ \                       
 | \  / | __ _  __| | ___  | |__  _   _  | |  | | __ _ _   _ _ __ ___  
 | |\/| |/ _` |/ _` |/ _ \ | '_ \| | | | | |  | |/ _` | | | | '_ ` _ \ 
 | |  | | (_| | (_| |  __/ | |_) | |_| | | |__| | (_| | |_| | | | | | |
 |_|  |_|\__,_|\__,_|\___| |_.__/ \__, | |_____/ \__,_|\__, |_| |_| |_|
                                   __/ |                __/ |          
                                  |___/                |___/ 

**/

/** 
Multiply bet amount
@param Float coeff - the coefficient multiplied
*/

var initialBet = 0.00000001; // Initial bet value. Change it to what fits the best  

function multiplyBet(coeff){
	$("#amount").val(parseFloat($("#amount").val())*coeff);
}

function setBet(value){
	$("#amount").val(value);
}

/** 
Rolls the dice
*/
function roll(){
	if (initialBet == 0) return;
	
	$("#btn-bet-dice").click();
}

setBet(initialBet);

var bet = parseFloat($("#amount").val()); // Stocking current bet value
var nbLoose = 0; // Setting number of looses to zero
var totalProfit = 0; // Total profit made

var counter = 8;
var step = 1;

// Restarts the sequence every 2000ms
setInterval(function() {
	if (initialBet == 0) return;
	
	console.log('Rolling...\n');

	// Waiting 500ms after rolling the dice in case of lag
	setTimeout(function(){
		roll();
	},100);

	// Waiting for the page to be fully loaded
	$(document).ready(function(){
		if (initialBet == 0) return;
		
		var profit = $('#history-my-bets-dice tr').first().find('td:last').text(); // Getting current profit

		// if loose
		if(profit.includes('-')){
			nbLoose++; // Increment looses
			counter--;
			if (0 == counter) {
				counter = 4;
				step++;
				if (3 == step) {
					setBet(initialBet); // Reseting bet
					counter = 8;
					step = 1;
					console.log('Game Over');
					console.log('Profit: ' + profit + '. nbLoose = ' + nbLoose + '\n');
					initialBet = 0;
					return;
				}
				multiplyBet(2); // Multiplying bet twice
			}
			console.log('Profit: ' + profit + '. nbLoose = ' + nbLoose + '\n');
		}
		// if win
		else{
			nbLoose = 0; // Reseting looses
			console.log('Profit: ' + profit + '. Bet returned to ' + bet + '\n');
			setBet(initialBet); // Reseting bet
			counter = 8;
			step = 1;
		}

		totalProfit += parseFloat(profit); // Increases current profit to total profit
		console.log('Total profit: ' +  totalProfit + '\n');
	});
}, 400);


