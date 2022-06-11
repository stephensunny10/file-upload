// call all the required packages
const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');
//var upload = multer({dest:'./uploads'})
 

//================= upload file in node.js using multer=================//
//CREATE EXPRESS APP
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
 
//ROUTES WILL GO HERE
// ROUTES
app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

// SET STORAGE

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
   
  var upload = multer({ storage: storage })
  //const upload = multer({ dest: './uploads' })  // use it to upload directly with random filename

  app.post('/upload', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
    
  })
 
var port  = process.env.PORT || 2800
app.listen(port, () => console.log('Server started on port '+ port));