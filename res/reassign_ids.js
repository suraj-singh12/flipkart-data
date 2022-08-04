// assign ids to all objects (1->n) each files


let fs = require('fs');
let files = fs.readdirSync('./');

for (file of files) {       //  for each file
    if(!file.includes('json') || file.includes('json0') || file.includes('json1') || file.includes('json2') || file.includes('json3') || file.includes('json4') || file.includes('json5')) 
        continue;
    
    let data = require('./' + file);
    let i = 1;
    for(obj of data) {
        obj['item_id'] = i;
        i++;
    }

    fs.unlink('./' + file, (err) => {
        if(err) throw err;
        console.log(file + ' deleted');
    });
    fs.writeFile(file, JSON.stringify(data), (err) => {
        if(err) throw err;
        console.log('updated ' + file + ' written');
    });
}