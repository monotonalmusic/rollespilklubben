gsap.registerPlugin(ScrollTrigger);

let catAnimation = gsap.fromTo(".cat-container", 
    { x: 900 },  // Start position
    { 
      x: 0,  // End position (100px from the right)
      scrollTrigger: {
        trigger: ".cat-container",  // Start the animation when ".cat-container" enters the viewport
        start: "top right",  
        end: "top left",  // End the animation when ".cat-container" is 100px from the left
        ease: "power2.inOut",
        scrub: 4,  
        onLeave: () => {
          // This will run when the animation finishes
          document.querySelector(".cat").classList.add("new-sprite");
  
          // Kill the scroll trigger to stop further animations
          catAnimation.scrollTrigger.disable();
  
          // Get the final computed x position after the animation
          let finalX = gsap.getProperty(".cat-container", "x");
  

          // Manually set the position to lock it in place
          gsap.set(".cat-container", {
            x: finalX,  // Fix the x position to where it should be
            position: "absolute !important",  // Keep the element's position relative or fixed
            clearProps: "transform"  // Ensure all GSAP transforms are cleared
          });
  
        }
      }
    }
  );

  gsap.to(".dragon", {
    x: window.innerWidth + 400, // Move to the right beyond the screen
    duration: 3, // Animation duration in seconds
    ease: "power1.inOut", // Easing function
    onComplete: function() {
      gsap.set(".dragon", { x: window.innerWidth + 400 }); // Lock the position off-screen
    }
  });
  
  
  
  window.addEventListener('scroll', function() {
    const frames = [
        document.getElementById('frame-1'),
        document.getElementById('frame-2'),
        document.getElementById('frame-3'),
        document.getElementById('frame-4'),
        document.getElementById('frame-5'),
        document.getElementById('frame-6')
    ];

    const scrollValue = window.scrollY % 450; // Each cycle is 450px (6 frames x 75px)
    const frameIndex = Math.floor(scrollValue / 75); // Divide by 75 to find the frame

    frames.forEach((frame, index) => {
        frame.style.display = index === frameIndex ? 'block' : 'none';
    });
});


