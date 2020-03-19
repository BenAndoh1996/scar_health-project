var express = require('express');
const router = express.Router();
const multer = require('multer')
const mongoose = require('mongoose')
const Mongoclient = require('mongodb');

const path = require('path')
const crypto = require('crypto')
const GridFsStorage = require('multer-gridfs-storage')
const Grid= require('gridfs-stream')
const methodOverride = require('method-override')


var xlsx = require('xlsx')

//const mongoUri = 'mongodb://localhost:27017/scarhealth';
const mongoUri = 'mongodb+srv://ben:ben@cluster0-0vfl6.mongodb.net/test?retryWrites=true&w=majority '
const conn = mongoose.createConnection(mongoUri)

// init gfs
let gfs 

conn.once('open', function(){
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('excelluploads');
})

//create storage object
const storage = new GridFsStorage(
    {
        url: mongoUri,
        file: (reg, file) =>{
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if(err){
                        return reject(err);
                    }
                        const filename = buf.toString('hex') + path.extname(file.originalname);
                        const fileinfo = {
                            filename:filename,
                            bucketName: 'excelluploads'
                        };
                        resolve(fileinfo);
                })
            })
        }
    
        
    }
)
const upload = multer({storage})


//Doctors login Handle
router.get('/UploadExcell', function(req, res){
    res.render('uploadexcell') 
 } );
  
//search post route
router.post('/excellupload', upload.single('file'), function(req, res){
    const FileInfo = []
    //res.json({file: req.file})
    FileInfo.push(req.file)
    console.log(FileInfo)
    res.render('excell', {
    FileInfo: FileInfo} ) 
    console.log(req.file.filename)
} );

router.post('/Excellfile/:filename', function(req, res){
    var search = req.params.filename
    console.log(search)
     gfs.files.findOne({filename:search}, function(err, file){
         if(!file || file.length === 0){
             return res.status(404).json({
                 err:'no file exists which matches the ID, Please consult your Laboratory for details'
             })
         }
         //file exist
         //read document or text
         const readstream = gfs.createReadStream(file.filename);
         readstream.pipe(res)
     })
 })
module.exports = router;