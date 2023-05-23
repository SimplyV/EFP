const fs = require('fs');

fs.readFile('./path/fichier.json', (error, data) =>{
  if(error){
    console.error({error});
    return;
  }
  console.log({data : JSON.parse(data)});
})