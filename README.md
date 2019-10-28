# MEVN application

Ce projet requiert dans votre système : [Node.js](https://nodejs.org/en/) (avec [nodemon](https://www.npmjs.com/package/nodemon)), [Vue.js](https://vuejs.org/) (avec [webpack-simple](https://github.com/vuejs-templates/webpack-simple), [vue dev tool](https://github.com/vuejs/vue-devtools#vue-devtools)), [MongoDB](https://www.mongodb.com/), [ajouter mongoDb aux variable d'environnement](http://sysadmindata.com/set-mongodb-path-windows/).

MEVN est une application permettant de se prendre en photo via la camera de son dispositif et d'envoyer le fichier image au server afin qu'il l'enregistre dans le disque et qu'il envoit le fichier image en base de donnée (MongoDb) .

Le client permet d'avoir une interface pour l'utilisateur afin que l'on puisse ouvrir son dispositif de caméra et ainsi prendre une photo, [voir](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia).

Il utilise un canvas afin de récupérer la photo afin que l'utilisateur puisse la prévisualiser,
[créer canvas](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) et aussi une méthode permettant de récupérer l'url du canvas [utiliser toDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL).

On convertit l'url du canvas en blob dans mon exemple avant de l'envoyer au serveur,
[Qu'est ce qu'un ficher au format blob ?](https://developer.mozilla.org/en-US/docs/Web/API/Blob),
[Envoit du blob via un formData](https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata).

Pour intéragir avec le serveur, on envoit le blob via l'objet XMLHTTPRequest() afin d', vous pouvez aussi utiliser axios pour l'ajax.  
[utiliser XMLHTTPRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), [axios](https://github.com/axios/axios), voir aussi [Qu'est ce qu'un objet Formdata ?](https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects)

Afin de permettre l'envoit d'un fichier image (blob, base64 ou buffer ..) du client (http://localhost:8080) vers le serveur (http://localhost:3000), il faut que le serveur permette au client de lui envoyer un fichier grâce à l'en-tête de sa réponse [définition cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) et
[examples utilisation cors](https://www.html5rocks.com/en/tutorials/cors/).

Pour que le serveur récupère éfficacement le fichier image envoyé depuis le client, on utilise multer, un middlware permettant  le téléchargement de ce dernier dans le disque, [module multer](https://github.com/expressjs/multer), voir aussi [Lecture de fichier système](https://nodejs.dev/the-nodejs-fs-module) pour la lecture de fichier système.

Pour la connection à la base de donnée je vais utiliser pour ce projet mongo Client afin d'envoyer des fichiers dans une collection, [mongoClient](https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html) néanmoins vous pouvez aussi utiliser mongoose qui est un module très pratique [mongoose](https://mongoosejs.com/docs/index.html).

## Composants

MEVN application est découpé en deux composants, chacun d'eux possède son propre dossier : 

* [back](https://github.com/colombbus/declick-server-v2), un serveur écrit en Javascript avec Node.js
    * Permet de récupérer la requête d'envoi d'image du client vers le serveur
    * Il enregistre l'image dans le serveur dons le dossier 'uploads'
    * Envoit le fichier image à notre base de donnée 

* [front](https://github.com/colombbus/declick-client-v2), un client écrit en javascript avec Vue.js et webpack, voir la documentation : [webpack-simple](https://github.com/vuejs-templates/webpack-simple)

## Comment utiliser ce projet ?

- Création de la base de données avec mongoDb:

    Pré-requis: 
        -   Avoir ajouté mongo.exe et mongod.exe aux variables d'environnement [voir](https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-windows/#set-up-the-mongodb-environment)

    1)  Lancer mongoDb avec mongod via un terminal avec la commande `mongod`
    2)  Lancer mongoDb avec mongod via un terminal avec la commande `mongo`
    3)  Créer une base de données via le terminal éxécutant mongo, [voir](https://docs.mongodb.com/manual/tutorial/getting-started/)

    Une fois la base de donnée crée nous pouvons passer à la suite

- Se déplacer dans le dossier client et lancer les commandes suivantes :
    - 1) Installer les dépendances et dev dépendances du projet
        *   `npm install`
    - 2) Lancer le client avec la commande : 
        *   `npm run dev`

    Automatiquement le client sera généré via votre navigateur à l'adresse: http://localhostt:8080

- Se déplacer dans le dossier serveur et lancer les commandes suivantes :
    - 1) Installer les dépendances et dev dépendances du projet
        *   `npm install`
    - 2) Lancer le client avec la commande : 
        *   `npm start`  

    Le serveur sera lancé à l'adresse suivante : http://localhost:3000


## Contribution
Pull requests sont le bienvenue. Pour des changements conséquents, Lancez un problème afin que l'on puisse discuter des changements que vous voulez opérer.


## License
[MIT](https://choosealicense.com/licenses/mit/)
