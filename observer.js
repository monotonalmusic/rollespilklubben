document.addEventListener('DOMContentLoaded', function() {
    const saruman = document.querySelector('.saruman-animation');

    const observerOptions = {
        root: null, // This means it uses the viewport as the container
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation when the element is visible for the first time
                saruman.style.animation = 'play-sprite .8s steps(6) 10';
                saruman.style.animationDelay = '1s';

                // Unobserve the element after the animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(saruman);
});
