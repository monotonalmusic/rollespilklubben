
const newsContainer = document.getElementById("newsContainer");
const addNewsBtn = document.getElementById("addNewsBtn");
const submitNewsBtn = document.getElementById("submitNews");
const modal = document.getElementById("newsModal");
const closeModal = document.getElementsByClassName("close")[0];
const searchBar = document.getElementById("searchBar");


addNewsBtn.onclick = function() {
    modal.style.display = "block";
};


closeModal.onclick = function() {
    modal.style.display = "none";
};


function loadNews() {
    const news = JSON.parse(localStorage.getItem("news")) || [];
    news.forEach(displayNews);
}


submitNewsBtn.onclick = function() {
    const title = document.getElementById("newsTitle").value;
    const date = document.getElementById("newsDate").value;
    const content = document.getElementById("newsContent").value;
    const image = document.getElementById("newsImage").files[0];

    if (title && date && content) {
        const newsItem = { title, date, content, image: image ? URL.createObjectURL(image) : null };

        
        const news = JSON.parse(localStorage.getItem("news")) || [];
        news.push(newsItem);
        localStorage.setItem("news", JSON.stringify(news));

        
        displayNews(newsItem);

        
        modal.style.display = "none";
        document.getElementById("newsTitle").value = '';
        document.getElementById("newsDate").value = '';
        document.getElementById("newsContent").value = '';
        document.getElementById("newsImage").value = '';
    }
};


function displayNews(newsItem) {
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("news-item"); // Tilføj klasse til styling

    newsDiv.innerHTML = `
        ${newsItem.image ? `<img src="${newsItem.image}" alt="Nyhedsbillede" class="news-image">` : ""}
        <div class="text-content">
            <h3>${newsItem.title}</h3>
            <p>${newsItem.date}</p>
            <p>${newsItem.content}</p>
        </div>
    `;

    // Indsæt nyheden øverst i #newsContainer
    newsContainer.insertBefore(newsDiv, newsContainer.firstChild);
}



searchBar.oninput = function() {
    const query = this.value.toLowerCase();
    const newsItems = document.querySelectorAll("#newsContainer div");
    
    newsItems.forEach(item => {
        const title = item.querySelector("h3").innerText.toLowerCase();
        item.style.display = title.includes(query) ? "block" : "none";
    });
};


loadNews();

