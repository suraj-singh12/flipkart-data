const imgbbUploader = require("imgbb-uploader");
let fs = require('fs');
let path = require('path');


uploadImgs = (dirPath) => {

    let files = fs.readdirSync(dirPath);


    for (file of files) {       //  for each file
        if (!file.includes('json')) continue;
        console.log(file);
        let data = require(dirPath + '/' + file);

        for (obj of data) {
            console.log(obj['item_id'], ' ', obj['image']);

            // call api and upload image
            imgbbUploader("f4a18fded7b0472b695f71cbf6854d1f", obj['image'])
                .then((response) => {
                    console.log(response);
                    console.log(response.image.url);

                    // set new image url
                    obj['image'] = response.image.url;
                })
                .catch((error) => console.error(error));
        }
        // update this file with new img urls
        fs.unlink(dirPath + '/' + file, (err) => {
            if(err) throw err;
            console.log(dirPath + '/' + file + ' deleted');
        });
        fs.writeFile(dirPath + '/' + file, JSON.stringify(data), (err) => {
            if(err) throw err;
            console.log('updated ' + dirPath + '/' + file + ' written');
        });
        break;
    }
}

uploadImgs('./res/json0');
