let grid;
let secondGrid;
let score = 0;
let gridSize = 0;
let counter;
let download = false;

class data {
  constructor(grid, score){
    this.grid = grid;
    this.score = score;
  }
  get Grid(){
    return this.grid;
  }
  get secondGrid(){
    return this.secondGrid;
  }
  get Score(){
    return this.score
  }
}

function setup() {
  let myCanvas = createCanvas(600, 600);
  myCanvas.parent('myContainer');
  noLoop();
  drawInitialPage();
}

function AddNumber(){
  let options = [];
  for(let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
      if(grid[i][j] === 0){
        options.push({
          x: i,
          y: j
        });
      }
    }
  }
  if(options.length > 0){
    let spot = random(options);
    let r = random(1);
    grid[spot.x][spot.y] = r > 0.1 ? 2 : 4;
    secondGrid[spot.x][spot.y] = 1;
  }
}

function mouseClicked(){
  pressed = false;
  if(mouseX >= 130 && mouseX <= 230 && mouseY >= 300 && mouseY <= 400){ //  && mouseButton == LEFT
    gridSize = 4;
    pressed = true;
  }else if(mouseX >= 380 && mouseX <= 480 && mouseY >= 300 && mouseY <= 400){
    gridSize = 6;
    pressed = true;
  }
  if(mouseX >= 600 && mouseX <= 800 && mouseY >= 0 && mouseY <= 150 && !download){
    let d = new data(grid, score);
    let j = JSON.stringify(d);
    saveGame(j, "mySave","txt");
  }
  if(pressed){
    grid = blankGrid(gridSize);
    secondGrid = blankGrid(gridSize);
    if(gridSize == 4){
      AddNumber();
      AddNumber();
    }else if(gridSize == 6){
      AddNumber();
      AddNumber();
      AddNumber();
    }
    updateCanvas();
  }
  download = false;
}

function keyPressed(){
  console.log(keyCode);
  let flipped = false;
  let rotated = false;
  let played = true;
  switch(keyCode) {
    case DOWN_ARROW:
      break;
    case UP_ARROW:
      grid = flipGrid(grid);
      flipped = true;
      break;
    case RIGHT_ARROW:
      grid = transposeGrid(grid, 1);
      rotated = true;
      break;
    case LEFT_ARROW:
      grid = transposeGrid(grid, 1);
      grid = flipGrid(grid);
      rotated = true;
      flipped = true;
      break;
    default:
      played = false;
  };

  if(played){
    let past = copyGrid(grid);
    for(let i = 0; i < gridSize; i++){
      grid[i] = operate(grid[i]);
    }
    let changed = compare(past, grid);

    if(flipped){
      grid = flipGrid(grid);
    }
    if(rotated){
      grid = transposeGrid(grid, -1);
    }
    if(changed){
      AddNumber();
    }
    updateCanvas();

    if(isGameOver()){
      drawFinishPage("GAME OVER");
    }

    if(isGameWon()){
      drawFinishPage("GAME WON");
    }
  }
}

function isGameOver(){
  for(let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
      if(grid[i][j] == 0){
        return false;
      }
      if(j !== gridSize - 1 && grid[i][j] === grid[i][j + 1]){
        return false;
      }
      if(i !== gridSize - 1 && grid[i][j] === grid[i + 1][j]){
        return false;
      }
    }
  }
  return true;
}

function isGameWon(){
  for(let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
      if(grid[i][j] == 2048){
        return true;
      }
    }
  }
  return false;
}

function blankGrid(numOfCells){
  let res;
  if(numOfCells == 4){
  res = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
     ];
   }else if(numOfCells == 6) {
     res = [
         [0,0,0,0,0,0],
         [0,0,0,0,0,0],
         [0,0,0,0,0,0],
         [0,0,0,0,0,0],
         [0,0,0,0,0,0],
         [0,0,0,0,0,0]
        ];
   }
   return res;
}
