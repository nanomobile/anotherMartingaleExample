
// 20:32:17.193 VM364:325 76.34  					// #Bet = 163716
// 20:32:17.194 VM364:326 Counter Low = 8779
// 20:32:17.194 VM364:327 Counter High = 52003

// 6179a847e0c8ae6a4363ffe7cc60c3b066050ecb6fe1ec73f52cbfcc4c50b9d401d2d7ca36406c42803f063a6a68bfceeee32c442f300f12f40fe898906aa2ea    // server seed hashed
// d70bfb877483b4af4165e2da812bb960cc1e0705   // client seed

var initialBet = 0.00000001 * 1; // Initial bet value. Change it to what fits the best

var speed = 10;

var balanceMin = 0;
var balanceMax = 8000000;

var chance = 0.01;
var counterMax = 148400;
var initialCoeff = 1;
var coeff = 10;
var multiplier = 10;
var counterLow = 0;
var counterHigh = 0;

var chance2 = 49.50;
var counterMax2 = 27;
var initialCoeff2 = 1;
var coeff2 = 1;
var multiplier2 = 2;
var counterLow2 = 0;
var counterHigh2 = 0;

var chance3 = 33;
var counterMax3 = 37;
var initialCoeff3 = 1;
var coeff3 = 1;
var multiplier3 = 2;
var counterLow3 = 0;
var counterHigh3 = 0;

var isLow = true;

var initialChance = 50;

var betLimit = 512;

var winMax = 1;
var win = 0;

setBet(initialBet);
//setPayout(1.1);
setChance(initialChance);

function multiplyBet(coeff){
	$("#amount").val(parseFloat($("#amount").val()) * coeff);
}

function getBet() {
	return parseFloat($("#amount").val());	
}

function setBet(value){
	$("#amount").val(value);
}

function changeCondition() {
	isLow = !isLow;
	roll_by_condition();
}

function setChance(value) {
	$("#editable-chance").text(value + "%");
	$("#editable-chance-field").val(value);
	roll_by_chance(value);
}

function setPayout(value) {
	$("#editable-payout").text(value + "x");
	$("#editable-payout-field").val(value);
	roll_by_payout(value);
}

function getChance() {
	return parseFloat($("#editable-chance-field").val());
}

function getPayout() {
	return parseFloat($("#editable-payout-field").val());
}

function getProfit() {
	return parseFloat($('#history-my-bets-dice tr').first().find('td:last').text());	
}

function getRoll() {
	return parseFloat($('#history-my-bets-dice tr').first().find('td:last').prev().text());
}

function getBalance() {
	return parseFloat($('#balances-lg').first().text());	
}

function roll(){
	if (getBalance() <= 0) return;
	
	if (initialBet == 0) return;
	
	if (getBalance() >= 0.00000001 * balanceMax || getBalance() <= 0.00000001 * balanceMin) {
		stop();	
		return;
	}

	if (getBet() > betLimit || getBet() > getBalance()) {
		setBet(initialBet);
		return;
	}
	
	$("#btn-bet-dice").click();
}

function stop() {
	initialBet = 0;	
}

setInterval(function() {
	if (getBalance() <= 0) return;
	
	if (initialBet == 0) return;
	
	if (getBalance() >= 0.00000001 * balanceMax || getBalance() <= 0.00000001 * balanceMin) {
		stop();	
		return;
	}

	if (getBet() > betLimit || getBet() > getBalance()) {
		setBet(initialBet);
		return;
	}
	
	setTimeout(function(){
		roll();
	},speed);

	$(document).ready(function(){
		if (getBalance() <= 0) return;
	
		if (initialBet == 0) return;
	
		if (getBalance() >= 0.00000001 * balanceMax || getBalance() <= 0.00000001 * balanceMin) {
			stop();	
			return;
		}

		if (getBet() > betLimit || getBet() > getBalance()) {
			setBet(initialBet);
			return;
		}

		// setChance(Math.floor((Math.random() * initialChance) + 0.01));

		if (getChance() > 0.01) {
			if (getChance() > 1) {
				setChance(getChance() - 0.1);
			} else {
				setChance(getChance() - 0.1);
			}
		} else if (0.01 >= getChance()) {
			setChance(initialChance);
		}

		// if (getProfit() > 0) {
		// 	if (getChance() < initialChance) {
		// 		setChance(getChance() * 2);
		// 	} else {
		// 		setChance(0.01);
		// 	}
		// } else {
		// 	if (getChance() >= 0.01) {
		// 		setChance(getChance() / 2);
		// 	} else {
		// 		setChance(initialChance);
		// 	}
		// }

		return;
		
		if (getProfit() > 0 && getChance() == chance) {
			win++;
			
			setBet(initialBet);

			if (win >= winMax) {
				setChance(initialChance);
			}
		} else if (getProfit() < 0 && getChance() == chance) {
			setBet(getBet() * multiplier);	
		}

		if (getProfit() > 0 && getChance() == chance2) {
			win++;
			
			setBet(initialBet);

			if (win >= winMax) {
				setChance(initialChance);
			}
		} else if (getProfit() < 0 && getChance() == chance2) {
			setBet(getBet() * multiplier2);	
		}

		if (getProfit() > 0 && getChance() == chance3) {
			win++;
			
			setBet(initialBet);

			if (win >= winMax) {
				setChance(initialChance);
			}
		} else if (getProfit() < 0 && getChance() == chance3) {
			setBet(getBet() * multiplier3);	
		}
		
		var roll = getRoll();
    
        if (getChance() == initialChance) {
			if (getProfit() < 0 && getBet() == initialBet) {
				setBet(initialBet * initialCoeff);
			} else {
				setBet(initialBet);
			}

            if (roll >= chance) {
                counterLow++;
            } else {
                counterLow = 0;
			}
			
			if (roll < 100 - chance) {
				counterHigh++;
			} else {
				counterHigh = 0;
			}

			if (roll >= chance2) {
                counterLow2++;
            } else {
                counterLow2 = 0;
			}
			
			if (roll < 100 - chance2) {
				counterHigh2++;
			} else {
				counterHigh2 = 0;
			}

			if (roll >= chance3) {
                counterLow3++;
            } else {
                counterLow3 = 0;
			}
			
			if (roll < 100 - chance3) {
				counterHigh3++;
			} else {
				counterHigh3 = 0;
			}
        }
    
        if (counterLow > counterMax && getChance() == initialChance) {
			win = 0;

      		console.clear();
      		console.log(counterLow);
			counterLow = counterHigh = counterLow2 = counterHigh2 = counterLow3 = counterHigh3 = 0;
	    
	    	setBet(initialBet * coeff);
		    //setPayout(1.1);
			setChance(chance);
			
			if (isLow == false) {
				changeCondition();
			}

			// stop();
			// return;
        } else if (counterHigh > counterMax && getChance() == initialChance) {
			win = 0;

			console.clear();
			console.log(counterHigh);
			counterLow = counterHigh = counterLow2 = counterHigh2 = counterLow3 = counterHigh3 = 0;
	  
		  	setBet(initialBet * coeff);
		  	//setPayout(1.1);
			setChance(chance);
			
			if (isLow == true) {
				changeCondition();
			}

			// stop();
			// return;
		} else if (counterLow2 > counterMax2 && getChance() == initialChance) {
			win = 0;

      		console.clear();
      		console.log(counterLow2);
			counterLow = counterHigh = counterLow2 = counterHigh2 = counterLow3 = counterHigh3 = 0;
	    
	    	setBet(initialBet * coeff2);
		    //setPayout(1.1);
			setChance(chance2);
			
			if (isLow == false) {
				changeCondition();
			}

			// stop();
			// return;
        } else if (counterHigh2 > counterMax2 && getChance() == initialChance) {
			win = 0;

			console.clear();
			console.log(counterHigh2);
			counterLow = counterHigh = counterLow2 = counterHigh2 = counterLow3 = counterHigh3 = 0;
	  
		  	setBet(initialBet * coeff2);
		  	//setPayout(1.1);
			setChance(chance2);
			
			if (isLow == true) {
				changeCondition();
			}

			// stop();
			// return;
		} else if (counterLow3 > counterMax3 && getChance() == initialChance) {
			win = 0;

      		console.clear();
      		console.log(counterLow3);
			counterLow = counterHigh = counterLow2 = counterHigh2 = counterLow3 = counterHigh3 = 0;
	    
	    	setBet(initialBet * coeff3);
		    //setPayout(1.1);
			setChance(chance3);
			
			if (isLow == false) {
				changeCondition();
			}

			// stop();
			// return;
        } else if (counterHigh3 > counterMax3 && getChance() == initialChance) {
			win = 0;

			console.clear();
			console.log(counterHigh3);
			counterLow = counterHigh = counterLow2 = counterHigh2 = counterLow3 = counterHigh3 = 0;
	  
		  	setBet(initialBet * coeff3);
		  	//setPayout(1.1);
			setChance(chance3);
			
			if (isLow == true) {
				changeCondition();
			}

			// stop();
			// return;
	  	} else {
            console.clear();
            console.log(roll);
			console.log('Counter Low = ' + counterLow);
			console.log('Counter High = ' + counterHigh);
			console.log('Counter Low 2 = ' + counterLow2);
			console.log('Counter High 2 = ' + counterHigh2);
			console.log('Counter Low 3 = ' + counterLow3);
			console.log('Counter High 3 = ' + counterHigh3);
        }
	});
}, speed * 4);
