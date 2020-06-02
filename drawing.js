function drawInitialPage(){
  stroke(0);
  strokeWeight(8);
  fill("#FFA07A");
  rect(0,0,600,600);
  fill(0);
  strokeWeight(1);
  textSize(80);
  textAlign(CENTER,CENTER);
  text("2048",300,200);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Выберите размер игровой сетки:", 300, 270);
  fill("#CD5C5C");
  rect(130,300,100,100);
  rect(380,300,100,100);
  fill(0);
  textAlign(CENTER, CENTER);
  text("4X4", 180, 350);
  text("6X6", 430, 350);
  //drawMenu();
}

function drawFinishPage(result){
  background("#FFA07A");
  textAlign(CENTER, CENTER);
  text(result, 300, 300);
  textSize(20);
  text("Нажмите F5 для перезапуска", 300, 350);
}

function drawMenu(){
  fill("#E9967A");
  stroke(0);
  rect(600, 0 * 150, 200, 150);
  rect(600, 1 * 150, 200, 150);
  stroke(255);
  fill(255);
  rect(600 + 2, 2 * 150 + 2, 200, 150);
  rect(600 + 2, 3 * 150 + 2, 200, 150);
}

function updateCanvas() {
 background(255);
 drawGrid(gridSize);
 //drawMenu();
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
