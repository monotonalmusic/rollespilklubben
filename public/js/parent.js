import components from "../js/componentparentPage.js";

const app = {};

app.init = async () => {
    // Indsæt indhold i infobox-elementet
    document.getElementById('infobox').innerHTML = components.infobox();
};

// Brug den korrekte event type 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', app.init);