let fs = require('fs');
const { exit } = require('process');
let files = fs.readdirSync('./');

for (file of files) {
    if(!file.includes('json')) continue;
    let targetLength = 5;
    if(file.includes('camera') || file.includes('dslr') || file.includes('mobile') || file.includes('washing')) 
        targetLength = 4;

    let data = require('./' + file);
    for(obj of data) {
        if(!obj['old_price'] || obj['old_price'] === '') {
            obj['old_price'] = (Number(obj['new_price']) * 1.4).toFixed(0);
        }
        // console.log('old price: ', obj['old_price']);

        obj['old_price'] = '' + obj['old_price'];
        obj['new_price'] = '' + obj['new_price'];

        while(obj['old_price'].length < targetLength) {
            obj['old_price'] = obj['old_price'] + '9';
        }
        while(obj['new_price'].length < targetLength) {
            obj['new_price'] = obj['new_price'] + '9';
        }
        
        if(obj['old_price'].length > targetLength) {
            obj['old_price'] = obj['old_price'].substring(0, targetLength);
        }
        if(obj['new_price'].length > targetLength) {
            obj['new_price'] = obj['new_price'].substring(0, targetLength);
        }
        
        while(Number(obj['new_price']) > Number(obj['old_price'])) {
            obj['old_price'] = '1' + obj['old_price'];
        }
        obj['old_price'] = Number(obj['old_price']);
        obj['new_price'] = Number(obj['new_price']);
        
        obj['discount'] = Number((((obj['old_price'] - obj['new_price']) / obj['old_price']) * 100).toFixed(0));
        
        console.log(obj['new_price'], ' ', obj['old_price'], ' ', obj['discount']);
        
        // create new file
        fs.writeFile('./modified/' + file, JSON.stringify(data), (err) => {
            if(err) throw err;
            console.log('updated ' + file + ' written');
        });
    }
}