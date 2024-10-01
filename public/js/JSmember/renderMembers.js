import { getMemberTemplate } from './template.js';

export function renderMembers(membersData) {
    const membersList = document.getElementById('members-list');
    
    // Ryd eksisterende indhold
    membersList.innerHTML = '';

    membersData.forEach((member, index) => {
        // Klon template indholdet
        const clone = getMemberTemplate();

        // Sæt billedet og andre data ind i det klonede element
        clone.querySelector('img').src = member.profilePicture;
        clone.querySelector('h3').textContent = member.name;
        clone.querySelector('.player-name').textContent = member.playerName;
        clone.querySelector('.age').textContent = member.age;
        clone.querySelector('.contact').textContent = member.contact;

        // Tilføj redigeringsknapens funktionalitet
        clone.querySelector('.edit-btn').addEventListener('click', () => {
            openEditPopup(index, membersData);
        });

        // Tilføj det klonede element til DOM'en
        membersList.appendChild(clone);
    });
}


// Popup-funktionalitet (del af renderingslogikken)
function openEditPopup(index, membersData) {
    const popup = document.getElementById('popup');
    const editForm = document.getElementById('edit-form');
    const member = membersData[index];

    // Fyld form med eksisterende data
    editForm.name.value = member.name;
    editForm.playerName.value = member.playerName;
    editForm.age.value = member.age;
    editForm.contact.value = member.contact;

    // Vis popup
    popup.style.display = 'block';

    // Håndter submit af formen
    editForm.onsubmit = function(event) {
        event.preventDefault();
        
        // Opdater medlemsdata
        membersData[index] = {
            ...member,
            name: editForm.name.value,
            playerName: editForm.playerName.value,
            age: editForm.age.value,
            contact: editForm.contact.value
        };

        // Opdater listen og luk popup
        renderMembers(membersData);
        popup.style.display = 'none';
    };

    // Luk popup, når der trykkes på krydset
    document.getElementById('close-popup').onclick = function() {
        popup.style.display = 'none';
    };
}
