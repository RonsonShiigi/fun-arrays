var dataset = require('./dataset.json');
let bankBalances = dataset.bankBalances
/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = bankBalances.filter((item) => {
  return item.amount > 100000
});

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
let newArr = bankBalances.map((item) => {
  return Number(item.amount)
});
// console.log(newArr)
function getSum(prev,current,arr){
  return prev + current
}
var sumOfBankBalances = newArr.reduce(getSum);

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

let interestStates = bankBalances.filter((item) =>{
    if(item.state === 'WI'){
      return item
    }else if(item.state === 'IL'){
      return item
    }else if(item.state === 'WY'){
      return item
    }else if(item.state === 'OH'){
      return item
    }else if(item.state === 'GA'){
      return item
    }else if(item.state === 'DE'){
      return item
    }
})
interestStates.map(item => {
  // console.log('values',Object.values(item))
})
function interest(item){
 
  return Math.round(Number(item.amount) *.189)
}
var newInterestStates = interestStates.map(interest);
// console.log(newInterestStates)
var sumOfInterests = newInterestStates.reduce(getSum);

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


var stateSums = {};
function groupBy(objArr,property){
  return objArr.reduce(function(acc,obj){
    var key = obj[property];
    if(!acc[key]){
      acc[key]=[];
    }
    acc[key].push(obj);
    return acc
  }, {})
};

var checkMe = groupBy(bankBalances,'state');
// console.log(checkMe)
function amount(item){
  
  return item.amount
}
function sum(prev,next){
return Number(prev) + Number(next)
}

for(key in checkMe){
checkMe[key] = Number(checkMe[key].map(amount).reduce(sum))
};



stateSums =checkMe;



// console.log(bankBalances);




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

//filters out wanted states
let wantedStates = bankBalances.filter((item) =>{
  if(item.state !== "WI" && item.state !== 'IL' && item.state !== 'WY' && item.state !== 'OH' && item.state !== 'GA' && item.state !== 'DE'){
    return item
  }
});
  //groups states and sums amount
let wantedStatesSum = groupBy(wantedStates,'state');
for(key in wantedStatesSum){
  wantedStatesSum[key] = Number(wantedStatesSum[key].map(amount).reduce(sum));
}
 //new array of just amounts
let findMyInterest = Object.values(wantedStatesSum);
let interestOfStates = findMyInterest.map(interestOfObject);
function interestOfObject(item){
  return Math.round(item * .189)
}
// console.log(interestOfStates)
//filters for high amounts of interest(greater than 50,000)
let hiInt = interestOfStates.filter((item) =>{
  if(item > 50000){
    return item
  }
});
//sums high interests
var sumOfHighInterests = hiInt.reduce(getSum);




/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = [];
// console.log(stateSums)
for(keys in stateSums){
  if(stateSums[keys] < 1000000){
    
    lowerSumStates.push(keys)
  }
}; 


/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;
let hiStates = [];
for(keys in stateSums){
  if(stateSums[keys] > 1000000){
    hiStates.push(stateSums[keys])
  }
}
higherStateSums = hiStates.reduce(getSum);


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
let grouped = groupBy(interestStates,'state');
// console.log(grouped);
for(keys in grouped){
  grouped[keys] = grouped[keys].map(amount).reduce(sum)
}
for(keys in grouped){
  if(grouped[keys] < 2550000){
    areStatesInHigherStateSum=false;
  }
}


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
for(keys in grouped){
  if(grouped[keys] > 2550000){
    anyStatesInHigherStateSum = true;
  }
}

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
