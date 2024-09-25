// Load saved character data on page load
document.addEventListener("DOMContentLoaded", function() {
    loadCharacter();
});

function saveCharacter() {
    const name = document.getElementById('name').value;
    const race = document.getElementById('race').value;
    const strengths = document.getElementById('strengths').value;
    const weaknesses = document.getElementById('weaknesses').value;

    // Save to local storage
    const character = {
        name: name,
        race: race,
        strengths: strengths,
        weaknesses: weaknesses
    };

    localStorage.setItem('character', JSON.stringify(character));

    // Show message
    document.getElementById('message').textContent = 'Character saved successfully!';
}

function loadCharacter() {
    const savedCharacter = localStorage.getItem('character');

    if (savedCharacter) {
        const character = JSON.parse(savedCharacter);
        document.getElementById('name').value = character.name;
        document.getElementById('race').value = character.race;
        document.getElementById('strengths').value = character.strengths;
        document.getElementById('weaknesses').value = character.weaknesses;
    }
}
