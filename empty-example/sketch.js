let grid;
let secondGrid;
let score = 0;
let gridSize;

function setup() {
  let myCanvas = createCanvas(600, 600);
  myCanvas.parent('myContainer');
  noLoop();
  //gridSize = 6;
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
  }else if(mouseX >= 390 && mouseX <= 490 && mouseY >= 300 && mouseY <= 400){
    gridSize = 6;
    pressed = true;
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

function flipGrid(grid){
  for(let i = 0; i < gridSize; i++){
    grid[i].reverse();
  }
  return grid;
}

function transposeGrid(grid, direction){
  let newGrid = blankGrid(gridSize);
  for(let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
      if(direction == 1){
        newGrid[i][j] = grid[j][i];
      }else {
        newGrid[j][i] = grid[i][j];
      }
    }
  }
  return newGrid;
}

function operate(row){
  row = slide(row);
  row = combine(row);
  row = slide(row);
  return row;
}

function copyGrid(grid){
  let extra = blankGrid(gridSize);
     for(let i = 0; i < gridSize; i++){
       for(let j = 0; j < gridSize; j++){
         extra[i][j] = grid[i][j];
       }
     }
     return extra;
}

function compare(a,b){
  for(let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
      if(a[i][j] !== b[i][j]){
        return true;
      }
    }
  }
  return false;
}

function slide(row) {
  let arr = row.filter(val => val);
  let missing = gridSize - arr.length;
  let zeros = Array(missing).fill(0);
  arr = zeros.concat(arr);
  return arr;
}

function combine(row){
  for(let i = gridSize - 1; i >= 1; i--){
    let a = row[i];
    let b = row[i - 1];
    if(a == b){
      row[i] = a + b;
      score += row[i];
      row[i - 1] = 0;
    }
  }
  return row;
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
