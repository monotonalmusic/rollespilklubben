
const openPopupButtons = document.querySelectorAll('.open-popup');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');


openPopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = document.querySelector(button.getAttribute('data-target'));
        target.style.display = "block";
    });
});


closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').style.display = "none";
    });
});


window.addEventListener('click', (event) => {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});



