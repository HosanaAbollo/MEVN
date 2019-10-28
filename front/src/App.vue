<template>
  <div id="app">
    <div v-on:click="goToPage()" id="qrcode" href="http://localhost:8080/api">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
      name: 'app',
      data(){
        return{
          qrCode: null,
        }
      },
      mounted(){
        this.qrCode = new QRCode(document.getElementById("qrcode"), "http://localhost:8080/api");
      },
      methods: {

        // Requete vers la page "http://localhost:8080/api" non fonctionelle
        goToPage(){
          const url = "/api" 
          let xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.send(null);

          xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && xhr.status === 200) {
              console.log(xhr.responseURL);
            }
          };
        }
      }
}


</script>

<style>

</style>
