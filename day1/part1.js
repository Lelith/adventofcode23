const utils = require("../utils");

function findNumbers(sequence) {
  const regExp = /\d/g ;
  return sequence.map(element => {
    return element.match(regExp);
  });
}

function generateSum(identifiedNumbers){
  const sumNumbers = identifiedNumbers.map((sequenceNumbers)=>{
    const length = sequenceNumbers.length;
    return parseInt(sequenceNumbers[0]+""+sequenceNumbers[length-1],10);
  })
  console.log(utils.calcArraySum(sumNumbers));
}

try {
  //let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  const sequenceNumbers = findNumbers(data);
  generateSum(sequenceNumbers);
} catch (e) {
  console.log("Error", e.stack);
}
