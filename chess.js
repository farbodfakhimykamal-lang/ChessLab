import { rook } from "./classes/rook.js";
import { queen } from "./classes/queen.js";
import { bishop } from "./classes/bishop.js";
import { king } from "./classes/king.js";
import { knight } from "./classes/knight.js";
import { pawn } from "./classes/pawn.js";

let displayGrid = [
  ["r", "k", "b", "l", "q", "b", "k", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["r", "k", "b", "l", "q", "b", "k", "r"]
  ];
  
export let pieceGrid = [
  ["r", "k", "b", "l", "q", "b", "k", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["r", "k", "b", "l", "q", "b", "k", "r"]
  ];
let kingCordinates = {black: {x: 7, y: 3},
                      white: {x: 0, y: 3}};
 
function checkUpdator(){
  pieceGrid.forEach((l, i) => {
     l.forEach((p, j) => {
       if(p !== "0"){
         //console.log(p);
         let m = checkLockedMoveRemover(p);
         p.possibleOpenMoves = m[0];
         p.possibleAttackMoves = m[1];
         
       }
     });
   });
}
 
function gameEnded(turn){
   moveUpdator();
   
   pieceGrid.forEach((l, i) => {
     l.forEach((p, j) => {
       if(p !== "0"){
         //console.log(p);
         [(pieceGrid[i][j]).possibleOpenMoves, (pieceGrid[i][j]).possibleAttackMoves] = checkLockedMoveRemover(pieceGrid[i][j]);
       }
     });
   });
   
  if(checkTester("white")){
     let kingy = kingCordinatesSearch(pieceGrid, "white");
     let numberOfAllMoves = 0;
     
     (pieceGrid[kingy.x][kingy.y]).possibleOpenMoves.forEach(l => {
       numberOfAllMoves += l.length;
     });
     
     (pieceGrid[kingy.x][kingy.y]).possibleAttackMoves.forEach(l => {
       numberOfAllMoves += l.length;
     });
     
     let allowedMoves = uncheckMovesNotKing("white");
     let number = (allowedMoves[0]).length + (allowedMoves[1]).length;
     
     if((numberOfAllMoves === 0) && (number === 0)){
       return {end: true, winner: "black"};
     }
  }
  else if(checkTester("black")){
     let kingy = kingCordinatesSearch(pieceGrid, "black");
     let numberOfAllMoves = 0;
     
     (pieceGrid[kingy.x][kingy.y]).possibleOpenMoves.forEach(l => {
       numberOfAllMoves += l.length;
     });
     
     (pieceGrid[kingy.x][kingy.y]).possibleAttackMoves.forEach(l => {
       numberOfAllMoves += l.length;
     });
     
     let allowedMoves = uncheckMovesNotKing("black");
     let number = (allowedMoves[0]).length + (allowedMoves[1]).length;
     
     if((numberOfAllMoves === 0) && (number === 0)){
       return {end: true, winner: "white"};
     }
  }
  else if(true){
    let numberOfAllAlowedMoves = 0;
    
    //console.log(turn);
    pieceGrid.forEach((l, i) => {
      l.forEach((p, j) => {
        if(p !== "0"){
          if(p.color === turn){
            p.possibleOpenMoves.forEach(e => {
              numberOfAllAlowedMoves += e.length;
              //console.log(e);
            });
            
            p.possibleAttackMoves.forEach(e => {
              numberOfAllAlowedMoves += e.length;
            });
          } 
        }
        
      });
    });
    
    //console.log(numberOfAllAlowedMoves);
    if(numberOfAllAlowedMoves === 0){
      return {end: true, winner: "stalemate"};
    }
  }
   
   
    return {end: false, winner: "none"};
}

function uncheckMovesNotKing(color){
  let backupBoard = boardClone(pieceGrid);
  let allowedOpenMoves = [];
  let allowedAttackMoves = [];
  
  backupBoard.forEach((l, i) => {
    l.forEach((p, j) => {
      if(p.color === color){
        p.possibleOpenMoves.forEach(line => {
          line.forEach(e => {
            (pieceGrid[i][j]).move(e.x, e.y);
            if(!checkTester(color)){
              allowedOpenMoves.push({cordinates: {x: i, y: j},
                                 vector: structuredClone(e)});
            }
            pieceGrid = boardClone(backupBoard);
          });
        });
        
        p.possibleAttackMoves.forEach(line => {
          line.forEach(e => {
            if((pieceGrid[e.x][e.y]).constructor.name !== "king"){
              (pieceGrid[i][j]).take(e.x, e.y);
              if(!checkTester(color)){
                allowedAttackMoves.push({cordinates: {x: i, y: j},
                                   vector: structuredClone(e)});
              }
              pieceGrid = boardClone(backupBoard);
            }
          });
        });
      }
    });
  });
  
  
  
  
  return [allowedOpenMoves, allowedAttackMoves];
}

function boardClone(board){
  let eachLine = [];
  let newBoard = board.map((line, i) => {
    eachLine = [];
    line.forEach((item, j) => {
      if(item === "0"){
        eachLine.push("0");
      }
      
      switch(item.constructor.name){
        case "king":
          eachLine.push(new king(i, j, item.color));
          (eachLine[j]).possibleOpenMoves = structuredClone(item.possibleOpenMoves);
          (eachLine[j]).possibleAttackMoves = structuredClone(item.possibleAttackMoves);
          (eachLine[j]).hasMoveBefore = item.hasMoveBefore;
          (eachLine[j]).hasBeenChecked = item.hasBeenChecked;
          break;
        case "queen":
          eachLine.push(new queen(i, j, item.color));
          (eachLine[j]).possibleOpenMoves = structuredClone(item.possibleOpenMoves);
          (eachLine[j]).possibleAttackMoves = structuredClone(item.possibleAttackMoves);
          break;
        case "bishop":
          eachLine.push(new bishop(i, j, item.color));
          (eachLine[j]).possibleOpenMoves = structuredClone(item.possibleOpenMoves);
          (eachLine[j]).possibleAttackMoves = structuredClone(item.possibleAttackMoves);
          break;
        case "knight":
          eachLine.push(new knight(i, j, item.color));
          (eachLine[j]).possibleOpenMoves = structuredClone(item.possibleOpenMoves);
          (eachLine[j]).possibleAttackMoves = structuredClone(item.possibleAttackMoves);
          break;
        case "rook":
          eachLine.push(new rook(i, j, item.color));
          (eachLine[j]).possibleOpenMoves = structuredClone(item.possibleOpenMoves);
          (eachLine[j]).possibleAttackMoves = structuredClone(item.possibleAttackMoves);
          (eachLine[j]).hasMoveBefore = item.hasMoveBefore;
          break;
        case "pawn":
          eachLine.push(new pawn(i, j, item.color));
          (eachLine[j]).possibleOpenMoves = structuredClone(item.possibleOpenMoves);
          (eachLine[j]).possibleAttackMoves = structuredClone(item.possibleAttackMoves);
          break;
      }
    });
    
    return eachLine;
  });
  
  return newBoard;
}

function moveUpdator(){
  pieceGrid.forEach(l => {
    l.forEach(p => {
      if(p !== "0"){
        p.possibleOpenMovesf();
      }
    });
  });
}

function checkTester(color){
  let backupBoard = boardClone(pieceGrid);
  let kingy = kingCordinatesSearch(pieceGrid, color);
  moveUpdator();
  
  for(let i=0; i<pieceGrid.length; i++){
    for(let j=0; j<(pieceGrid[i]).length; j++){
      
      if(pieceGrid[i][j] !== "0"){
        
        let p = pieceGrid[i][j];
        for(let k=0; k<p.possibleAttackMoves.length; k++){
          for(let m=0; m<(p.possibleAttackMoves[k]).length; m++){
            
            if((p.possibleAttackMoves[k][m]).x === kingy.x && 
              (p.possibleAttackMoves[k][m]).y === kingy.y &&
               p.color !== color){
                 
                pieceGrid = boardClone(backupBoard);
                return true;
              }
          }
        }
      }
      
    }
  }
  
  pieceGrid = boardClone(backupBoard);
  return false;
}


  
let auxilaryPieceGrid = structuredClone(pieceGrid);
let auxilaryKingCordinates = {black: {x: 7, y: 4},
                              white: {x: 0, y: 3}};
let secondAuxilaryPieceGrid = structuredClone(pieceGrid);
let secondAuxilaryKingCordinates = {black: {x: 7, y: 4},
                              white: {x: 0, y: 3}};
let pg = structuredClone(pieceGrid);
let aKingCordinates = structuredClone(kingCordinates);

export function isOpen(array, x, y){
  if(array[x][y] === "0"){
    return true;
  }
  else{
    return false;
  }
}

function kingCordinatesUpdater(Grid, kingObject){
  Grid.forEach(l => {
    l.forEach(p => {
      if(p.constructor.name === "king"){
        if(p.color === "black"){
          kingObject.black.x = p.x;
          kingObject.black.y = p.y;
        }
        
        else{
          kingObject.white.x = p.x;
          kingObject.white.y = p.y;
        }
      }
    });
  });
}

function kingCordinatesSearch(Grid, color){
  
  for(let i=0; i<Grid.length; i++){
    for(let j=0; j<(Grid[i]).length; j++){
      if(Grid[i][j] !== "0"){
        if((Grid[i][j]).constructor.name === "king"){
          if((Grid[i][j]).color === color){
            return {x: (Grid[i][j]).x,
                    y: (Grid[i][j]).y
            };
          }
        }
      }
    }
  }
}

function auxilaryCordinator(){
  auxilaryPieceGrid = structuredClone(pieceGrid);
  secondAuxilaryPieceGrid = structuredClone(pieceGrid);
  
  kingCordinatesUpdater(auxilaryPieceGrid, auxilaryKingCordinates);
  kingCordinatesUpdater(secondAuxilaryPieceGrid, secondAuxilaryKingCordinates);
  
  pg = structuredClone(pieceGrid);
  pg = structuredClone(kingCordinates);
  
  /**/
}

function checkLockedMoveRemover(piece){
  //console.log(piece);
  let backupBoard = boardClone(pieceGrid);
  
  piece.possibleOpenMovesf();
  let nameOf = structuredClone(piece.constructor.name);
  let x = piece.x;
  let y = piece.y;
  let color = piece.color;
  let moveArray = structuredClone(piece.possibleOpenMoves);
  let attackArray = structuredClone(piece.possibleAttackMoves);
  
  //console.log(moveArray, attackArray);
  
  let newMoveArray = moveArray.map(l => {
    let newLine = l.filter(e => {
      pieceGrid = boardClone(backupBoard);
      (pieceGrid[x][y]).move(e.x, e.y);
      moveUpdator();
      
      return !checkTester(color);
    });
    
    return newLine;
  });
    
  let newAttackArray = attackArray.map(l => {
    let newLine = l.filter(e => {
      pieceGrid = boardClone(backupBoard);
      if((pieceGrid[e.x][e.y]).constructor.name !== "king"){
        (pieceGrid[x][y]).take(e.x, e.y);
        moveUpdator();
        //console.log(!checkTester(color));
        return !checkTester(color);
      }
    });
  
    
  return newLine;
  });
  
  if(nameOf === "king"){
    newMoveArray = newMoveArray.map(l => {
      let newLine = l.filter(e => {
        if(Math.abs(e.y - y) === 2){
          //console.log("entered" + String(arrayIncludes(newMoveArray, {xx: e.x, yy: (e.y - y)/2 + y})));
          return arrayIncludes(newMoveArray, {xx: e.x, yy: (e.y - y)/2 + y});
        }
        else{
          return true;
        }
      });
      
      return newLine;
    });
  }
  
  
  pieceGrid = boardClone(backupBoard);
  
  return [newMoveArray, newAttackArray];
  //console.log(newMoveArray);
  //console.log(newAttackArray);
  
}

function arrayIncludes(arr, Obj){
  for(let counter = 0; counter < arr.length; counter++){
    for(let i=0; i<(arr[counter]).length; i++){
      //console.log(arr[counter][i]);
      if((arr[counter][i]).x === Obj.xx &&
      (arr[counter][i]).y === Obj.yy){
        return true;
      }
    }
  }
  
  console.log("not found");
  return false;
}

function printBoard(){
  console.clear();
  let board = "\n";
  let add = null;
  displayGrid.forEach((line) => {
    add = (JSON.stringify(line)).replace(/,/g, ' ');
    add = (add).replace(/"/g, '');
    board = board + add + '\n';
  });
  console.log(board);
}

function boardInit(){
  let eachLine = [];
  let newBoard = pieceGrid.map((line, i) => {
    let color = (i < 3) ? "white" : "black";
    eachLine = [];
    line.forEach((item, j) => {
      switch(item){
        case "l":
          eachLine.push(new king(i, j, color));
          break;
        case "q":
          eachLine.push(new queen(i, j, color));
          break;
        case "b":
          eachLine.push(new bishop(i, j, color));
          break;
        case "k":
          eachLine.push(new knight(i, j, color));
          break;
        case "r":
          eachLine.push(new rook(i, j, color));
          break;
        case "p":
          eachLine.push(new pawn(i, j, color));
          break;
        case "0":
          eachLine.push("0");
      }
    });
    
    return eachLine;
  });
  
  pieceGrid = newBoard;
}

function boardDisplayUpdator(){
  let eachLine = [];
  let newDisplay = pieceGrid.map((line, i) => {
    eachLine = [];
    line.forEach((item, j) => {
      
      if(item === "0"){
        eachLine.push("0");
      }
      else{
        switch(item.constructor.name){
          case "king":
            eachLine.push("l");
            break;
          case "queen":
            eachLine.push("q");
            break;
          case "bishop":
            eachLine.push("b");
            break;
          case "knight":
            eachLine.push("k");
            break;
          case "rook":
            eachLine.push("r");
            break;
          case "pawn":
            eachLine.push("p");
            break;
        }
      }
    });
    
    return eachLine;
  });
  
  displayGrid = newDisplay;
}

printBoard();
boardInit();


/*pieceGrid[5][5] = new pawn(5, 5, "white");
pieceGrid[5][5].possibleOpenMovesf();*/
printBoard();
/*console.log((pieceGrid[5][5]).constructor.name)
pieceGrid[5][5].take(6, 4);*/

/*console.log(pieceGrid);
console.log(pieceGrid[5][5].possibleAttackMoves);
console.log(pieceGrid);*/


/*pieceGrid[6][3] = "0";
pieceGrid[6][4] = "0";
pieceGrid[6][5] = "0";

pieceGrid[5][4] = new pawn(5, 4, "white");
pieceGrid[5][5] = new rook(5, 5, "white");
pieceGrid[5][2] = new queen(5, 2, "white");*/
//pieceGrid[4][2] = new bishop(5, 2, "white");

//(pieceGrid[7][4]).possibleOpenMovesf();
//checkVulnerableMoveRemover(pieceGrid[7][4]);
//console.log((pieceGrid[7][4]).possibleOpenMoves);
//kingCordinatesUpdater(pieceGrid, kingCordinates);
//console.log(kingCordinates);
moveUpdator();

//[(pieceGrid[7][4]).possibleOpenMoves, (pieceGrid[7][4]).possibleAttackMoves] = checkLockedMoveRemover(pieceGrid[7][4]);

//(pieceGrid[7][4]).move(6, 4);

//moveUpdator();

//[(pieceGrid[7][4]).possibleOpenMoves, (pieceGrid[7][4]).possibleAttackMoves] = checkLockedMoveRemover(pieceGrid[7][4]);
//(pieceGrid[7][4]).take(5, 4);
//checkLockedMoveRemover(pieceGrid[7][4]);
//console.log((pieceGrid[7][4]).possibleOpenMoves);
//(pieceGrid[7][4]).move(6, 4);

//auxilaryPieceGrid = boardClone(pieceGrid);
////pieceGrid[6][4] = new rook(6, 4, "white");

//console.log(checkTester("black"));
console.log(pieceGrid);

boardDisplayUpdator();
printBoard();

//console.log((gameEnded()).end);

/*const namename = prompt("Please enter your name,");
console.log(namename);*/

let gameFlowMoves = [];
let gameFlowMovesRaw = [];
let gameFlowMovesReversable = [];
                    
let gameFlowMovesAutomation = [
                      "1 3 2 3",
                      "6 7 5 7",
                      "0 4 3 1",
                      "5 7 4 7",
                      "3 1 4 0",
                      "7 7 5 7",
                      "4 0 4 7",
                      "6 0 5 0",
                      "1 0 2 0",
                      "5 0 4 0",
                      "2 0 3 0",
                      "5 7 5 0",
                      "4 7 6 5",
                      "6 2 5 2",
                      "6 5 6 4",
                      "7 3 6 2",
                      "6 4 6 6",
                      "7 4 2 4",
                      "6 6 7 6",
                      "2 4 6 0",
                      "7 6 7 5",
                      "6 2 5 1"
                      //"7 5 5 3"
                    ];
let pawnTurning = [
                      
                      "1 3 2 3",
                      "6 7 5 7",
                      "0 2 5 7",
                      "7 7 6 7",
                      "5 7 0 2",
                      "6 7 5 7",
                      "0 2 5 7",
                      "6 0 5 0",
                      "5 7 0 2",
                      "5 0 4 0",
                      "1 7 3 7",
                      "4 0 3 0",
                      "3 7 4 7",
                      "3 0 2 0",
                      "4 7 5 7",
                      "6 1 5 1",
                      "5 7 6 7"
                    ];
let castling = [
  "1 3 3 3",
  "6 3 4 3",
  "1 2 3 2",
  "6 2 4 2",
  "1 1 3 1",
  "6 1 4 1",
  "1 0 3 0",
  "6 0 4 0",
  "1 4 2 4",
  "7 1 5 0",
  "0 5 2 3",
  "7 2 6 1",
  "2 3 4 5"
];
                    
                    
                    

function gameFlow(){
  moveUpdator();
  checkUpdator();
  
  let turn = "white";
  if(gameFlowMoves.length !== 0){
    let element = gameFlowMoves[gameFlowMoves.length - 1];
    turn = element[element.length - 1] === "white" ? "black" : "white";
  }
  
  if(!((gameEnded(turn)).end)){
    let input = prompt("Next Move: ");
    input = input.split(' ');
    
    input = input.map(e => Number(e));
    
    let allowed = false;
      
      if((pieceGrid[input[0]][input[1]]).color === turn){
        (pieceGrid[input[0]][input[1]]).possibleOpenMoves.forEach(l => {
          //console.log(l.includes({x: input[2], y: input[3]}));
          /*if(l.includes({x: input[2], y: input[3]})){
            allowed = true;
          }*/
          l.forEach(e => {
            if(e.x === input[2] && e.y === input[3]){
              allowed = true;
            }
          });
        });
        (pieceGrid[input[0]][input[1]]).possibleAttackMoves.forEach(l => {
          l.forEach(e => {
            if(e.x === input[2] && e.y === input[3]){
              if((pieceGrid[e.x][e.y]).constructor.name !== "king"){
                allowed = true;
              }
            }
          });
        });
      }
      
      
      if(allowed){
        input.push(turn);
        gameFlowMoves.push(input);
        
        if(isOpen(pieceGrid, input[2], input[3])){
          gameFlowMovesReversable.push((["m"]).concat(input));
          (pieceGrid[input[0]][input[1]]).move(input[2], input[3]);
        }
        else{
          gameFlowMovesReversable.push((["t", (pieceGrid[input[2]][input[3]]).constructor.name]).concat(input));
          (pieceGrid[input[0]][input[1]]).take(input[2], input[3]);
        }
        
        boardDisplayUpdator();
        printBoard();
        console.log("Done");
        if(checkTester("white")){
          console.log("Check: white");
        }
        else if(checkTester("black")){
          console.log("Check: black");
        }
        //gameEnded(turn);
        //console.log(pieceGrid);
        //console.log(gameFlowMoves);
      }
      else{
        printBoard();
        /*console.log(input);
        console.log(turn);
        console.log(pieceGrid[input[0]][input[1]]);*/
        
        console.log("Move wasn't allowed");
      }
      
    }
  
  else{
    boardDisplayUpdator();
    printBoard();
    console.log("The game has ended!");
    console.log((gameEnded(turn)).winner !== "stalemate" ? `Winner: ${(gameEnded(turn)).winner}` : "Draw");
    console.log(JSON.stringify(gameFlowMoves));
    //console.log(`Winner: ${(gameEnded(turn)).winner}`);
  }
}

function gameFlowAutomation(inputt){
  moveUpdator();
  checkUpdator();
  
  let turn = "white";
  if(gameFlowMoves.length !== 0){
    let element = gameFlowMoves[gameFlowMoves.length - 1];
    turn = element[element.length - 1] === "white" ? "black" : "white";
  }
  
  if(!((gameEnded(turn)).end)){
    if(inputt !== ""){
      let input = inputt;
      input = input.split(' ');
      
      input = input.map(e => Number(e));
      
      let allowed = false;
      
      if((pieceGrid[input[0]][input[1]]).color === turn){
        (pieceGrid[input[0]][input[1]]).possibleOpenMoves.forEach(l => {
          //console.log(l.includes({x: input[2], y: input[3]}));
          /*if(l.includes({x: input[2], y: input[3]})){
            allowed = true;
          }*/
          l.forEach(e => {
            if(e.x === input[2] && e.y === input[3]){
              allowed = true;
            }
          });
        });
        (pieceGrid[input[0]][input[1]]).possibleAttackMoves.forEach(l => {
          l.forEach(e => {
            if(e.x === input[2] && e.y === input[3]){
              if((pieceGrid[e.x][e.y]).constructor.name !== "king"){
                allowed = true;
              }
            }
          });
        });
      }
      
      
      if(allowed){
        input.push(turn);
        gameFlowMoves.push(input);
        gameFlowMovesRaw.push(inputt);
        
        if(isOpen(pieceGrid, input[2], input[3])){
          if((pieceGrid[input[0]][input[1]]).constructor.name === "pawn"){
            gameFlowMovesReversable.push(([((pieceGrid[input[0]][input[1]]).move(input[2], input[3])).type]).concat(input));
          }
          
          else if((pieceGrid[input[0]][input[1]]).constructor.name === "king"){
            let moveObj = (pieceGrid[input[0]][input[1]]).move(input[2], input[3]);
            gameFlowMovesReversable.push(([moveObj.type]).concat(input));
          }
          else{
            (pieceGrid[input[0]][input[1]]).move(input[2], input[3]);
            gameFlowMovesReversable.push((["m"]).concat(input));
          }
        }
        else{
          if((pieceGrid[input[0]][input[1]]).constructor.name === "pawn"){
            gameFlowMovesReversable.push(([((pieceGrid[input[0]][input[1]]).take(input[2], input[3])).type, (pieceGrid[input[2]][input[3]]).constructor.name]).concat(input));
          }
          else{
            gameFlowMovesReversable.push((["a", (pieceGrid[input[2]][input[3]]).constructor.name]).concat(input));
            (pieceGrid[input[0]][input[1]]).take(input[2], input[3]);
            
          }
        }
        
        boardDisplayUpdator();
        printBoard();
        htmlBoardImageAdjuster(htmlGrid, pieceGrid);
        console.log("Done");
        if(checkTester("white")){
          console.log("Check: white");
          let white = kingCordinatesSearch(pieceGrid, "white");
          
          (pieceGrid[white.x][white.y]).hasBeenChecked = true;
        }
        else if(checkTester("black")){
          console.log("Check: black");
          let black = kingCordinatesSearch(pieceGrid, "black");
          
          (pieceGrid[black.x][black.y]).hasBeenChecked = true;
        }
        //gameEnded(turn);
        //console.log(pieceGrid);
        //console.log(gameFlowMoves);
      }
      else{
        printBoard();
        /*console.log(input);
        console.log(turn);
        console.log(pieceGrid[input[0]][input[1]]);*/
        
        console.log("Move wasn't allowed");
      }
      
    }
  }
  else{
    boardDisplayUpdator();
    printBoard();
    console.log("The game has ended!");
    console.log((gameEnded(turn)).winner !== "stalemate" ? `Winner: ${(gameEnded(turn)).winner}` : "Draw");
    console.log(JSON.stringify(gameFlowMoves));
    console.log(JSON.stringify(gameFlowMovesRaw));
    //console.log(`Winner: ${(gameEnded(turn)).winner}`);
  }
}



//moveUpdator();
//console.log(checkTester("white"));
//console.log(checkTester("black"));
//console.log((pieceGrid[6][7]));
//console.log(checkLockedMoveRemover(pieceGrid[6][7]));
//checkUpdator();
//console.log(pieceGrid);

//gameFlowAutomation("5 1 4 1");
//moveUpdator();


/*window.addEventListener('keydown', (e) => {
  if(e.keyCode === 229){
    console.log(JSON.stringify(gameFlowMovesRaw, null, 2));
    console.log(JSON.stringify(gameFlowMovesReversable, null, 2));
    //console.log(pieceGrid);
    //gameFlow();
    document.querySelector(".gameFlowInput").value = JSON.stringify(gameFlowMovesRaw, null, 2);
  }
  console.log(e.keyCode);
}, {passive: false});*/

document.querySelector('#populate').onclick = () => {
  console.log(JSON.stringify(gameFlowMovesRaw, null, 2));
  console.log(JSON.stringify(gameFlowMovesReversable, null, 2));
  //console.log(pieceGrid);
  //gameFlow();
  document.querySelector(".gameFlowInput").value = JSON.stringify(gameFlowMovesRaw, null, 2);
}

document.querySelector('#save').onclick = () => {
  (readFile()).then((result) => {
    console.log(result);
    
    let fileContent = result;
    fileContent += "&";
    fileContent += JSON.stringify(gameFlowMovesRaw, null, 2);
    
    saveFile(fileContent);
  });
  
  document.querySelector(".gameFlowInput").value = JSON.stringify(gameFlowMovesRaw, null, 2);
}

document.querySelector('#saved-games').onclick = () => {
  //console.log(JSON.stringify(gameFlowMovesRaw, null, 2));
  //console.log(JSON.stringify(gameFlowMovesReversable, null, 2));
  //gameFlow();
  
  (readFile()).then((result) => {
    //console.log(result);
    
    let fileContent = result;
    fileContent = fileContent.split("&");
    
    fileContent.forEach((e, i) => {
      document.querySelector("#file-loading-page").innerHTML += `<div id="listElement${i+1}" class="gameListnew">${i + 1} ${e}</div>`;
      document.querySelector("#listElement" + String(i + 1)).onclick = () => gameLoading(e); 
    });
    
  });
  
  /*for(let i=0; i<20; i++){
   document.querySelector(".file-loading-page").innerHTML += `<div class="gameListnew">list 2</div>`;
   
  }*/
  
  document.querySelector("#file-loading-page").style.display = "flex";
}

document.querySelector('.run').onclick = () => {
  let sourxe = document.querySelector('.gameFlowInput').value;
  
  //console.log(sourxe);
  sourxe = JSON.parse(sourxe);
  
  sourxe.forEach(e => {
    gameFlowAutomation(e);
  });
}

document.querySelector('.back').onclick = () => {
  if(gameFlowMovesReversable.length !== 0){
    let l = gameFlowMovesReversable.length - 1;
    let classMap = {
          "king": king,
          "queen": queen,
          "rook": rook,
          "bishop": bishop,
          "knight": knight,
          "pawn": pawn
        };
        
    let info = gameFlowMovesReversable[l];
    
    switch(gameFlowMovesReversable[l][0]){
      
      case "m":
        pieceGrid[info[1]][info[2]] = new classMap[(pieceGrid[info[3]][info[4]]).constructor.name](info[1], info[2], info[5]);
        pieceGrid[info[3]][info[4]] = "0";
        
        gameFlowMovesReversable.splice(l, 1);
        gameFlowMovesRaw.splice(l, 1);
        gameFlowMoves.splice(l, 1);
        
        boardDisplayUpdator();
        printBoard();
        htmlBoardImageAdjuster(htmlGrid, pieceGrid);
        console.log("Back");
        break;
        
      case "a":
        pieceGrid[info[2]][info[3]] = new classMap[(pieceGrid[info[4]][info[5]]).constructor.name](info[2], info[3], info[6]);
        pieceGrid[info[4]][info[5]] = new classMap[info[1]](info[4], info[5], info[6] === "black" ? "white" : "black");
        
        gameFlowMovesReversable.splice(l, 1);
        gameFlowMovesRaw.splice(l, 1);
        gameFlowMoves.splice(l, 1);
        
        boardDisplayUpdator();
        printBoard();
        htmlBoardImageAdjuster(htmlGrid, pieceGrid);
        console.log("Back");
        break;
        
      case "c":
        castleBackHandle(info);
        
        gameFlowMovesReversable.splice(l, 1);
        gameFlowMovesRaw.splice(l, 1);
        gameFlowMoves.splice(l, 1);
        
        boardDisplayUpdator();
        printBoard();
        htmlBoardImageAdjuster(htmlGrid, pieceGrid);
        console.log("Back");
        break;
        
      case "mt":
        pieceGrid[info[1]][info[2]] = new classMap["pawn"](info[1], info[2], info[5]);
        pieceGrid[info[3]][info[4]] = "0";
        
        gameFlowMovesReversable.splice(l, 1);
        gameFlowMovesRaw.splice(l, 1);
        gameFlowMoves.splice(l, 1);
        
        boardDisplayUpdator();
        printBoard();
        htmlBoardImageAdjuster(htmlGrid, pieceGrid);
        console.log("Back");
        break;
        
      case "at":
        pieceGrid[info[2]][info[3]] = new classMap["pawn"](info[2], info[3], info[6]);
        pieceGrid[info[4]][info[5]] = new classMap[info[1]](info[4], info[5], info[6] === "black" ? "white" : "black");
        
        gameFlowMovesReversable.splice(l, 1);
        gameFlowMovesRaw.splice(l, 1);
        gameFlowMoves.splice(l, 1);
        
        boardDisplayUpdator();
        printBoard();
        htmlBoardImageAdjuster(htmlGrid, pieceGrid);
        console.log("Back");
        break;
        
    }
  }
}

function gameLoading(gameJSON){
  let gameString = JSON.parse(gameJSON);
  
  gameString.forEach(e => {
    gameFlowAutomation(e);
  });
  
  document.querySelector("#file-loading-page").style.display = "none";
  document.querySelector("#file-loading-page").innerHTML = "";
}

function castleBackHandle(info){
  
  if(info[5] === "black" && info[1] === 0 && info[2] === 4){
    if(Math.abs(info[4] - 7) > info[4]){
      pieceGrid[0][0] = new rook(0, 0, "black");
      pieceGrid[0][3] = "0";
    }
    else{
      pieceGrid[0][7] = new rook(0, 7, "black");
      pieceGrid[0][5] = "0";
    }
    
    pieceGrid[info[3]][info[4]] = "0";
    pieceGrid[info[1]][info[2]] = new king(info[1], info[2], info[5]);
  }
  
  else if(info[5] === "black" && info[1] === 7 && info[2] === 3){
    if(Math.abs(info[4] - 7) > info[4]){
      pieceGrid[7][0] = new rook(7, 0, "black");
      pieceGrid[7][2] = "0";
    }
    else{
      pieceGrid[7][7] = new rook(7, 4, "black");
      pieceGrid[7][4] = "0";
    }
    
    pieceGrid[info[3]][info[4]] = "0";
    pieceGrid[info[1]][info[2]] = new king(info[1], info[2], info[5]);
  }
  
  
  else if(info[5] === "white" && info[1] === 0 && info[2] === 3){
    if(Math.abs(info[4] - 7) > info[4]){
      pieceGrid[0][0] = new rook(0, 0, "white");
      pieceGrid[0][2] = "0";
    }
    else{
      pieceGrid[0][7] = new rook(0, 7, "white");
      pieceGrid[0][4] = "0";
    }
    
    pieceGrid[info[3]][info[4]] = "0";
    pieceGrid[info[1]][info[2]] = new king(info[1], info[2], info[5]);
  }
  
  
  else if(info[5] === "white" && info[1] === 7 && info[2] === 4){
    if(Math.abs(7 - info[4]) > info[4]){
      pieceGrid[7][0] = new rook(7, 0, "white");
      pieceGrid[7][2] = "0";
    }
    else{
      pieceGrid[7][7] = new rook(7, 7, "black");
      pieceGrid[7][5] = "0";
    }
    
    pieceGrid[info[3]][info[4]] = "0";
    pieceGrid[info[1]][info[2]] = new king(info[1], info[2], info[5]);
  }
    
}

function htmlBoardGraber(){
  let array = [];
  for(let i=0; i<=7; i++){
    let line = [];
    for(let j=0; j<=7; j++){
      line.push(0);
    }
    array.push(line);
  }
  
  array.forEach((l, i) => {
    l.forEach((e, j) => {
      array[i][j] = document.querySelector(`#a${i}${j}`);
    });
  });
  
  return array;
}

let transitionHandle = {handle: undefined};

function transitionFunc(cords, handleObj){
  if(!handleObj.handle){
    console.log(handleObj.handle);
    handleObj.handle = {x: cords.x, y: cords.y};
    console.log(cords.x, cords.y);
  }
  else{
    gameFlowAutomation(`${handleObj.handle.x} ${handleObj.handle.y} ${cords.x} ${cords.y}`);
    handleObj.handle = undefined;
  }
}

function  htmlBoardImageAdjuster(grid, jsPieceGrid){
  grid.forEach((l, i) => {
    l.forEach((e, j) => {
      if(jsPieceGrid[i][j] === "0"){
        e.innerHTML = "";
      }
      else{
        switch((jsPieceGrid[i][j]).constructor.name){
          case "king":
            e.innerHTML = `<img src="./icons/${(jsPieceGrid[i][j]).color}-king.png" style="height:44px;width:44px;" />`;
            break;
          case "queen":
            e.innerHTML = `<img src="./icons/${(jsPieceGrid[i][j]).color}-queen.png" style="height:44px;width:44px;" />`;
            break;
          case "knight":
            e.innerHTML = `<img src="./icons/${(jsPieceGrid[i][j]).color}-knight.png" style="height:44px;width:44px;" />`;
            break;
          case "bishop":
            e.innerHTML = `<img src="./icons/${(jsPieceGrid[i][j]).color}-bishop.png" style="height:44px;width:44px;" />`;
            break;
          case "rook":
            e.innerHTML = `<img src="./icons/${(jsPieceGrid[i][j]).color}-rook.png" style="height:44px;width:44px;" />`;
            break;
          case "pawn":
            e.innerHTML = `<img src="./icons/${(jsPieceGrid[i][j]).color}-pawn.png" style="height:44px;width:44px;" />`;
            break;
        }
      }
    });
  });
  
  
}

function  htmlBoardClickHook(grid){
  grid.forEach((l, i) => {
    l.forEach((e, j) => {
      e.addEventListener('click', event => {
        transitionFunc({x: i, y: j}, transitionHandle);
      });
    });
  });
}

let htmlGrid = htmlBoardGraber();

htmlBoardImageAdjuster(htmlGrid, pieceGrid);
htmlBoardClickHook(htmlGrid);

 //document.querySelector(".file-loading-page").innerHTML.concat(`<div class="gameListnew">list 2</div>`);
 //let fileLoadingPageHtml = JSON.stringify(document.querySelector(".file-loading-page").innerHTML);
 
 
 
// document.querySelector(".file-loading-page").style.display = "flex";
 //document.querySelector(".file-loading-page").insertAdjacentHTML('beforeend', `<div class="gameListnew">list 2</div>`);

//let newH = `<div class="gameListnew">list 2</div>`;

//fileLoadingPageHtml.insertAdjacentHTML('beforeend', newH);
//fileLoadingPageHtml.innerHTML += newH;




/*castling.forEach(e => {
  gameFlowAutomation(e);
});*/

//console.log(checkLockedMoveRemover(pieceGrid[7][3]));
//console.log(htmlGrid)
//(htmlGrid[3][4]).style.backgroundColor = "pink";

async function readFile() {
    const path = "/storage/emulated/0/Download/text.txt";
    const res = await fetch("/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path })
    });
    const data = await res.json();
    if (data.success) return data.data;
    else alert("Error: " + data.error);
}

async function saveFile(content) {
    const path = "/storage/emulated/0/Download/text.txt";
    //const path = document.getElementById("filepath").value;
    //const content = document.getElementById("content").value;
    const res = await fetch("/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, content })
    });
    const data = await res.json();
    if (data.success) alert("Saved 🤗💛");
    else alert("Error: " + data.error);
}

