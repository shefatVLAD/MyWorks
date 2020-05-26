function drawInitialPage(){
  background("#FFA07A");
  textSize(24);
  text("Выберите размер игровой сетки:", 130, 200);
  fill("#CD5C5C");
  rect(130,300,100,100);
  rect(390,300,100,100);
  fill(0);
  textAlign(CENTER, CENTER);
  text("4X4", 180, 350);
  text("6X6", 440, 350);
}

function updateCanvas() {
 background(255);
 drawGrid(gridSize);
 select('#score').html(score);
}

function drawGrid(numOfCells){
  let startPosition;
  if(numOfCells == 4){
    startPosition = 100;
  }else if(numOfCells == 6){
    startPosition = 0;
  }
  let w = 100;
  for(let i = 0; i < numOfCells; i++){
    for(let j = 0; j < numOfCells; j++){
      noFill();
      strokeWeight(2);
      let val = grid[i][j];
      let s = val.toString();
      if(secondGrid[i][j] === 1){
        stroke(200, 0, 0);
        strokeWeight(3);
        secondGrid[i][j] = 0;
      }else {
        stroke(0);
      }
      if(val != 0){
        fill(colorsAndSizes[s].color);
      }else{
        noFill();
      }
      rect (startPosition + i * w, startPosition + j * w, w, w);
      if(val !== 0) {
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0);
        textSize(colorsAndSizes[s].size);
        text(val,startPosition + i * w + w / 2,startPosition + j * w + w / 2);
      }
    }
  }
}
