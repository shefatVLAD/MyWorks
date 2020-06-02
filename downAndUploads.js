jQuery(document).ready(function($){

let downBut = document.querySelector(".download");

downBut.addEventListener("click", function(){
  if(gridSize !== 0){
    let d = new data(grid, score);
    let j = JSON.stringify(d);
    saveGame(j, "mySave","txt");
  }
});

});

function saveGame(data, filename, type) {
    counter ++;
    console.log(counter);
    download = true;
    var file = new Blob([data], {type: type});
   if (window.navigator.msSaveOrOpenBlob) // IE10+
       window.navigator.msSaveOrOpenBlob(file, filename);
   else { // Others
       var a = document.createElement("a"),
               url = URL.createObjectURL(file);
       a.href = url;
       a.download = filename;
       document.body.appendChild(a);
       a.click();
       setTimeout(function() {
           document.body.removeChild(a);
           window.URL.revokeObjectURL(url);
       }, 0);
   }
}

function readFile(object) {
  var file = object.files[0]
  var reader = new FileReader()
  reader.readAsText(file);
  reader.onerror = function() {
     console.log("Проблема");
  };
  reader.onload = function() {
   let f = reader.result;
   let g = JSON.parse(f);
   grid = g.grid;
   score = g.score;
   gridSize = grid.length;
   secondGrid = blankGrid(grid.length);
   updateCanvas();
 };
}
