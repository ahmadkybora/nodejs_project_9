import ProductCategory from '../../Models/ProductCategory';
import Brand from '../../Models/BrandModel';
import Employee from '../../Models/EmployeeModel';
//import productCategoryRequestValidation from '../../../app/RequestsValidations/productCategoryRequestValidation';
import Validator from 'fastest-validator';
const v = new Validator();
import Handler from '../../../app/Exceptions/Handler';
import sequelize from 'sequelize';
const Op = sequelize.Op;
//const multer = require('multer');
const uuid = require('uuid').v4;
import Formidable = require('formidable');
//const sharp = require('sharp');
//const {storage, fileFilter} = require("../../../helpers/multer");
//let path = require("path");
var fs = require('fs');
//var mv = require('mv');
//var qs = require('querystring');

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const ProductCategoryController = {
    //uploadImage,
    search,
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy
};

/*async function uploadsImage(req, res) {

    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "./public/storage");
        },
        filename: (req, file, callback) => {
            callback(null, `${uuid()}_${file.originalname}`);
        }
    });

    const fileFilter = (req, file, callback) => {
        if (file.mimetype === "image/jpeg") {
            callback(null, true)
        } else {
            callback("just jpeg", false)
        }
    };

    const upload = multer({
        limits: {fileSize: 4000000},
        dest: "storage/",
        storage,
        fileFilter,
    }).single("image");

    upload(req, res, err => {
        if (err) {
            res.send(err)
        } else {
            res.status(200).send("success")
        }
    })
}*/

async function search(req: any, res: any) {
    const {search} = req.body;
    const page = +req.query.page || 1;
    const perPage = 1;

    try {
        const numberOfEmployees = await ProductCategory.findAndCountAll({
            where: {
                name: {
                    [Op.like]: '%' + search + '%'
                }
            }
        });

        const categorySearch = await ProductCategory.findAll({
            where: {
                name: {
                    [Op.like]: '%' + search + '%'
                }
            },
            include: Brand
        }, {
            limit: perPage,
            offset: ((page - 1) * perPage)
        });

        res.render("panel/product-categories", {
            path: '/panel/product-categories/category-search',
            title: "category-Search",
            categorySearch: categorySearch,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: perPage * (page < numberOfEmployees.count),
            hasPreviousPage: page > 1,
            lastPage: Math.ceil(numberOfEmployees.count / perPage),
            search: true,
        });
    } catch (err) {
        console.log(err)
    }
}

async function index(req: any, res: any) {
    const page = +req.query.page || 1;
    const perPage = 10;

    try {
        const numberOfEmployees = await ProductCategory.findAndCountAll();
        const categories = await ProductCategory.findAll({include: Brand}, {
                limit: perPage,
                offset: ((page - 1) * perPage)
            }
        );

        res.render("panel/product-categories", {
            path: '/panel/product-categories',
            title: "Product Categories",
            categories: categories,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: perPage * (page < numberOfEmployees.count),
            hasPreviousPage: page > 1,
            lastPage: Math.ceil(numberOfEmployees.count / perPage),
            search: false,
        })

    } catch (err) {
        console.log(err)
    }
}

async function create(req: any, res: any) {
    try {
        const brands = await Brand.findAll();
        const employees = await Employee.findAll();
        res.render("panel/product-categories/create", {
            title: "Product Categories",
            brands,
            employees
        })
    } catch (err) {
        console.log(err)
    }
}

function store(req, res) {
    /*const validate = v.validate(req.body, productCategoryRequestValidation);
    console.log(validate);
    if (validate === true) {*/
    try {
        let form = new Formidable.IncomingForm();
        const errorArr = [];
        form.parse(req, (err, fields, files) => {
            if (typeof files.file !== 'undefined') {
                const newPc = {
                    employeeId: fields.employeeId,
                    name: fields.name,
                    status: fields.status,
                    brandId: fields.brandId
                };
                console.log(newPc);
                try {
                    /*const validator = productCategoryRequestValidation.isValid(newPc);
                    validator.then(res => {*/
                        let oldPath = files.file.path;
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        let fileName = `${uniqueSuffix}_${uuid()}_${files.file.name}`;
                        //let newPath = 'D:/nodejsProjects/nodejs_project_8/public/storage/product-categories/' + fileName;
                        let newPath = 'C:/nodejs_projects/nodejs_project_8/public/storage/product-categories/' + fileName;
                        //let path = 'storage/product-categories/' + fileName;
                        fs.rename(oldPath, newPath, function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                ProductCategory.create({
                                    employeeId: fields.employeeId,
                                    name: fields.name,
                                    image: newPath,
                                    status: fields.status,
                                    brandId: fields.brandId
                                }, {
                                    include: {
                                        model: Brand
                                    }
                                });
                            }
                        });
                        res.redirect("/panel/product-categories");
                    /*}).catch(err => {
                        const brands = Brand.findAll();
                        res.render("panel/product-categories/create", {
                            title: "Product Categories",
                            brands: brands,
                            errors: errorArr,
                        });
                    });*/
                } catch (err) {
                    console.log(err)
                }
            }
        });
    } catch (err) {
        console.log(err)
    }


                /*try {
                    productCategoryRequestValidation.validate(newPc);
                } catch (err) {
                    console.log(errorArr);
                    err.inner.forEach((e) => {
                        errorArr.push({
                            name: e.path,
                            message: e.message,
                        });
                    });

                    const brands = Brand.findAll();
                    res.render("panel/product-categories/create", {
                        title: "Product Categories",
                        brands: brands,
                        errors: errorArr,
                    });
                }*/

                /*let a = fields.brandId;
                const validate = v.validate(a, productCategoryRequestValidation);
                console.log(validate);*/
                /*const validate = v.validate(fields.brandId, productCategoryRequestValidation);
                const validate = v.validate(fields.status, productCategoryRequestValidation);
                const validate = v.validate(fields.name, productCategoryRequestValidation);*/
                /*if (validate !== true) {

                }*/
                /*let oldPath = files.file.path;
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                let fileName = `${uniqueSuffix}_${uuid()}_${files.file.name}`;
                //let newPath = 'D:/nodejsProjects/nodejs_project_8/public/storage/product-categories/' + fileName;
                let newPath = 'C:/nodejs_projects/nodejs_project_8/public/storage/product-categories/' + fileName;
                //let path = 'storage/product-categories/' + fileName;
                fs.rename(oldPath, newPath, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        ProductCategory.create({
                            employeeId: fields.employeeId,
                            name: fields.name,
                            image: newPath,
                            status: fields.status,
                            brandId: fields.brandId
                        }, {
                            include: {
                                model: Brand
                            }
                        });
                    }
                });
            } else {
                console.log(err);
            }
        });
        res.redirect("/panel/product-categories")*/;
    /*} catch (err) {
        console.log(err);
    }*/

    /*} else {
        try {
            const brands = await Brand.findAll();
            res.render("panel/product-categories/create", {
                title: "Product Categories",
                brands: brands,
                errors: validate,
            })
        } catch (err) {
            console.log(err)
        }
    }*/

/*    try {
/*    let form = new Formidable.IncomingForm();
    form.parse(req);
    /!*form.on('field', function (field, value) {
        //console.log(field);
        console.log(value);
    });*!/
    form.on('fileBegin', function (name, file) {
        let fileName = `${uuid()}_${file.name}`;
        let a = file.path = __dirname + '/upload/' + fileName;
        console.log(a);
    });

    form.on('file', function (name, file) {
        console.log(file.name);
    });*/


/*                fs.rename(oldPath, newPath, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        ProductCategory.create({
                            employeeId: 1,
                            name: fields.name,
                            image: newPath,
                            status: fields.status,
                            brandId: fields.brandId
                        }, {
                            include: {
                                model: Brand
                            }
                        });
                    }
                });*/

        /*form.on('file', function (name, file) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            let fileName = `${uniqueSuffix}_${uuid()}_${file.name}`;
            file.path = __dirname + '/upload/' + fileName;
        });*/


    /*form.parse(req, function (err, fields, files) {
        if (typeof files.file !== 'undefined'){
            let oldPath = files.file.path;
            let newPath = 'upload/sellers/blogs/' + r.insertId + files.file.name;
            fs.rename(oldPath, './' + newPath, function (err) {
                if (err) {
                    res.status(200).json({status:true , message:"success but there is problem in your image" , data:r})
                    res.end();
                }else {
                    Blog.update({
                        file: newPath,
                    }, [
                        {condition: "AND",  id: r.insertId, operator: "="}
                    ]).then(r2 =>{
                        res.status(200).json({status:true , message:"success" , data:r})
                        res.end();
                    })
                }*!/*/

    /*var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            console.log(file);
            cb(null, '../../../public/storage/product-categories/')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    });

    var upload = multer({ storage: storage })*/


    /*    let form = new Formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            console.log(files)
        });
        //let filePath;

        form.on('file', function (name, file) {
            let fileName = `${uuid()}_${file.name}`;
            /!*filePath = *!/file.path = 'C:/nodejs_projects/nodejs_project_8/public/storage/product-categories/' + fileName;
        });*/

    /*form.on('field', function (name, field) {
        ProductCategory.create({
            employeeId: 1,
            /!*name: field.name,
            image: filePath,*!/
            status: field.status,
            brandId: field.brandId
        }, {
            include: {
                model: Brand
            }
        });
    });*/


    /*form.on('file', (name, file) => {
        let fileName = `${uuid()}_${file.name}`;
        let filePath = file.path = 'C:/nodejs_projects/nodejs_project_8/public/storage/product-categories/' + fileName;
    });
    /*form.parse(req, (err, fields, files) => {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ fields, files }, null, 2));
    });*/
    /*let form = new Formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        let fileName = `${uuid()}_${files.file.name}`;
        console.log(fileName);
        let filePath = file.path = 'C:/nodejs_projects/nodejs_project_8/public/storage/product-categories/' + fileName;
    });*/
    /*let form = new Formidable.IncomingForm();
    form.parse(req);
    form.on('field', function (field, value) {
        //console.log(field);
        console.log(value);
    });
    form.on('file', function (name, file) {
        let fileName = `${uuid()}_${file.name}`;
        /!*let filePath = *!/file.path = 'C:/nodejs_projects/nodejs_project_8/public/storage/product-categories/' + fileName;
    });*/
    /*form.on('file', (name, file) => {
        let fileName = `${uuid()}_${file.name}`;
        let filePath = file.path = 'C:/nodejs_projects/nodejs_project_8/public/storage/product-categories/' + fileName;
    });
    form.on('field', (name, field) => {
        ProductCategory.create({
            employeeId: 1,
            name: field.name,
            image: filePath,
            status: field.status,
            brandId: field.brandId
        }, {
            include: {
                model: Brand
            }
        });
    });*/


    //const form = new Formidable.IncomingForm();
    /*form.uploadDir = "./uploads";
    form.on('field',(field,value)=>{
        console.log(field);
        console.log(value);
    });
    form.on('file',(name,file)=>{
        console.log(name);
        console.log(file);
    });
    form.on('end',()=>{
        res.end('upload complete');
    });*/

    /*new Formidable.IncomingForm().parse(req)
        .on('field', (name, field) => {
            ProductCategory.create({
                    employeeId: 1,
                    name: field.name,
                   /!* image,*!/
                    status: field.status,
                    brandId: field.brandId
                }, {
                    include: {
                        model: Brand
                    }
                }
            );
        })
        .on('file', (name, file) => {
            const fileName = `${uuid()}_${file.name}`;
            file.path = 'C:/nodejs_projects/nodejs_project_8/public/storage/product-categories/' + fileName;
        })
        .on('aborted', () => {
            console.error('Request aborted by the user')
        })
        .on('error', (err) => {
            console.error('Error', err);
            throw err
        })
        .on('end', () => {
            res.end()
        });*/

    /*let form = new Formidable.IncomingForm();
    form.parse(req);
    form.on('file', (name, file) => {
        const fileName = `${uuid()}_${file.name}`;
        file.path = 'C:/nodejs_projects/nodejs_project_8/public/storage/product-categories/' + fileName;
    });
    form.on('field', (field, file) => {
        const fileName = `${uuid()}_${file.name}`;
        file.path = 'C:/nodejs_projects/nodejs_project_8/public/storage/product-categories/' + fileName;
        ProductCategory.create({
                employeeId: 1,
                name: field.name,
                image: file.path,
                status: field.status,
                brandId: field.brandId
            }, {
                include: {
                    model: Brand
                }
            }
        );
    });
    form.on('aborted', () => {
        //console.error('Request aborted by the user')
    });
    form.on('error', (err) => {
        //console.error('Error', err);
        throw err
    });
    form.on('end', () => {
        res.end()
    });*/

    /* try {
         let form = new Formidable.IncomingForm();
         /!*form.parse(req, (err, fields, files) => {
             if (err) {

             } else {
                 ProductCategory.create({
                         employeeId: 1,
                         name: fields.name,
                         image: files.file,
                         status: fields.status,
                         brandId: fields.brandId
                     }, {
                         include: {
                             model: Brand
                         }
                     }
                 );
             }
         });*!/
         form.parse(req);
         form.on('fileBegin', function (name, file) {
             const {status, brandId} = req.body;
             const fileName = `${uuid()}_${file.name}`;
             file.path = 'C:/nodejs_projects/nodejs_project_8/public/storage/product-categories/' + fileName;
             ProductCategory.create({
                     employeeId: 1,
                     name,
                     image: fileName,
                     status,
                     brandId
                 }, {
                     include: {
                         model: Brand
                     }
                 }
             );
         });
         res.redirect("/panel/product-categories");
     }catch (err) {
         console.log(err)
     }*/
    //form.parse(req, function (err, fields, files) {

    /*let file = files;
    console.log(form.File.name);*/
    /* var oldpath = files.filetoupload.path;
     var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
     console.log(oldpath);
     console.log(newpath);*/
    /*fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
    });*/
    //});

    //form.parse(req,(err,fields,files)=>{
    //var oldpath = files.filetoupload.path;
    /*ctx.set('Content-Type', 'application/json');
    ctx.status = 200;
    ctx.state = { fields, files };
    ctx.body = JSON.stringify(ctx.state, null, 2);*/
    //console.log(oldpath);
    //Rename
    /*let ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
    let ran = parseInt(Math.random() * 89999 + 10000);*/
    /*let extname = path.extname(files.file.name);
    console.log(extname);
    let oldpath=__dirname+'/'+files.file.path
    let newpath = __dirname + '/uploads/' + ttt + ran + extname;*/
    /*fs.rename(oldpath, newpath,function(err){
        if(err){
            Throw Error("rename failed");
        }
    });*/
    //});


    //if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {    
    // parse a file upload    
    // const form = formidable({ multiples: true });     
    // form.parse(req, (err, fields, files) => {      
    // res.writeHead(200, { 'content-type': 'application/json' });      
    // res.end(JSON.stringify({ fields, files }, null, 2));    
    // });     
    // return;  }   
    //  show a file upload form  
    // res.writeHead(200, { 'content-type': 'text/html' });  
    // res.end(`    <h2>With Node.js <code>"http"</code> module</h2>    
    // <form action="/api/upload" enctype="multipart/form-data" method="post">
    //       <div>Text field title: <input type="text" name="title" /></div>
    //       <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div> 
    //      <input type="submit" value="Upload" /> 
    //    </form>  `);}); 
    // server.listen(8080, () => {  console.log('Server listening on http://localhost:8080/ ...');});

    //console.log("ok");

    /*    try {*/
    //console.log(req.body.file);
    /*let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err);
        } else {
            const fileName = `${uuid()}_${files}`;
            var file_type = files.name.pop();
            console.log(file_type);
            console.log(files);
        }*/
    /*res.writeHead(200, { 'content-type': 'text/plain' });
    console.log(req.files.file);*/
    /*            console.log(form);
                filestore*/
    /*form.on('file', (filename, file) => {
        form.emit('data', { name: 'file', key: filename, value: file });
    });*/
    /*console.log(fields);*/
    /*if (typeof files.file !== 'undefined') {
        let oldPath = files.file.path;
        const fileName = `${uuid()}_${req.files.file.name}`;
        let newPath = 'public/storage/product-categories/' + r.insertId + fileName;
        fs.rename(oldPath, './' + newPath, function (err) {})
    }*/
    /* });*/

    /*form.on('end', function (fields, files) {
        //6.
        var tempPath = this.openedFiles[0].path;

        //7.
        var fileName = this.openedFiles[0].name;

        //8.
        var newFileName = "../FileUpload_" + fileName;

        //9.
        filestore.copy(tempPath, newFileName, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log('File Uploaded');
                resp.end('File Uploaded');
            }
        });
    });*/

    /*form.parse(req.body);
    console.log(form.parse(req.body));*/
    /*form.parse(req, function (err, fields, files) {
        const {name, image, status, brandId} = req.body;
        ProductCategory.create({
                employeeId: 1,
                name,
                image,
                status,
                brandId
            }, {
                include: {
                    model: Brand
                }
            }
        );


        var oldPath = files.profilePic.path;
        var newPath = path.join(__dirname, 'public/storage/product-categories/' + files.profilePic.name)
        var rawData = fs.readFileSync(oldPath);

        fs.writeFile(newPath, rawData, function (err) {
            if (err) console.log(err);
            return res.send("Successfully uploaded")
        })
    });*/
    /*    }catch (err) {
            console.log(err)
        }*/

    /*var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        res.write('File uploaded');
        res.end();
    });*/

    /*let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (typeof files.file !== 'undefined'){
            let oldPath = files.file.path;
            let newPath = 'upload/sellers/blogs/' + r.insertId + files.file.name;
            fs.rename(oldPath, './' + newPath, function (err) {
                if (err) {
                    res.status(200).json({status:true , message:"success but there is problem in your image" , data:r})
                    res.end();
                }else {
                    Blog.update({
                        file: newPath,
                    }, [
                        {condition: "AND",  id: r.insertId, operator: "="}
                    ]).then(r2 =>{
                        res.status(200).json({status:true , message:"success" , data:r})
                        res.end();
                    })
                }*/

    /*let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (typeof files.file !== 'undefined'){
            let oldPath = files.file.path;
            let newPath = 'upload/sellers/blogs/' + r.insertId + files.file.name;
            fs.rename(oldPath, './' + newPath, function (err) {
                if (err) {
                    res.status(200).json({status:true , message:"success but there is problem in your image" , data:r})
                    res.end();
                }else {
                    Blog.update({
                        file: newPath,
                    }, [
                        {condition: "AND",  id: r.insertId, operator: "="}
                    ]).then(r2 =>{
                        res.status(200).json({status:true , message:"success" , data:r})
                        res.end();
                    })
                }*/
    /*    const validate = v.validate(req.body, productCategoryRequestValidation);
        if (validate === true) {*/
    /*console.log(req);
    try {
        const {name, image, status, brandId} = req.body;

        await ProductCategory.create({
                employeeId: 1,
                name,
                image,
                status,
                brandId
            }, {
                include: {
                    model: Brand
                }
            }
        );

        const upload = multer({
            limits: { fileSize: 4000000 },
            // dest: "uploads/",
            // storage: storage,
            fileFilter: fileFilter,
        }).single("image");
        //req.file
        // console.log(req.file)

        upload(req, res, async (err) => {
            if (err) {
                res.send(err);

            } else {
                if (req.file) {
                    console.log(req.file);
                    const fileName = `${uuid()}_${req.file.originalname}`;
                    await sharp(req.file.buffer)
                        .jpeg({
                            quality: 60,
                        })
                        .toFile(`./../../public/storage/product-categories/${fileName}`)
                        .catch((err) => console.log(err));
                    res.status(200).send("آپلود عکس موفقیت آمیز بود");
                } else {
                    res.send("جهت آپلود باید عکسی انتخاب کنید");
                }
            }
        });

    } catch (err) {
        console.log(err)
    }*/
    /*        const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, "../../../public/storage/product-categories/");
                },
                filename: (req, file, cb) => {
                    console.log(file);
                    cb(null, `${uuid()}_${file.originalname}`);
                },
            });

            const fileFilter = (req, file, cb) => {
                if (file.mimetype == "image/jpeg") {
                    cb(null, true);
                } else {
                    cb("تنها پسوند JPEG پشتیبانی میشود", false);
                }
            };

            const upload = multer({
                limits: { fileSize: 4000000 },
                // dest: "uploads/",
                // storage: storage,
                fileFilter: fileFilter,
            }).single("image");
            //req.file
            // console.log(req.file)

            upload(req, res, async (err) => {
                console.log(JSON.stringify(req.file));
                if (err) {
                    res.send(err);
                } else {
                    if (req.file) {
                        console.log(req.file);
                        const fileName = `${uuid()}_${req.file.originalname}`;
                        await sharp(req.file.buffer)
                            .jpeg({
                                quality: 60,
                            })
                            .toFile(`../../../public/storage/product-categories/${fileName}`)
                            .catch((err) => console.log(err));
                        res.status(200).send("آپلود عکس موفقیت آمیز بود");
                    } else {
                        res.send("جهت آپلود باید عکسی انتخاب کنید");
                    }
                }
            });*/

    /*const upload = multer({
        limits: { fileSize: 4000000 },
        dest: "storage/product-categories",
        storage: storage,
        fileFilter: fileFilter,
    }).single("image");

    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.status(200).send("آپلود عکس موفقیت آمیز بود");
        }
    });*/
    /*const {name, image, status, brandId} = req.body;

    await ProductCategory.create({
            employeeId: 1,
            name,
            image,
            status,
            brandId
        }, {
            include: {
                model: Brand
            }
        }
    );*/
    /*var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "../../public/storage/product-categories/")
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })*/
    //var upload = multer({ storage: storage })
    //var upload = multer({ storage: storage })
    /*const upload = multer({
        limits: { fileSize: 4000000 },
        // dest: "uploads/",
        // storage: storage,
        fileFilter: fileFilter,
    }).single("image");
    //req.file
    // console.log(req.file)

    //console.log(req.file);
    console.log(req.body);
    //console.log(upload);
    upload(req, res, async (err) => {
        if (err) {
            res.send(err);
        } else {
            if (req.file) {
                console.log(req.file);
                const fileName = `${uuid()}_${req.file.originalname}`;
                await sharp(req.file.buffer)
                    .jpeg({
                        quality: 60,
                    })
                    .toFile(`../../../storage/public/images/product-categories/${fileName}`)
                    .catch((err) => console.log(err));
                res.status(200).send("آپلود عکس موفقیت آمیز بود");
            } else {
                res.send("جهت آپلود باید عکسی انتخاب کنید");
            }
        }
    });*/

    /*await sharp(req.file.buffer).jpeg({
        quality: 60
    }).toFile(`../../../storage/public/images/product-categories/${fileName}`);
    console.log(req.body);*/

    /*const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        //res.writeHead(200, { 'content-type': 'application/json' });
        ProductCategory.create({
                name,
                image,
                status,
                brandId
            }, {
                include: {
                    model: Brand
                }
            }
        );
        res.end(JSON.stringify({ fields, files }, null, 2));
    });*/


    /*var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/storage/public/img' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.sendFile(__dirname + '/index.html');

    var form = new formidable.IncomingForm(options);
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    });*/


    /*await ProductCategory.create({
            employeeId: 1,
            name,
            image,
            status,
            brandId
        }, {
            include: {
                model: Brand
            }
        }
    );*/

    /*const form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = '../../../storage/public/images/product-categories' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.redirect("/panel/product-categories")*/
    /*} catch (err) {
        console.log(err);
        //return Handler.Error_503();
    }*/
    /*    } else {
            res.render("panel/product-categories/create", {
                pageTitle: 'product-categories create',
                //path: "/register",
                errors: validate,
            });
        }*/
}

async function show(req: any, res: any) {
}

async function edit(req: any, res: any) {
    try {
        const brands = await Brand.findAll();
        const category = await ProductCategory.findByPk(req.params.id, {include: Brand});
        console.log(category);
        res.render('panel/product-categories/edit', {
            title: "editEmployees",
            category: category,
            brands: brands,
        });
    } catch (err) {
        console.log(err)
    }
}

async function update(req: any, res: any) {
    try {
        await ProductCategory.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.redirect("/panel/product-categories");
    } catch (err) {
        console.log(err)
    }
}

async function destroy(req: any, res: any) {
    try {
        await ProductCategory.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect("/panel/product-categories");
    } catch (err) {
        console.log(err)
    }
}

export = ProductCategoryController;
