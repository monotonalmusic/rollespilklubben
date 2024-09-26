
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
