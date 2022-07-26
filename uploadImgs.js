const imgbbUploader = require("imgbb-uploader");
let fs = require('fs');
let path = require('path');

// upload all images of a file
const uploadImgsOf = async (file, dirPath) => {
    let fileData = require(dirPath + '/' + file);
    for (obj of fileData) {
        await imgbbUploader("723d8e9efd8f7fdf5e71af62ccce564a", obj['image'])
            .then((response) => {
                // console.log(response);
                console.log(obj['item_id'], response.image.url);
                obj['image'] = response.image.url;
            })
            .catch((error) => console.error(error));
    }
    return fileData;
}

// upload images of all files in given directory & update it then
const uploadImgsOfDir = (dirPath) => {
    let files = fs.readdirSync(dirPath);

    let i = 0;
    // let newData = null;
    for (file of files) {       //  for each file
        if (!file.includes('json')) continue;
        if (file.includes('structure.json')) continue;
        console.log(dirPath + '/' + file);

        uploadImgsOf(file, dirPath)
            .then((newData) => {
                // console.log(newData);
                console.log('back to caller/ new data received, now writing');

                // update this file with new img urls
                fs.unlink(dirPath + '/' + file, (err) => {
                    if (err) throw err;
                    console.log(dirPath + '/' + file + ' deleted');
                })
                fs.writeFile(dirPath + '/' + file, JSON.stringify(data), { flag: 'w' }, (err) => {
                    if (err) throw err;
                    console.log('updated ' + dirPath + '/' + file + ' written');
                });
            })
        i++;
        if(i == 8) {
            // this is max images one account can have (near to 32 MB limit)
            break;
        }
    }
}

uploadImgsOfDir('./res/json0');
