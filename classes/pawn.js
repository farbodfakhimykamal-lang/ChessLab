import { pieceGrid } from "../chess.js";
import { isOpen } from "../chess.js";
import { queen } from "./queen.js";
import { rook } from "./rook.js";
import { bishop } from "./bishop.js";
import { knight } from "./knight.js";

export class pawn{
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
    
    if(this.color === "black"){
      let normalMoveVectors = [{x: -1, y: 0}];
      if(this.x === 6){
        normalMoveVectors = [
          {x: -1, y: 0},
          {x: -2, y: 0}
        ];
      }
      
      /*normalMoveVectors.forEach((e) => {
        if(pieceGrid[this.x + e.x][this.y + e.y] !== undefined){
          if(isOpen(pieceGrid, this.x + e.x, this.y + e.y)){
            allMoves.push([{x: this.x + e.x, y: this.y + e.y}]);
          }
        }
      });*/
      
      for(let i=0; i<normalMoveVectors.length; i++){
        if(pieceGrid[this.x + normalMoveVectors[i].x] !== undefined){
          if(pieceGrid[this.x + normalMoveVectors[i].x][this.y + normalMoveVectors[i].y] !== undefined){
            if(isOpen(pieceGrid, this.x + normalMoveVectors[i].x, this.y + normalMoveVectors[i].y)){
              allMoves.push([{x: this.x + normalMoveVectors[i].x, y: this.y + normalMoveVectors[i].y}]);
            }
            else{
              break;
            }
          }
        }
      }
      
      /*if(isOpen(pieceGrid, this.x - 1, this.y)){
        allMoves.push([{x: this.x - 1, y: this.y}]);
      }*/
      
      let moveVectors = [
        {x: -1, y: -1},
        {x: -1, y: 1}
      ];
      
      moveVectors.forEach((e) => {
        if(pieceGrid[this.x + e.x] !== undefined){
          if(pieceGrid[this.x + e.x][this.y + e.y] !== undefined){
            if(!isOpen(pieceGrid, this.x + e.x, this.y + e.y) && 
              ((pieceGrid[this.x + e.x][this.y + e.y]).color !== this.color)
            ){
              attackMoves.push({x: this.x + e.x, y: this.y + e.y});
            }
          }
        }
      });
    }
    else{
      let normalMoveVectors = [{x: 1, y: 0}];
      if(this.x === 1){
        normalMoveVectors = [
          {x: 1, y: 0},
          {x: 2, y: 0}
        ];
      }
      
      /*normalMoveVectors.forEach((e) => {
        if(pieceGrid[this.x + e.x][this.y + e.y] !== undefined){
          if(isOpen(pieceGrid, this.x + e.x, this.y + e.y)){
            allMoves.push([{x: this.x + e.x, y: this.y + e.y}]);
          }
        }
      });*/
      
      for(let i=0; i<normalMoveVectors.length; i++){
        if(pieceGrid[this.x + normalMoveVectors[i].x] !== undefined){
          if(pieceGrid[this.x + normalMoveVectors[i].x][this.y + normalMoveVectors[i].y] !== undefined){
            if(isOpen(pieceGrid, this.x + normalMoveVectors[i].x, this.y + normalMoveVectors[i].y)){
              allMoves.push([{x: this.x + normalMoveVectors[i].x, y: this.y + normalMoveVectors[i].y}]);
            }
            else{
              break;
            }
          }
        }
      }
      
      /*if(isOpen(pieceGrid, this.x + 1, this.y)){
        allMoves.push([{x: this.x + 1, y: this.y}]);
      }*/
      
      let moveVectors = [
        {x: 1, y: 1},
        {x: 1, y: -1}
      ];
      
      moveVectors.forEach((e) => {
        if(pieceGrid[this.x + e.x] !== undefined){
          if(pieceGrid[this.x + e.x][this.y + e.y] !== undefined){
              if(!isOpen(pieceGrid, this.x + e.x, this.y + e.y) && 
              ((pieceGrid[this.x + e.x][this.y + e.y]).color !== this.color)
            ){
              attackMoves.push({x: this.x + e.x, y: this.y + e.y});
            }
          }
        }
      });
    }
    
    allAttackMoves.push(attackMoves);
    
    this.possibleAttackMoves = allAttackMoves;
    this.possibleOpenMoves = allMoves;
  }
  
  move(x, y){
    let found = {ok: false, type: undefined};
    this.possibleOpenMoves.forEach((e) => {
      e.forEach((ee) => {
        if((ee.x === x) && (ee.y === y)){
          if(this.color === "black"){
            if(ee.x === 0){
              this.turn(ee.x, ee.y, "q");
              pieceGrid[this.x][this.y] = "0";
              found = {ok: true, type: "mt"};
            }
            else{
              pieceGrid[ee.x][ee.y] = new pawn(ee.x, ee.y, this.color);
              pieceGrid[this.x][this.y] = "0";
              found = {ok: true, type: "m"};
            }
          }
          
          else{
            if(ee.x === 7){
              this.turn(ee.x, ee.y, "q");
              pieceGrid[this.x][this.y] = "0";
              found = {ok: true, type: "mt"};
            }
            else{
              pieceGrid[ee.x][ee.y] = new pawn(ee.x, ee.y, this.color);
              pieceGrid[this.x][this.y] = "0";
              found = {ok: true, type: "m"};
            }
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
          if(this.color === "black"){
            if(ee.x === 0){
              this.turn(ee.x, ee.y, "q");
              pieceGrid[this.x][this.y] = "0";
              found = {ok: true, type: "at"};
            }
            else{
              pieceGrid[ee.x][ee.y] = new pawn(ee.x, ee.y, this.color);
              pieceGrid[this.x][this.y] = "0";
              found = {ok: true, type: "a"};
            }
          }
          
          else{
            if(ee.x === 7){
              this.turn(ee.x, ee.y, "q");
              pieceGrid[this.x][this.y] = "0";
              found = {ok: true, type: "at"};
            }
            else{
              pieceGrid[ee.x][ee.y] = new pawn(ee.x, ee.y, this.color);
              pieceGrid[this.x][this.y] = "0";
              found = {ok: true, type: "a"};
            }
          }
        }
      });
    });
    
    return found;
  }
  
  turn(x, y, type){
    //let choice = prompt("Enter your piece of choice: ");
    
    switch(type){
      case "q":
        pieceGrid[x][y] = new queen(x, y, this.color);
        break;
      case "r":
        pieceGrid[x][y] = new rook(x, y, this.color);
        break;
      case "b":
        pieceGrid[x][y] = new bishop(x, y, this.color);
        break;
      case "k":
        pieceGrid[x][y] = new knight(x, y, this.color);
        break;
    }
  }
}