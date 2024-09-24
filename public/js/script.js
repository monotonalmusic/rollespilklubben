// Image preview functionality
document.querySelector('input[type="file"]').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const previewImage = document.getElementById('preview');
            previewImage.src = e.target.result;
            previewImage.style.display = 'block'; // Show the image preview
        };

        reader.readAsDataURL(file);
    } 
});

// JavaScript to handle form submission and display uploaded data
document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the form data
    const formData = new FormData(this);

    try {
        // Send the form data via POST to the server
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            displayUploadedItem(result);
            this.reset(); // Clear the form fields after successful upload
            clearImagePreview(); // Clear the image preview after successful upload
        } else {
            alert('Error uploading file!');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('An error occurred while uploading the file.');
    }
});

// Function to clear the image preview
function clearImagePreview() {
    const previewImage = document.getElementById('preview');
    previewImage.src = ''; // Clear the image src
    previewImage.style.display = 'none'; // Hide the image preview
}

// Function to display the uploaded item
function displayUploadedItem(data) {
    const uploadedItems = document.getElementById('uploadedItems');

    // Create a new div for the uploaded item
    const itemDiv = document.createElement('div');
    itemDiv.className = 'uploaded-item';
    itemDiv.dataset.filepath = data.filePath; // Store the file path in the data attribute for deletion

    // Add the image
    const img = document.createElement('img');
    img.src = data.filePath;
    img.alt = data.title;
    img.style.maxWidth = '200px';
    itemDiv.appendChild(img);

    // Add the title
    const title = document.createElement('h3');
    title.textContent = `Title: ${data.title}`;
    itemDiv.appendChild(title);

    // Add the event date
    const eventDate = document.createElement('p');
    eventDate.textContent = `Event Date: ${data.eventDate}`;
    itemDiv.appendChild(eventDate);

    // Add the description
    const description = document.createElement('p');
    description.textContent = `Description: ${data.description}`;
    itemDiv.appendChild(description);

    // Add a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteUploadedItem(itemDiv, data.filePath));
    itemDiv.appendChild(deleteBtn);

    // Append the new item to the uploadedItems section
    uploadedItems.appendChild(itemDiv);
}

// Function to handle deletion of an uploaded item
async function deleteUploadedItem(itemDiv, filePath) {
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            const response = await fetch(`/delete?filePath=${encodeURIComponent(filePath)}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Remove the item from the DOM
                itemDiv.remove();
            } else {
                alert('Error deleting item!');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('An error occurred while deleting the item.');
        }
    }
}

// Function to load all previously uploaded items when the page loads
async function loadUploadedItems() {
    try {
        const response = await fetch('/uploads-data'); // Fetch all uploaded items
        const items = await response.json();

        items.forEach(item => {
            displayUploadedItem(item); // Display each uploaded item
        });
    } catch (err) {
        console.error('Error fetching uploaded items:', err);
    }
}

// Load uploaded items on page load
window.onload = loadUploadedItems;
