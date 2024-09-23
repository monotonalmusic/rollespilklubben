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


