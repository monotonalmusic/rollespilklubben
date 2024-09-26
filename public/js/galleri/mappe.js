
var modal = document.getElementById("myModal");


var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");


var images = document.querySelectorAll('.modal-img');


images.forEach(function(image) {
    image.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }
});


var span = document.getElementsByClassName("close")[0];





span.onclick = function() { 
    modal.style.display = "none";
}
