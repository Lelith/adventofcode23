const utils = require("../utils");

function prepareDatasets(data) {
  return data.map((game)=> {
   const [gameNo, gameSet] = game.split(':');
    const formattedGameSet = gameSet.split(';').map(draw => {
      return draw.split(',').map((item)=>item.trim().split(' '));
    });
    return formattedGameSet.flat();
  });
}

function evaluateGames(data) {
 return data.map((game, gameNo) => {
    const green = [];
    const red = [];
    const blue = [];
    game.forEach((draw)=>{
      const amount = parseInt(draw[0],10);
      const cubeColor = draw[1];

      switch(cubeColor){
        case 'red': {
          red.push(amount);
          return;
        }
        case 'green': {
          green.push(amount);
          return;
        }
        case 'blue': {
          blue.push(amount);
          return;
        }
      }
    })
    const power = utils.maxArrayNum(red)* utils.maxArrayNum(green) * utils.maxArrayNum(blue);
    return power;
  });
}

try {
  // let data = utils.readInput('./example.txt');
  let data = utils.readInput('./input.txt');
  const preparedData = prepareDatasets(utils.modDataNewlineStr(data));
  const powerSets = evaluateGames(preparedData);
  console.log(utils.calcArraySum(powerSets));
} catch (e) {
  console.log("Error", e.stack);
}
