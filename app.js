gsap.registerPlugin(ScrollTrigger);

gsap.from(".cat-container", {
    x: 1000,
    scrollTrigger: {
      trigger: ".cat-container",
      start: "top right",  // Adjust the start and end positions as needed
      end: "top left",
      scrub: 4,  // Increase this value to make the animation slower
      ease: "circ",  // You can experiment with different easing functions here
    },
});

window.addEventListener('scroll', function() {
    const leftLegImg = document.getElementById('left-leg');
    const rightLegImg = document.getElementById('right-leg');

        if (window.scrollY % 150 < 75) {  
            leftLegImg.style.display = 'block';
            rightLegImg.style.display = 'none';
        } else {
            leftLegImg.style.display = 'none';
            rightLegImg.style.display = 'block';
        }
        
    }
);


