// Select the elements
const character = document.querySelector('.character');
const slot = document.querySelector('.slot');
const image = document.querySelector('.slot-braziers');

// Create an IntersectionObserver
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Check if the character is intersecting with the slot
        if (entry.isIntersecting) {
            // When the intersection occurs, change the image display
            image.style.display = 'block';
        }
    });
}, {
    root: null, // use the viewport as the root
    threshold: 0.5 // Trigger when 50% of the character intersects
});

// Observe the 'slot' for intersection with the character
observer.observe(slot);
