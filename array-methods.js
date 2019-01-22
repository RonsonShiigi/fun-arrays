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
function groupBy(data,property){
  return data.reduce((acc,obj) =>{
    const key = obj[property];
    if(!acc[key]){
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc
  }, {})  
};
let newBank = groupBy(bankBalances,'state');
for(keys in newBank){
  newBank[keys] = newBank[keys].map(amount).reduce(getSum)
};


var stateSums = newBank;
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
function groupClassB(item){
  if(item.state !== 'WI' && item.state !== "IL" && item.state !== 'WY' &&  item.state !== 'OH' && item.state !== 'GA' && item.state !=='DE'){
    return item
  }
}
function interest(item){
  return Math.round(item * .189)
}
let classB =  groupBy(bankBalances.filter(groupClassB),'state');
for(keys in classB){
  classB[keys]=classB[keys].map(amount).reduce(getSum)
}
bankBalances.filter(groupClassB);

var sumOfHighInterests  = Object.values(classB).map(interest).filter((item) => {
  if(item > 50000){
    return item
  }
}).reduce(getSum);



 




/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = [];
console.log(stateSums)


/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;



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
