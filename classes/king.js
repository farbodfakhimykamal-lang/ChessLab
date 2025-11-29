import { pieceGrid } from "../chess.js";
import { isOpen } from "../chess.js";
import { rook } from "./rook.js"

export class king{
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.hasBeenChecked = false;
    this.hasMoveBefore = false;
    this.possibleOpenMoves = [];
    this.possibleAttackMoves = [];
  }
  
  possibleOpenMovesf(){
    let allAttackMoves = [];
    let attackMoves = [];
    
    let moves = [];
    let allMoves = [];
    
    if(this.color === "black" && this.x === 0 && this.y === 4){
      if((!this.hasBeenChecked) && (!this.hasMoveBefore)){
        if((isOpen(pieceGrid, 0, 5)) && (isOpen(pieceGrid, 0, 6)) && (!isOpen(pieceGrid, 0, 7))){
          if((pieceGrid[0][7]).color === this.color &&
             (pieceGrid[0][7]).constructor.name === "rook" &&
             (pieceGrid[0][7]).hasMoveBefore === false){
               moves.push({x: this.x, y: this.y + 2});
             }
        }
      }
      
      if((!this.hasBeenChecked) && (!this.hasMoveBefore)){
        if((isOpen(pieceGrid, 0, 3)) && (isOpen(pieceGrid, 0, 1)) && (isOpen(pieceGrid, 0, 2)) && (!isOpen(pieceGrid, 0, 0))){
          if((pieceGrid[0][0]).color === this.color &&
             (pieceGrid[0][0]).constructor.name === "rook" &&
             (pieceGrid[0][0]).hasMoveBefore === false){
               moves.push({x: this.x, y: this.y - 2});
             }
        }
      }
    }
    
    
    else if(this.color === "black" && this.x === 7 && this.y === 3){
      if((!this.hasBeenChecked) && (!this.hasMoveBefore)){
        if((isOpen(pieceGrid, 7, 2)) && (isOpen(pieceGrid, 7, 1)) && (!isOpen(pieceGrid, 7, 0))){
          if((pieceGrid[7][0]).color === this.color &&
             (pieceGrid[7][0]).constructor.name === "rook" &&
             (pieceGrid[7][0]).hasMoveBefore === false){
               moves.push({x: this.x, y: this.y - 2});
             }
        }
      }
      
      if((!this.hasBeenChecked) && (!this.hasMoveBefore)){
        if((isOpen(pieceGrid, 7, 4)) && (isOpen(pieceGrid, 7, 5)) && (isOpen(pieceGrid, 7, 6)) && (!isOpen(pieceGrid, 7, 7))){
          if((pieceGrid[7][7]).color === this.color &&
             (pieceGrid[7][7]).constructor.name === "rook" &&
             (pieceGrid[7][7]).hasMoveBefore === false){
               moves.push({x: this.x, y: this.y + 2});
             }
        }
      }
    }
    
    
    else if(this.color === "white" && this.x === 0 && this.y === 3){
      if((!this.hasBeenChecked) && (!this.hasMoveBefore)){
        if((isOpen(pieceGrid, 0, 2)) && (isOpen(pieceGrid, 0, 1)) && (!isOpen(pieceGrid, 0, 0))){
          if((pieceGrid[0][0]).color === this.color &&
             (pieceGrid[0][0]).constructor.name === "rook" &&
             (pieceGrid[0][0]).hasMoveBefore === false){
               moves.push({x: this.x, y: this.y - 2});
             }
        }
      }
      
      if((!this.hasBeenChecked) && (!this.hasMoveBefore)){
        if((isOpen(pieceGrid, 0, 4)) && (isOpen(pieceGrid, 0, 5)) && (isOpen(pieceGrid, 0, 6)) && (!isOpen(pieceGrid, 0, 7))){
          if((pieceGrid[0][7]).color === this.color &&
             (pieceGrid[0][7]).constructor.name === "rook" &&
             (pieceGrid[0][7]).hasMoveBefore === false){
               moves.push({x: this.x, y: this.y + 2});
             }
        }
      }
    }
    
    
    else if(this.color === "white" && this.x === 7 && this.y === 4){
      if((!this.hasBeenChecked) && (!this.hasMoveBefore)){
        if((isOpen(pieceGrid, 7, 5)) && (isOpen(pieceGrid, 7, 6)) && (!isOpen(pieceGrid, 7, 7))){
          if((pieceGrid[7][7]).color === this.color &&
             (pieceGrid[7][7]).constructor.name === "rook" &&
             (pieceGrid[7][7]).hasMoveBefore === false){
               moves.push({x: this.x, y: this.y + 2});
             }
        }
      }
      
      if((!this.hasBeenChecked) && (!this.hasMoveBefore)){
        if((isOpen(pieceGrid, 7, 3)) && (isOpen(pieceGrid, 7, 1)) && (isOpen(pieceGrid, 7, 2)) && (!isOpen(pieceGrid, 7, 0))){
          if((pieceGrid[7][0]).color === this.color &&
             (pieceGrid[7][0]).constructor.name === "rook" &&
             (pieceGrid[7][0]).hasMoveBefore === false){
               moves.push({x: this.x, y: this.y - 2});
             }
        }
      }
    }
    
    let baseVectors = [-1, 0, 1];
    
    baseVectors.forEach((firstBaseVector) => {
      baseVectors.forEach((secondBaseVector) => {
        if(!((secondBaseVector === firstBaseVector) && (firstBaseVector === 0)) && 
          (this.x + firstBaseVector >= 0) && (this.y + secondBaseVector >= 0) && 
          (this.x + firstBaseVector < pieceGrid.length) && 
          (this.y + secondBaseVector < pieceGrid.length)
        ){
          if(isOpen(pieceGrid, this.x + firstBaseVector, this.y + secondBaseVector)){
            moves.push({x: this.x + firstBaseVector, y: this.y + secondBaseVector});
          }
          else{
            if(this.color !== (pieceGrid[this.x + firstBaseVector][this.y + secondBaseVector]).color){
              attackMoves.push({x: this.x + firstBaseVector, y: this.y + secondBaseVector});
            }
          }
        }
      });
    });
    
    allAttackMoves.push(attackMoves);
    this.possibleAttackMoves = allAttackMoves;
    
    allMoves.push(moves);
    this.possibleOpenMoves = allMoves;
  }
  
  move(x, y){
    let found = {ok: false, type: undefined};
    this.possibleOpenMoves.forEach((e) => {
      e.forEach((ee) => {
        if((ee.x === x) && (ee.y === y)){
          if(Math.abs(this.y - ee.y) == 2){
            
            
            if(this.color === "black" && this.x === 0 && this.y === 4){
              if(Math.abs(ee.y - 7) > ee.y){
                pieceGrid[0][0] = "0";
                pieceGrid[0][3] = new rook(0, 3, "black");
                
                found = {ok: true, type: "c"};
              }
              else{
                pieceGrid[0][7] = "0";
                pieceGrid[0][5] = new rook(0, 3, "black");
                
                found = {ok: true, type: "c"};
              }
              
              pieceGrid[ee.x][ee.y] = new king(ee.x, ee.y, this.color);
              pieceGrid[this.x][this.y] = "0";
              
              found = found.type ? found : {ok: true, type: "m"};
              
              this.hasMoveBefore = true;
            }
            
            else if(this.color === "black" && this.x === 7 && this.y === 3){
              if(Math.abs(ee.y - 7) > ee.y){
                pieceGrid[7][0] = "0";
                pieceGrid[7][2] = new rook(7, 2, "black");
                
                found = {ok: true, type: "c"};
              }
              else{
                pieceGrid[7][7] = "0";
                pieceGrid[7][4] = new rook(7, 4, "black");
                
                found = {ok: true, type: "c"};
              }
              
              
              pieceGrid[ee.x][ee.y] = new king(ee.x, ee.y, this.color);
              pieceGrid[this.x][this.y] = "0";
              
              found = found.type ? found : {ok: true, type: "m"};
              
              this.hasMoveBefore = true;
              
            }
            
            
            else if(this.color === "white" && this.x === 0 && this.y === 3){
              if(Math.abs(ee.y - 7) > ee.y){
                pieceGrid[0][0] = "0";
                pieceGrid[0][2] = new rook(0, 2, "white");
                
                found = {ok: true, type: "c"};
              }
              else{
                pieceGrid[0][7] = "0";
                pieceGrid[0][4] = new rook(0, 4, "white");
                
                found = {ok: true, type: "c"};
              }
              
              
              pieceGrid[ee.x][ee.y] = new king(ee.x, ee.y, this.color);
              pieceGrid[this.x][this.y] = "0";
              
              found = found.type ? found : {ok: true, type: "m"};
              
              this.hasMoveBefore = true;
              
            }
            
            
            else if(this.color === "white" && this.x === 7 && this.y === 4){
              if(Math.abs(7 - ee.y) > ee.y){
                pieceGrid[7][0] = "0";
                pieceGrid[7][2] = new rook(7, 2, "white");
                
                found = {ok: true, type: "c"};
              }
              else{
                pieceGrid[7][7] = "0";
                pieceGrid[7][5] = new rook(7, 5, "black");
                
                found = {ok: true, type: "c"};
              }
              
              
              pieceGrid[ee.x][ee.y] = new king(ee.x, ee.y, this.color);
              pieceGrid[this.x][this.y] = "0";
              
              found = found.type ? found : {ok: true, type: "m"};
              
              this.hasMoveBefore = true;
              
            }
            
            
            
          }
          
          else{
            pieceGrid[ee.x][ee.y] = new king(ee.x, ee.y, this.color);
            pieceGrid[this.x][this.y] = "0";
            
            found = {ok: true, type: "m"};
            
            this.hasMoveBefore = true;
          }
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
          pieceGrid[ee.x][ee.y] = new king(ee.x, ee.y, this.color);
          pieceGrid[this.x][this.y] = "0";
          found = true;
          
          this.hasMoveBefore = true;
        }
      });
    });
    
    return found;
  }
}