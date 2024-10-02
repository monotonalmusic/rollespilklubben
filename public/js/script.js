// Function to create and display the username in an h1 tag within a div with class "container"
function displayUsername() {
    const username = localStorage.getItem('username');
    const containerDiv = document.querySelector('.container');

    // Create an h1 element and set its text
    const h1 = document.createElement('h1');
    h1.textContent = `Vær hilset, ${username}!`;

    // Insert the h1 as the first element in the container
    containerDiv.prepend(h1);
}

// Call the function to display the username
displayUsername();

// Function to update the visibility of the header
function updateHeaderVisibility() {
    const uploadedItems = document.getElementById('uploadedItems');
    const header = document.querySelector('.din-karakterer-text');

    if (uploadedItems.children.length > 0) {
        header.style.display = 'block'; // Show the header if there are uploaded items
    } else {
        header.style.display = 'none'; // Hide the header if there are no uploaded items
    }
}

// Image preview functionality
document.getElementById('image').addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
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
            updateHeaderVisibility(); // Update header visibility after uploading a new item
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
    img.alt = data.Navn; // Use 'Navn' for alt text
    img.style.maxWidth = '200px';
    itemDiv.appendChild(img);

    // Add the Navn
    const name = document.createElement('h3');
    name.textContent = `Navn: ${data.Navn}`;
    itemDiv.appendChild(name);

    // Add the Race
    const race = document.createElement('p');
    race.textContent = `Race: ${data.Race}`;
    itemDiv.appendChild(race);

    // Add the Klasse
    const klasse = document.createElement('p');
    klasse.textContent = `Klasse: ${data.Klasse}`;
    itemDiv.appendChild(klasse);

    // Add the Styrker
    const styrker = document.createElement('p');
    styrker.textContent = `Styrker: ${data.Styrker}`;
    itemDiv.appendChild(styrker);

    // Add the Svageheder
    const svageheder = document.createElement('p');
    svageheder.textContent = `Svageheder: ${data.Svageheder}`;
    itemDiv.appendChild(svageheder);

    // Add the MereOm
    const mereOm = document.createElement('p');
    mereOm.textContent = `Mere om: ${data.MereOm}`;
    itemDiv.appendChild(mereOm);

    // Add an edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editUploadedItem(data));
    itemDiv.appendChild(editBtn);

    // Add a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteUploadedItem(itemDiv, data.filePath));
    itemDiv.appendChild(deleteBtn);

    // Append the new item to the uploadedItems section
    uploadedItems.appendChild(itemDiv);
    updateHeaderVisibility(); // Update header visibility after displaying an uploaded item
}

// Function to handle deletion of an uploaded item
async function deleteUploadedItem(itemDiv, filePath) {
    if (confirm('Er du sikker på, at du vil slette denne genstand?')) {
        try {
            const response = await fetch(`/delete?filePath=${encodeURIComponent(filePath)}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Remove the item from the DOM
                itemDiv.remove();
                updateHeaderVisibility(); // Update header visibility after deleting an item
            } else {
                alert('Error deleting item!');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('An error occurred while deleting the item.');
        }
    }
}

// Function to handle editing of an uploaded item (including changing the image)
function editUploadedItem(data) {
    // Populate the edit form with the current metadata
    document.getElementById('editNavn').value = data.Navn;
    document.getElementById('editRace').value = data.Race;
    document.getElementById('editKlasse').value = data.Klasse;
    document.getElementById('editStyrker').value = data.Styrker;
    document.getElementById('editSvageheder').value = data.Svageheder;
    document.getElementById('editMereOm').value = data.MereOm;
    document.getElementById('editFilePath').value = data.filePath; // Hidden field to store file path

    // Show the current image preview in the edit form
    const editImagePreview = document.getElementById('editImagePreview');
    editImagePreview.src = data.filePath;
    editImagePreview.style.display = 'block';

    // Show the edit form
    document.getElementById('editFormContainer').style.display = 'block';
}

// Function to handle form submission for editing (with optional image change)
document.getElementById('editForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('filePath', document.getElementById('editFilePath').value); // File path is required for editing
    formData.append('Navn', document.getElementById('editNavn').value);
    formData.append('Race', document.getElementById('editRace').value);
    formData.append('Klasse', document.getElementById('editKlasse').value);
    formData.append('Styrker', document.getElementById('editStyrker').value);
    formData.append('Svageheder', document.getElementById('editSvageheder').value);
    formData.append('MereOm', document.getElementById('editMereOm').value);

    // Check if a new image was selected for upload
    const newImageFile = document.getElementById('editImage').files[0];
    if (newImageFile) {
        formData.append('image', newImageFile); // Append new image if it exists
    }

    try {
        const response = await fetch('/edit', {
            method: 'PUT',
            body: formData
        });

        if (response.ok) {
            alert('Genstand opdateret!');
            document.getElementById('editFormContainer').style.display = 'none'; // Hide the edit form
            document.getElementById('uploadedItems').innerHTML = ''; // Clear the list
            loadUploadedItems(); // Reload the list with updated data
        } else {
            alert('Fejl ved opdatering af genstand.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('En fejl opstod under opdatering af genstanden.');
    }
});

// Function to load all previously uploaded items when the page loads
async function loadUploadedItems() {
    try {
        const response = await fetch('/uploads-data'); // Fetch all uploaded items
        const items = await response.json();

        items.forEach(item => {
            displayUploadedItem(item); // Display each uploaded item
        });

        // Update header visibility after loading items
        updateHeaderVisibility();
    } catch (err) {
        console.error('Error fetching uploaded items:', err);
    }
}

// Load uploaded items on page load
window.onload = loadUploadedItems;

// Initially hide the edit form and the header
document.getElementById('editFormContainer').style.display = 'none';
document.querySelector('.din-karakterer-text').style.display = 'none';
