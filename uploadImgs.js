const imgbbUploader = require("imgbb-uploader");
let fs = require('fs');

// get all files
let filesList = fs.readdirSync('./res/json0/');
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

let fileData = require('./res/json0/' + file);
// console.log(fileData);


doTheUploads = (fileDataIndx, image) => {
    imgbbUploader("723d8e9efd8f7fdf5e71af62ccce564a", image)
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
                // fs.unlink('./res/json0/' + file, (err) => {
                //     if (err) throw err;
                //     console.log('./res/json0/' + file + ' deleted');
                // })

                // write updated file
                fs.writeFile('./res/json0-modified/' + file, JSON.stringify(fileData), (err) => {
                    if (err) throw err;
                    console.log('updated ' + './res/json0-modified/' + file + ' written');
                });

                // go to next file
                index++;    // increment file index

                // below if line is for testing purpose
                if (index == 3) {
                    if (index < files.length) {
                        file = files[index];        // now we require this file (next one)
                        fileData = require('./res/json0/' + file);  // get this file's data

                        doTheUploads(0, fileData[0]['image']);
                    }
                }
            }

        })
        .catch((error) => console.error(error));
}

doTheUploads(0, fileData[0]['image']);





// // upload all images of a file
// const uploadImgsOf = async (file, dirPath) => {

//     let fileData = require(dirPath + '/' + file);
//     for (obj of fileData) {
//         await imgbbUploader("723d8e9efd8f7fdf5e71af62ccce564a", obj['image'])
//             .then((response) => {
//                 // console.log(response);
//                 console.log(file, obj['item_id'], response.image.url);
//                 obj['image'] = response.image.url;
//             })
//             .catch((error) => console.error(error));
//     }
//     return fileData;
// }

// // upload images of all files in given directory & update it then
// const uploadImgsOfDir = (dirPath) => {
//     let files = fs.readdirSync(dirPath);

//     let i = 0;
//     // let newData = null;
//     for (file of files) {       //  for each file
//         if (!file.includes('json')) continue;
//         if (file.includes('structure.json')) continue;
//         console.log(dirPath + '/' + file);

//         uploadImgsOf(file, dirPath)
//             .then((newData) => {
//                 // console.log(newData);
//                 console.log('back to caller/ new data received, now writing');

//                 // update this file with new img urls
//                 fs.unlink(dirPath + '/' + file, (err) => {
//                     if (err) throw err;
//                     console.log(dirPath + '/' + file + ' deleted');
//                 })
//                 fs.writeFile(dirPath + '/' + file, JSON.stringify(newData), { flag: 'w' }, (err) => {
//                     if (err) throw err;
//                     console.log('updated ' + dirPath + '/' + file + ' written');
//                 });
//             })
//         i++;
//         if(i == 8) {
//             // this is max images one account can have (near to 32 MB limit)
//             break;
//         }
//     }
// }

// uploadImgsOfDir('./res/json0');
