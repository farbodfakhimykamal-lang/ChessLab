import { pieceGrid } from "../chess.js";
import { isOpen } from "../chess.js";

export class bishop{
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.possibleOpenMoves = [];
    this.possibleAttackMoves = [];
  }
  
possibleOpenMovesf(){
  let attackMoves = [];
  let allAttackMoves = [];
  let allMoves = [];
  
    //mainDiagonal
    let mainDiagonal = [];
    let mainDiagonal1 = [];
    let mainDiagonal2 = [];
    
    for(let i = -1; (0 <= this.x + i) && (0 <= this.y + i); i--){
      if(isOpen(pieceGrid, this.x + i, this.y + i)){
        mainDiagonal1.push({x:this.x + i, y:this.y + i});
      }
      else{
        if((pieceGrid[this.x + i][this.y + i]).color !== this.color){
          attackMoves.push({x:this.x + i, y:this.y + i});
        }
        break;
      }
    }
    
    mainDiagonal1 = mainDiagonal1.map((e, i) => mainDiagonal1[mainDiagonal1.length - i - 1]);
    
    for(let i=1; (this.x + i < pieceGrid.length) && (this.y + i < pieceGrid.length); i++){
      if(isOpen(pieceGrid, this.x + i, this.y + i)){
        mainDiagonal2.push({x:this.x + i, y:this.y + i});
      }
      else{
        if((pieceGrid[this.x + i][this.y + i]).color !== this.color){
          attackMoves.push({x:this.x + i, y:this.y + i});
        }
        break;
      }
    }
  
    mainDiagonal = mainDiagonal1.concat(mainDiagonal2);
  
    //secondaryDiagonal
    let secondaryDiagonal = [];
    let secondaryDiagonal1 = [];
    let secondaryDiagonal2 = [];
    
    for(let i= -1; (this.x + i >= 0) && (this.y - i >= 0) && (this.x + i < pieceGrid.length) && (this.y - i < pieceGrid.length); i--){
      if(isOpen(pieceGrid, this.x + i, this.y - i)){
        secondaryDiagonal1.push({x:this.x + i, y:this.y - i});
      }
      else{
        if((pieceGrid[this.x + i][this.y - i]).color !== this.color){
          attackMoves.push({x:this.x + i, y:this.y - i});
        }
        break;
      }
    }
    secondaryDiagonal1 = secondaryDiagonal1.map((e, i) => secondaryDiagonal1[secondaryDiagonal1.length - i - 1]);
    
    for(let i= +1; (this.x + i >= 0) && (this.y - i >= 0) && (this.x + i < pieceGrid.length) && (this.y - i < pieceGrid.length); i++){
      if(isOpen(pieceGrid, this.x + i, this.y - i)){
        secondaryDiagonal2.push({x:this.x + i, y:this.y - i});
      }
      else{
        if((pieceGrid[this.x + i][this.y - i]).color !== this.color){
          attackMoves.push({x:this.x + i, y:this.y - i});
        }
        break;
      }
    }
    
    allAttackMoves.push(attackMoves);
    this.possibleAttackMoves = allAttackMoves;
  
    secondaryDiagonal = secondaryDiagonal1.concat(secondaryDiagonal2);
    
    allMoves.push(mainDiagonal);
    allMoves.push(secondaryDiagonal);
    this.possibleOpenMoves = allMoves;
  }
  
  move(x, y){
    let found = false;
    this.possibleOpenMoves.forEach((e) => {
      e.forEach((ee) => {
        if((ee.x === x) && (ee.y === y)){
          pieceGrid[ee.x][ee.y] = new bishop(ee.x, ee.y, this.color);
          pieceGrid[this.x][this.y] = "0";
          found = true;
        }
      });
    });
    
    return found;
  }
  
  take(x, y){
    let found = false;
    this.possibleAttackMoves.forEach((e) => {
      e.forEach((ee) => {
        if((ee.x === x) && (ee.y === y)){
          pieceGrid[ee.x][ee.y] = new bishop(ee.x, ee.y, this.color);
          pieceGrid[this.x][this.y] = "0";
          found = true;
        }
      });
    });
    
    return found;
  }
}