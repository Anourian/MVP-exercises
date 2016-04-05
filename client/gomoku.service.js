angular.module('testApp')
.service('gomokuService', function(){
  var gridSize;
return {
  setGrid:function(size){
    if (size < 15) {
      size = 15;
    } else if (size > 30){
      size = 30;
    }
    gridSize = size;
  },
  getGrid:function(){
    return gridSize;
  }
}

});