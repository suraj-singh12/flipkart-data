const imgbbUploader = require("imgbb-uploader");
let fs = require('fs');
let path = require('path');

// upload all images of a file
const uploadImgsOf = async (file, dirPath) => {
    let fileData = require(dirPath + '/' + file);
    let i = 1;
    for (obj of fileData) {
        await imgbbUploader("f4a18fded7b0472b695f71cbf6854d1f", obj['image'])
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
