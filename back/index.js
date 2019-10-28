// Dépendances requise
const express = require('express');
const multer = require("multer")
const bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const PORT = '3000' || process.env.PORT;
const app = express();


// Envoit de réponse attentu pour la route /upload
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

// Téléchargement de la photo dans le dossier uploads
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
     // D2finition du nom du fichier
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
  })

var upload = multer({ storage: storage });


app.post('/upload', upload.single('file'), (req,res) => {

    // Parametre de configuration de la base de donnée 
    const url = 'mongodb://localhost:27017';
    const dbName = 'photoProjet';

    // On récupère le chemin du fichier
    var pathFile = req.file.path.replace(/^uploads\\/, "./uploads/");

    // Lire un fichier à partir d'une source
    fs.readFile(pathFile, function read(err, data) {

        if (err) {
            throw err;
        }
        // Récupérer le buffer de ce fichier
        const buff = data;
        //console.log(buff)
        var base64String =  buff.toString('base64'); 
      
        // Connection a la BDD avec mongoClient
       MongoClient.connect(url, {useUnifiedTopology: true}, function(error,client){

            if(error) throw(error);  // Erreur en cas de problème de connexion

            const db = client.db(dbName); // Récupérer la base de données

            // Donnée à envoyer à mongo
            const data = { lol: buff, loddd: pathFile  };

            // Envoi des données dans la collection nommée data
            db.collection("datas").insertOne(data, function(err, res) {
                if (err) throw err;
                console.log("1 document inséré");
              });
        });;
    });
    

});

// Ecoute du port de l'application
app.listen(PORT, () => console.log(`Le serveur écoute au port : ${PORT}`));


