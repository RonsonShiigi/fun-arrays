var dataset = require('./dataset.json');
let bankBalances = dataset.bankBalances
/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
 
//gets amount of item
function amount(item){
  return Number(item.amount)
}

function getSum(prev,next){
  return prev + next
}



var hundredThousandairs = bankBalances.filter((item) =>{
  if(item.amount > 100000){
    return item
  }
});

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object



var sumOfBankBalances = bankBalances.map(amount).reduce(getSum)

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
function groupStates(item){
  if(item.state === 'WI' || item.state === "IL" || item.state == 'WY' || item.state === 'OH' || item.state === 'GA' || item.state ==='DE'){
    return item
  }
}

function getInterest(item){
  return Math.round(Number(item.amount)*.189)
}

var sumOfInterests = bankBalances.filter(groupStates).map(getInterest).reduce(getSum)

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

 //sets object to have states as key
function setStates(item){
  stateSums[item.state] = 0;
}

//sums amount of each state
function getStateAmount(item){
  stateSums[item.state] += Number(item.amount)
}


let stateSums = {};
bankBalances.map(setStates);
bankBalances.map(getStateAmount);
// console.log(stateSums)

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
  var classB = {};
 
function groupClassB(item){
  if(item.state !== 'WI' && item.state !== "IL" && item.state !== 'WY' &&  item.state !== 'OH' && item.state !== 'GA' && item.state !=='DE'){
    return item
  }
}

function setClassB(item){
  classB[item.state] = 0;
}

function sumClassB(item){
  classB[item.state] += Number(item.amount)
}

function singleInterest(item){
  return Math.round(item * .189)
}

function stayHi(item){
  if(item > 50000){
    return item
  }
}



//filters out wanted states and sums them
bankBalances.filter(groupClassB).map(setClassB);
bankBalances.filter(groupClassB).map(sumClassB);
var sumOfHighInterests = Object.values(classB).map(singleInterest).filter(stayHi).reduce(getSum)


/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */

// var lowerSumStates = [];
// for(key in stateSums){
//   if(stateSums[key] < 1000000){
//     lowerSumStates.push(key)
//   }
// }
function setCheck(item){
  lowStates[item.state]= 0
}

function setSums(item){
  lowStates[item.state] += Number(item.amount)
}

function deleteHi(item){
  if(lowStates[item.state] > 1000000){
    delete lowStates[item.state]
  }
}


let lowStates = {};
bankBalances.map(setCheck)
bankBalances.map(setSums)
bankBalances.map(deleteHi)


var lowerSumStates = Object.keys(lowStates)

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
function sumHi(acc,current){
  if(current > 1000000){
    acc += current
  }return acc
}
var higherStateSums = Object.values(stateSums).reduce(sumHi);



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
var areStatesInHigherStateSum = null;
let areHi = bankBalances.filter(groupStates)
let classA = {};

//sets object to have each state as a key
function setClassA(item){
  classA[item.state] = 0
}

//sums the amounts of each state
function sumClassA(item){
  classA[item.state] += Number(item.amount)
}
areHi.map(setClassA);
areHi.map(sumClassA)
let classASums = Object.values(classA)

function areAllHi(item){
  let hold = [];
  if(item > 2550000){
    hold.push(item)
  }
  if(hold.length === classASums.length){
    areStatesInHigherStateSum = true;
  }else{
    areStatesInHigherStateSum = false;
  }
}

classASums.map(areAllHi);



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

var anyStatesInHigherStateSum = null;

function anyHi(item){
  let hold = [];
  if(item > 2550000){
    hold.push(item)
  }
  if(hold.length > 0){
    anyStatesInHigherStateSum = true;
  }else{
    anyStatesInHigherStateSum = false
  }
}

classASums.map(anyHi);



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
