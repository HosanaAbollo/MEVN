<template>
  <div id="api">
    <div class="camera">
      <video id="video"> La vidéo ne fonctionne pas ...</video>
      <button v-on:click.prevent="prendrePhoto()">Prendre une photo</button>
      <button @click="isShowing ^= true" v-show="isShowing" v-on:click="envoyerAuServeur()">Envoyer la photo au serveur</button>
    </div>

    <!-- Element canvas-->
    <canvas id="canvas"></canvas>

    <!-- Form Element-->
    <form id="form" enctype="multipart/form-data">
        <input id="myImage"
               value="myGeeks" 
               type="image"  
               alt="Submit" 
               formaction="#"
               formtarget="#" 
               formenctype="text/plain" 
               width="48"
               height="48"> 
    </form>

  </div>
</template>

<script>
// IMPORTS
import Utils from './Utils.js'

export default {
      name: 'api',
      data(){
        return {
          width: 320,   
          height: 320,    
          video : null,
          canvas: null,
          photo: null,
          form: null,
          image: null,
          isShowing:false,
        }
      },// Quand le DOM est monté
      mounted(){
          this.video = document.getElementById('video');
          this.canvas = document.getElementById('canvas');
          this.photo = document.getElementById('photo');
          this.form = document.getElementById('form');
          this.callMediaStream();
      },
      methods: {
        callMediaStream(){

          // Récuperation le media stream
          navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          .then(function(stream) {
              video.srcObject = stream;
              video.play();
          })
          .catch(function(err) {
              console.log("Une erreur est survenue: " + err);
          });
        },

        prendrePhoto(){

          // On récupère le canvas
          var context = this.canvas.getContext('2d');

          // On donne les dimensions au canvas
          if (this.width && this.height) {
              this.canvas.width = this.width;
              this.canvas.height = this.height;
              context.drawImage(this.video, 0, 0, this.width, this.height);

              this.envoyerAuServeur();
            }
        },
        envoyerAuServeur()
        {
              // On récupère l'uri du canvas
              var pngFile = this.canvas.toDataURL('image/png');
              
              // On enleve le debut du string : "data:image/png;base64," 
              var pngFile64 = pngFile.replace(/^data:image\/(png|jpeg);base64,/, "");

              // Création d'un fichier blob
              var blob = Utils.dataURLtoBlob(pngFile);

              // Envoit du blob au serveur
              Utils.xhrFormDataRequete(blob,this.form)  
        }
      }
}
</script>

<style>

</style>
