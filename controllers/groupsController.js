const multer = require('multer')
const shortid = require('shortid')

const Categories = require('../models/Categories')
const Groups = require('../models/Groups')

const configMulter = { 
    limits: { filesize: 100000 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, res, next) => {
            next(null, __dirname+'/../public/uploads/groups')
        },
        filename: (req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`)
        }
    }),
    fileFilter(req, file, next) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            next(null, true)
        } else {
            next(new Error('Format invalid'), false) // false quiere decir que estoy rechazando el archivo
        }
    }
}

const upload = multer(configMulter).single('picture')

// upload image in the server
exports.uploadImage = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'The file is very large')
                } else {
                    req.flash('error', error.message)
                }
            } else if (error.hasOwnProperty('message')) {
                req.flash('error', error.message)
            }
            res.redirect('back');
            return
        } else {
            next()
        }
    })
}

exports.formNewGroup = async (req, res) => {
    const categories = await Categories.findAll();

    res.render('new-group', {
        pageName: 'Create new group',
        categories
    })
}

// almacena los grupos en la db
// ya que interactuamos con la db, creo una funcion asynchronus
exports.createGroup = async (req, res) => {

    // sanitizar los campos
    req.sanitizeBody('name')
    req.sanitizeBody('url')
    
    // lee todo lo del form
    const group = req.body
    
    group.userId = req.user.id;
    group.categoryId = req.body.category;
    
    // read image
    
    if (req.file) {
        group.image = req.file.filename;
    }
    
    try {
        // enviar la informacion de la req a la db
        await Groups.create(group)
        req.flash('exito', 'The group has been created successfully ')
        res.redirect('/administration')
        
    } catch (error) {
        const sequelizeErrors = error.errors.map(error => error.message)
        req.flash('error', sequelizeErrors);
        res.redirect('/new-group')
    }
}