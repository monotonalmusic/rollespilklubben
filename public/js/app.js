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

document.addEventListener('DOMContentLoaded', function() {
  const gifImage = document.getElementById('devil-speech-bubble');
  const gifContainer = document.querySelector('.devil-container');

  // Define the GIF sources
  const gifOnHover = '/assets/sprites/speechbubbles/devil-speech-bubble-hover-ezgif.com-loop-count.gif'; // Hover GIF
  const gifOnLeave = '/assets/sprites/speechbubbles/devil-speech-bubble-new-leave-ezgif.com-loop-count.gif'; // Leave GIF

  const hoverGifDuration = 3000; // Duration of the hover GIF in milliseconds (e.g., 3 seconds)
  let isTransitioning = false; // Flag to track if a transition is happening
  let hoverTimeout = null; // To store the timeout ID
  let isMouseInside = false; // Track if the mouse is inside the container

  // Function to set GIF with smooth transition
  function setGifWithTransition(newSrc) {
      if (isTransitioning) return; // Prevent interruption

      isTransitioning = true;

      // Change the GIF immediately (no fade-out)
      gifImage.src = newSrc;
      gifImage.style.display = 'block'; // Ensure the image is visible
      gifImage.style.opacity = 1; // Ensure it's fully visible

      // Allow new animations after the duration of the GIF
      setTimeout(() => {
          isTransitioning = false;
      }, hoverGifDuration); // Wait for the hover GIF duration
  }

  // Event listener for mouse hover
  gifContainer.addEventListener('mouseover', () => {
      if (hoverTimeout) clearTimeout(hoverTimeout); // Clear any previous timeout if it exists
      isMouseInside = true; // Mouse is now inside the container
      setGifWithTransition(gifOnHover);

      // Prevent mouseout event from interrupting the hover animation by delaying it
      hoverTimeout = setTimeout(() => {
          // After the hover GIF duration, check if the mouse is still inside
          if (!isMouseInside) {
              // If the mouse already left during the hover, trigger the mouseout action
              handleMouseOut();
          } else {
              // If the mouse is still inside, wait for the actual mouseout
              gifContainer.addEventListener('mouseout', handleMouseOut);
          }
      }, hoverGifDuration); // Wait for the hover GIF duration
  });

  // Function to handle mouse out event
  function handleMouseOut() {
    if (gifImage.src === gifOnLeave) {
      return;
    } else {
      setGifWithTransition(gifOnLeave); // Transition to the leave GIF
      gifContainer.removeEventListener('mouseout', handleMouseOut); // Remove the mouseout listener
      isMouseInside = false; // Mouse is now outside the container

    }
  }

  // Detect when the mouse leaves the container
  gifContainer.addEventListener('mouseout', () => {
      isMouseInside = false; // Set the flag to false when mouse leaves
      // If the timeout has finished, trigger the mouseout animation immediately
      if (!isTransitioning) {
          handleMouseOut();
      }
  });
});



