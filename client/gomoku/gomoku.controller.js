angular.module('testApp')
.controller('gomokuController', function(gomokuService, $scope,$state){
  $scope.gridSize = gomokuService.getGrid();
  $scope.$state = $state;
  $scope.matrix = [];
  $scope.construct = function (val){
    for (var i =0; i < val ; i ++){
      var temp = [];
      for (var a = 0; a < val; a++){
        temp.push({value:''});
      }
      $scope.matrix.push(temp);
    }
  };
  $scope.construct($scope.gridSize);
  $scope.turn = 'Black';
  $scope.addPiece = function (row, column){ 
    if ($scope.matrix[row][column].value){
      return
    } else {
      $scope.matrix[row][column].value= $scope.turn;
      var found = $scope.checkBoard(row, column, $scope.turn);
      if (found){
        return;
      }
      if ($scope.turn === 'Black'){
        $scope.turn = 'White'
      } else {
        $scope.turn = 'Black';
      }      
    }
  };
  $scope.checkBoard = function (row, column, turn){
    $scope.match = false;
    //check rows
    var rowCheck = [];
    for (var a = column - 5; a < column + 5; a ++){
      if (a < 0 || a > $scope.gridSize - 1) {
        rowCheck.push({found:false, row:row, column:a});        
      } else if ($scope.matrix[row][a].value === turn){
        rowCheck.push({found:true, row:row, column:a});
      } else {
        rowCheck.push({found:false, row:row, column:a});
      }     
    }
    if ($scope.concurrent(rowCheck, 'Row')){
      return true;
    }
    
    var columnCheck = [];
    //check column
    for (var i = row-5; i < row+5; i++){
      if (i< 0 || i > $scope.gridSize - 1){
        columnCheck.push({found:false, row:i, column:column});
      } else if ($scope.matrix[i][column].value === turn){
        columnCheck.push({found:true, row:i, column:column});
      }else {
        columnCheck.push({found:false, row:i, column:column});
      }  
    }
    if ($scope.concurrent(columnCheck, 'Col')){
      return true;
    }

    var diagnolRCheck = [];
    //check diagnol from top left to bottom right
    var c = column - 5
    for (var i = row-5; i < row+5; i++){
      if (i< 0 || i > $scope.gridSize - 1 || c < 0 || c > $scope.gridSize - 1){
        diagnolRCheck.push({found:false, row:i, column:c});
      } else if ($scope.matrix[i][c].value === turn){
        diagnolRCheck.push({found:true, row:i, column:c});
      }else {
        diagnolRCheck.push({found:false, row:i, column:c});
      }  
      c++;
    }
    if ($scope.concurrent(diagnolRCheck, 'DR')){
      return true;
    }
    var diagnolLCheck = [];

    //check diagnol from bottom left to top right
    c = column + 5
    for (var i = row-5; i < row+5; i++){
      if (i< 0 || i > $scope.gridSize - 1 || c < 0 || c > $scope.gridSize - 1){
        diagnolLCheck.push({found:false, row:i, column:c});
      } else if ($scope.matrix[i][c].value === turn){
        diagnolLCheck.push({found:true, row:i, column:c});
      }else {
        diagnolLCheck.push({found:false, row:i, column:c});
      }  
      c--;
    }
    if ($scope.concurrent(diagnolLCheck, 'DL')){
      return true;
    }

    return false;
  };
  $scope.concurrent = function (list, type){
    var count = 0;
    var streak =[];
    for (var b = 0; b < list.length; b++){
      if (list[b].found === true){
        count++;
        streak.push(list[b]);
      } else {
        count = 0;
        streak = [];
      }
      if (count === 5){
        $scope.match = true;
        for (var c = 0; c < streak.length; c++){
          $scope.matrix[streak[c].row][streak[c].column].type = type;
        }
        return true;
      }
    }
    return false;
  };
 

});