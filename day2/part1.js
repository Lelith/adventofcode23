const utils = require("../utils");

const red = 12;
const green = 13;
const blue = 14;

function prepareDatasets(data) {
  return data.map((game)=> {
   const [gameNo, gameSet] = game.split(':');
    const formattedGameSet = gameSet.split(';').map(draw => {
      return draw.split(',').map((item)=>item.trim().split(' '));
    });
    return formattedGameSet.flat();
  });
}

function checkPlausibility(amount, cubeColor){
  switch(cubeColor){
    case 'red': {
      return amount <= red;
    }
    case 'green': {
      return amount <=green;
    }
    case 'blue': {
      return amount <=blue;
    }
  }
}

function evaluateGames(data) {
  const possibleGames = [];
  data.forEach((game, gameNo) => {
    let isGamePossible = true;
    let index = 0;
      while (index < game.length && isGamePossible) {
        isGamePossible = checkPlausibility(parseInt(game[index][0], 10), game[index][1]);
        index++;
      }
    if(isGamePossible){ possibleGames.push(gameNo+1)}   
  });
  return possibleGames;
}

try {
  //let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  const preparedData = prepareDatasets(utils.modDataNewlineStr(data));
  const possibleGames = evaluateGames(preparedData);
  console.log(utils.calcArraySum(possibleGames));
} catch (e) {
  console.log("Error", e.stack);
}
