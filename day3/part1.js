const utils = require("../utils");

function includesSome(arr1, arr2) {
  return arr1.some(r=> arr2.includes(r))
}
function identifyPartNumbers(numberMap) {
  const partNumbers = [];
  numberMap.forEach((element, rowIndex) => {
      const [numberIndexes, numbers, specialIndexes] = element;
      numbers.forEach((number)=>{
        let isPartNumber = false;
        const currentNumberIndexes = numberIndexes.splice(0, number.length);
        const left = currentNumberIndexes[0] - 1;
        const right = currentNumberIndexes[currentNumberIndexes.length-1] +1;
        // are there special characters on the same row?
        if(specialIndexes.length>0){
         if(includesSome(specialIndexes, [left,right])) {
          isPartNumber = true;
          partNumbers.push(parseInt(number, 10));
         }
        }
        // probe row above
        if(!isPartNumber && rowIndex -1 >0){
          const specialAbove = numberMap[rowIndex-1][2];
          if(includesSome(specialAbove, [left,right,...currentNumberIndexes])) {
            isPartNumber = true;
            partNumbers.push(parseInt(number,10));
          }
        }
        // probe row below
        if(!isPartNumber && rowIndex +1 < numberMap.length-1){
          const specialAbove = numberMap[rowIndex+1][2];
          if(includesSome(specialAbove, [left,right,...currentNumberIndexes])) {
            isPartNumber = true;
            partNumbers.push(parseInt(number,10));
          }
        }
        
      })
  });
  return partNumbers;
}

function findNumbers(partSheet) {
  return partSheet.map((row) => {
    let currentNumber = '';
    const currentNumberIndexes = [];
    const specialIndexes = [];
    let symbolIndex = 0;
    while(symbolIndex < row.length){
      let symbol = row[symbolIndex];
      if(symbol==='.'){
        symbolIndex+=1;
      } else if(symbol.match(/\d/)){
        currentNumberIndexes.push(symbolIndex);
        currentNumber +=''+symbol;
       if(row[symbolIndex+1] && !row[symbolIndex+1].match(/\d/)){
          currentNumber+=',';
        }
        symbolIndex+=1;
      } else {
        specialIndexes.push(symbolIndex)
        symbolIndex++;
      }
    }
    const numbers = currentNumber.split(',').filter(element => element);
    return [currentNumberIndexes, numbers, specialIndexes];
  });
}

try {
 // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data)
  const partSheet = data.map(row => row.split(""));
  const numberMap = findNumbers(partSheet);
  const partNumbers = identifyPartNumbers(numberMap);
  console.log(utils.calcArraySum(partNumbers));
} catch (e) {
  console.log("Error", e.stack);
}
