const imgbbUploader = require("imgbb-uploader");
let fs = require('fs');
let path = require('path');


const uploadImgsOf = async (file) => {
    for (obj of file) {
        await imgbbUploader("f4a18fded7b0472b695f71cbf6854d1f", obj['image'])
        .then((response) => {
            console.log(response);
            obj['image'] = response.image.url;
        })
        .catch((error) => console.error(error));
    }
    return fileData;
}

const uploadImgsOfDir = (dirPath) => {
    let files = fs.readdirSync(dirPath);

    for (file of files) {       //  for each file
        if (!file.includes('json')) continue;
        if (file.includes('structure.json')) continue;

        console.log(dirPath + '/' + file);
        let data = require(dirPath + '/' + file);

        uploadImgsOf(file);

        console.log('back to caller');
        break;
    }
}

uploadImgsOfDir('./res/json0');

// uploadImgs = (dirPath) => {
//     let files = fs.readdirSync(dirPath);

//     for (file of files) {       //  for each file
//         if (!file.includes('json')) continue;
//         if (file.includes('structure.json')) continue;

//         console.log(dirPath + '/' + file);
//         let data = require(dirPath + '/' + file);

//         for (obj of data) {
//             // console.log(obj['item_id'], ' ', obj['image']);

//             // call api and upload image
//             imgbbUploader("f4a18fded7b0472b695f71cbf6854d1f", obj['image'])
//                 .then((response) => {
//                     console.log(response);
//                     // console.log(response.image.url);

//                     // set new image url
//                     obj['image'] = response.image.url;
//                 })
//                 .catch((error) => console.error(error));
//             // break; // remove it
//         }
//         // console.log('after break;')
//         // // update this file with new img urls
//         // fs.unlinkSync(dirPath + '/' + file, (err) => {
//         //     if (err) throw err;
//         //     console.log(dirPath + '/' + file + ' deleted');
//         // })
//         // console.log('after unlink')
//         // fs.writeFileSync(dirPath + '/' + file, JSON.stringify(data),  { flag: 'w' }, (err) => {
//         //     if (err) throw err;
//         //     console.log('updated ' + dirPath + '/' + file + ' written');
//         // });
//         // break;
//     }
// }

// uploadImgs('./res/json0');
