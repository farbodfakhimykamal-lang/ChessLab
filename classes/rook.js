import { pieceGrid } from "../chess.js";
import { isOpen } from "../chess.js";

export class rook{
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.hasMoveBefore = false;
    this.possibleOpenMoves = [];
    this.possibleAttackMoves = [];
  }
  
  possibleOpenMovesf(){
    let allAttackMoves = [];
    let attackMoves = [];
    let allMoves = [];
    
    //horizental
    let horizental = [];
    let horizental1 = [];
    let horizental2 = [];
    
    for(let i=this.x - 1; i>=0; i--){
      if(isOpen(pieceGrid, i, this.y)){
        horizental1.push({x:i, y:this.y});
      }
      else{
        if((pieceGrid[i][this.y]).color !== this.color){
          attackMoves.push({x:i, y:this.y});
        }
        break;
      }
    }
    
    horizental1 = horizental1.map((item, i) => horizental1[horizental1.length - i - 1]);
    
    for(let i=this.x + 1; i<pieceGrid.length; i++){
      if(isOpen(pieceGrid, i, this.y)){
        horizental2.push({x:i, y:this.y});
      }
      else{
        if((pieceGrid[i][this.y]).color !== this.color){
          attackMoves.push({x:i, y:this.y});
        }
        break;
      }
    }
  
    horizental = horizental1.concat(horizental2);
  
    //vertical
    let vertical = [];
    let vertical1 = [];
    let vertical2 = [];
    
    for(let i=this.y - 1; i>=0; i--){
      if(isOpen(pieceGrid, this.x, i)){
        vertical1.push({x:this.x, y:i});
      }
      else{
        if((pieceGrid[this.x][i]).color !== this.color){
          attackMoves.push({x:this.x, y:i});
        }
        break;
      }
    }
    vertical1 = vertical1.map((item, i) => vertical1[vertical1.length - i - 1]);
    
    for(let i=this.y + 1; i<pieceGrid.length; i++){
      if(isOpen(pieceGrid, this.x, i)){
        vertical2.push({x:this.x, y:i});
      }
      else{
        if((pieceGrid[this.x][i]).color !== this.color){
          attackMoves.push({x:this.x, y:i});
        }
        break;
      }
    }
    
    allAttackMoves.push(attackMoves);
    this.possibleAttackMoves = allAttackMoves;
  
    vertical = vertical1.concat(vertical2);
    
    allMoves.push(horizental);
    allMoves.push(vertical);
    this.possibleOpenMoves = allMoves;
  }
  
  move(x, y){
    let found = false;
    this.possibleOpenMoves.forEach((e) => {
      e.forEach((ee) => {
        if((ee.x === x) && (ee.y === y)){
          pieceGrid[ee.x][ee.y] = new rook(ee.x, ee.y, this.color);
          pieceGrid[this.x][this.y] = "0";
          found = true;
          this.hasMoveBefore = true;
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
          pieceGrid[ee.x][ee.y] = new rook(ee.x, ee.y, this.color);
          pieceGrid[this.x][this.y] = "0";
          found = true;
          this.hasMoveBefore = true;
        }
      });
    });
    
    return found;
  }
}



