const imgbbUploader = require("imgbb-uploader");
let fs = require('fs');

let dirPath = './res/json0/';

// get all files
let filesList = fs.readdirSync(dirPath);
let files = [];
let index = 0;
// filter (valid files only)
for (f of filesList) {
    if (!f.includes("json") || f.includes("structure"))
        continue;
    files.push(f);
}
// console.log(files);
let file = files[index];
// console.log(file);

let fileData = require(dirPath + file);
// console.log(fileData);


doTheUploads = (fileDataIndx, image) => {
    imgbbUploader("12d0ff2fb51eff3efc38f953224c45b8", image)
        .then((response) => {
            // console.log(response);
            return response.url;        // send to next .then
        })
        .then((url) => {
            console.log(url);
            fileData[fileDataIndx]['image'] = url;
        })
        .then(() => {
            // do upload next object's image (same file)
            if (fileDataIndx < fileData.length - 1) {
                doTheUploads(fileDataIndx + 1, fileData[fileDataIndx + 1]['image']);
            } else {
                // if all object's images are uploaded, then go to next file
                // then write this object into the file.

                // // delete the old file
                // fs.unlink(dirPath + file, (err) => {
                //     if (err) throw err;
                //     console.log(dirPath + file + ' deleted');
                // })

                // write updated file
                fs.writeFile('./res/json0M/' + file, JSON.stringify(fileData), (err) => {
                    if (err) throw err;
                    console.log('==> # updated ' + './res/json0M/' + file + ' written');
                });

                // go to next file
                index++;    // increment file index


                if (index < files.length) {
                    file = files[index];        // now we require this file (next one)
                    fileData = require(dirPath + file);  // get this file's data

                    doTheUploads(0, fileData[0]['image']);
                }
            }

        })
        .catch((error) => console.error(error));
}

doTheUploads(0, fileData[0]['image']);

