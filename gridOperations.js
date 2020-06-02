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
