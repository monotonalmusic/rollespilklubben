function handleSubmit(event) {
    event.preventDefault();

    // Display success message
    document.getElementById('successMessage').classList.remove('hidden');

    // Clear the form fields
    document.getElementById('contactForm').reset();

    return false; // Prevent the form from submitting for real
}

function toggleForm() {
    document.getElementById('formContainer').classList.toggle('hidden');
}
