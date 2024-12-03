const utils = require("../../utils");


function findNumbers(sequences) {
  const numberMatcher = {'allNumbers': /\d/, 1: 'one', 2: 'two', 3: 'three', 4:'four', 5:'five', 6:'six', 7:'seven', 8:'eight', 9: 'nine'} ;
  return sequences.map(sequence => {
     const identified = [];
      Object.keys(numberMatcher).forEach((key) => {
        let match;
        const regExe = RegExp(numberMatcher[key], 'g');
        while((match = regExe.exec(sequence))!=null){
          const number = key==='allNumbers' ? match[0]: key
          identified[match.index]=number;
        }
      });
      return identified.filter(Number)
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
  //let data = utils.readInput('./example2.txt');
  let data = utils.readInput('./input.txt');
  data = utils.modDataNewlineStr(data);
  const sequenceNumbers = findNumbers(data);
  generateSum(sequenceNumbers);
} catch (e) {
  console.log("Error", e.stack);
}
