
// SLIDER
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.sliderslider');
    const leftArrow = document.querySelector('.fa-circle-arrow-left');
    const rightArrow = document.querySelector('.fa-circle-arrow-right');
    const totalSlides = slider.children.length;
    let currentIndex = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
        updateSlider();
    });

    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    
    setInterval(() => {
    currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
    updateSlider();
    }, 6000); 
});

//SLIDER SLUT 



function filterCategories(year) {
    let categories = document.querySelectorAll('.category');
    

    categories.forEach(function(category) {
        if (year === 'all') {
            category.style.display = 'block';
        } else if (category.getAttribute('data-year') == year) {
            category.style.display = 'block';
        } else {
            category.style.display = 'none';
        }
    });
}

function previewImage(event) {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    
    // Check if a file was selected
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block'; // Show the image preview
        };
        reader.readAsDataURL(imageInput.files[0]);
    }
}

function addImage() {
const imageInput = document.getElementById('imageInput');
const yearSelect = document.getElementById('yearSelect');
const popupMessage = document.getElementById('popupMessage');
const imagePreview = document.getElementById('imagePreview');

// Check if an image is selected and a year is selected
if (!imageInput.files.length) {
    showPopup("Fejl: Ingen billede valgt.");
} else if (!yearSelect.value) {
    showPopup("Fejl: Ingen kategori valgt.");
} else {
    // Normally add the image to the gallery (e.g., upload it or display in a gallery section)
    imageInput.value = ''; // Clear the file input
    yearSelect.value = ''; // Reset the year select
    imagePreview.src = ''; // Clear the image preview
    imagePreview.style.display = 'none'; // Hide the image preview
    
    showPopup("Succes: Billede blev tilføjet til galleriet.");
}
}


function showPopup(message) {
    const popupOverlay = document.getElementById('popupOverlay');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    
    popupMessage.textContent = message;
    popupOverlay.style.display = 'block';
    popup.style.display = 'block';
}

function closePopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    const popup = document.getElementById('popup');
    
    popupOverlay.style.display = 'none';
    popup.style.display = 'none';
}

