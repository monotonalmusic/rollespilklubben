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
