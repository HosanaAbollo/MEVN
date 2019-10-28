export default{

    dataURIToBlob(dataURI){

        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        
        return new Blob([ab], {type: mimeString});
      },
      
    base64ToBlob(base64, mime) 
    {
        mime = mime || '';

        var sliceSize = 1024;
        var byteChars = window.atob(base64);
        var byteArrays = [];

        for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
            var slice = byteChars.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {type: mime});
    },

    dataURLtoFile(dataurl, filename){

        const arr = dataurl.split(',') // La racine
        const mime = arr[0].match(/:(.*?);/)[1] // Le type
        const bstr = atob(arr[1]) // L'image
        let n = bstr.length
        const u8arr = new Uint8Array(n)

        while (n) {
          u8arr[n] = bstr.charCodeAt(n)
          n -= 1 // to make eslint happy
        }

        return new File([u8arr], filename, { type: mime })
    },

    formPost(blob)
    {
      var formData = new FormData();
      formData.append("file", blob);
  
      var request = new XMLHttpRequest();
      request.onload = completeRequest;
  
      request.open("POST", "EnvoiDePhoto");
      request.send(formData);
    },

    dataURIToBlob(dataURI){

        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], {type: mimeString});
    },

    dataURLtoBlob(dataurl) {

        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new Blob([u8arr], {type:mime});
    },

    canvasToBlobAjax(dataurl,form){

        var blob = this.dataURLtoBlob(dataurl);
        var fd = new FormData(form);
        fd.append("image", blob, "image.png");

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api', true);
        console.log('XHRRRRRRR');
        console.log(fd)
       // xhr.send(fd);
    },
    verifFile(file){

        if(!allowedTypes.includes(file.type))
        {
            console.log("image require")
        }
        if(file.size > 5000000)
        {
            console.log("fichier trop volumineux pas depasser 500KB !!")
        }
    },
    logFormData(fd)
    {
        for (var key of fd.entries()) {
            console.log(key[0] + ', ' + key[1])
        }
    },
    xhrFormDataRequete(blob,form) { 
        //this.image.src = blob
      var fd = new FormData(form);
       // Utils.logFormData(fd)
       fd.append('file',blob)
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/upload', true);
        xhr.onload = function (oEvent) {
          // console.log(xhr.response)
        };
        xhr.send(fd);
        //console.log(txt)
    }
}