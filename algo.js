/*for(let i=10; i <= 20; i++){
  for(let j=1; i <= 10; j++){
    console.log('run');
  }
}*/


function randomSort(array){
  
  
  
}

function sortPump(array){
  let newArray = structuredClone(array);
  
  for(let i=0; i<Math.floor((array.length + 1) / 2); i++){
    let first = newArray[i];
    let second = newArray[array.length - i];
    
    newArray[i] = Math.min(first, second);
    newArray[array.length - i] = Math.max(first, second);
  }
}