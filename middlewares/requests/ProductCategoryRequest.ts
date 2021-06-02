import Formidable from 'formidable';
const sharp = require('sharp');

function ProductCategoryRequest() {
    const form = Formidable();

    form.parse(req, (err, fields, files) => {
        if(err) {
            next();
            return
        }
        const fileInput = files.file.path;
        const contetnType = files.file.contetnType;
        sharp(fileInput).resize(512, 512).toBuffer().then(() => {

        })
    })
}

export = ProductCategoryRequest;
