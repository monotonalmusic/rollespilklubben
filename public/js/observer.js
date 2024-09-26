// Select the elements
const character = document.querySelector('.character');
const slot = document.querySelector('.slot');
const image = document.querySelector('.slot-braziers');
const bridgefires = document.querySelector('.bridgefire-container');
const bridge = document.querySelector('.bro');

// Create an IntersectionObserver for the slot
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

// Create another IntersectionObserver for the bridge
const bridgeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Check if the character is intersecting with the bridge
        if (entry.isIntersecting) {
            // When the intersection occurs, change the bridgefires display
            bridgefires.style.display = 'block';
        }
    });
}, {
    root: null, // use the viewport as the root
    threshold: .8 // Trigger when 50% of the character intersects the bridge
});

// Observe the 'bridge' for intersection with the character
bridgeObserver.observe(bridge);
