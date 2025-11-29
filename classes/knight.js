import { pieceGrid } from "../chess.js";
import { isOpen } from "../chess.js";

export class knight{
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
    
    let moveVectors = [
      {x: 2,y: 1},
      {x: -2,y: 1},
      {x: 2,y: -1},
      {x: -2,y: -1},
      {x: 1,y: 2},
      {x: -1,y: 2},
      {x: 1,y: -2},
      {x: -1,y: -2}
      ];
    
    let moves = [];
    
    moveVectors.forEach((v) => {
      if(
          ((this.x + v.x) < pieceGrid.length && ((this.x + v.x) >= 0)) &&
          ((this.y + v.y) < pieceGrid.length && ((this.y + v.y) >= 0))
        ){
          if(!isOpen(pieceGrid , this.x + v.x, this.y + v.y)){
            if((pieceGrid[this.x + v.x][this.y + v.y]).color !== this.color){
              attackMoves.push({x: this.x + v.x, y: this.y + v.y});
            }
          }
          else{
            moves.push({x: this.x + v.x, y: this.y + v.y});
          }
        }
    });
    
    allAttackMoves.push(attackMoves);
    
    allMoves.push(moves);
    
    this.possibleAttackMoves = allAttackMoves;
    
    this.possibleOpenMoves = allMoves;
  }
  
  move(x, y){
    let found = false;
    this.possibleOpenMoves.forEach((e) => {
      e.forEach((ee) => {
        if((ee.x === x) && (ee.y === y)){
          pieceGrid[ee.x][ee.y] = new knight(ee.x, ee.y, this.color);
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
          pieceGrid[ee.x][ee.y] = new knight(ee.x, ee.y, this.color);
          pieceGrid[this.x][this.y] = "0";
          found = true;
        }
      });
    });
    
    return found;
  }
}