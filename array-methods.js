var dataset = require('./dataset.json');
let bankBalances= dataset.bankBalances
/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/

function thousands(item){
  if(item.amount > 100000){
    return item
  }
}

var hundredThousandairs = bankBalances.filter(thousands);
// console.log(hundredThousandairs);

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object

function getAmount(item){
  return Number(item.amount)
}

function getSum(acc,current){
  return acc + current
}


var sumOfBankBalances = bankBalances.map(getAmount).reduce(getSum);
// console.log(sumOfBankBalances)
/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */

function classA (item){
  if(item.state === 'WI' || item.state ==='IL' || item.state === 'WY' || item.state ==='OH' || item.state ==='GA' || item.state === 'DE'){
    return item
  }
}

function getInterest(num){
  return Math.round(num *0.189)
}


var sumOfInterests = bankBalances.filter(classA).map(getAmount).map(getInterest).reduce(getSum);
// console.log(sumOfInterests)

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where
  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar
  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
function setState(item){
  stateSums[item.state] = 0;
}

function setSums(item){
  stateSums[item.state] += Number(item.amount)
}

var stateSums = {};
bankBalances.map(setState);
bankBalances.map(setSums)


/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`
  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
let sumsOfB = {};

 function classB(item){
  if(item.state !== 'WI' && item.state !=='IL' && item.state !== 'WY' && item.state !=='OH' && item.state !=='GA' && item.state !== 'DE'){
    return item
  }
 }

 function stayHi(num){
   if(num > 50000){
     return num
   }
 }

 function setStateB(item){
  sumsOfB[item.state] = 0;
}

function setSumsB(item){
  sumsOfB[item.state] += Number(item.amount)
}

 

 
 bankBalances.filter(classB).map(setStateB)
 bankBalances.filter(classB).map(setSumsB);
 var sumOfHighInterests = Object.values(sumsOfB).map(getInterest).filter(stayHi).reduce(getSum)

//  console.log(sumOfHighInterests)
/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */

function findLow(str){
  if(stateSums[str] < 1000000){
    return str
  }
}



let states = Object.keys(stateSums)
var lowerSumStates = states.filter(findLow);





/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */

 function checkHi(num){
  if(num > 1000000){
    return num
  }
}


var higherStateSums = Object.values(stateSums).filter(checkHi).reduce(getSum);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  Check if all of these states have a sum of account values
  greater than 2,550,000
  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */

 function checkSumsClassA(item){
  if(stateSums[item.state] > 2550000){
    areStatesInHigherStateSum = true;
  }else{
    areStatesInHigherStateSum = false;
  }
 }

 var areStatesInHigherStateSum = null;
let a = bankBalances.filter(classA)
a.map(checkSumsClassA);
/*
  Stretch Goal && Final Boss
  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = false;

function checkAnyHi(item){
  if(stateSums[item.state] > 2550000){
    anyStatesInHigherStateSum = true;
  }
}

a.map(checkAnyHi)


module.exports = {
  hundredThousandairs : hundredThousandairs,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};