const sites = [
    {
        name: 'NASA',
        link: "https://www.nasa.gov",
        category: "Наука",
        like: 0
    },
    {
        name: 'Nature',
        link: "https://www.nature.com",
        category: "Наука",
        like: 0
    },
    {
        name: 'YouTube',
        link: "https://www.youtube.com/",
        category: "Развлечения",
        like: 0
    },
    {
        name: 'Twitch',
        link: "https://www.twitch.tv/",
        category: "Развлечения",
        like: 0
    },
    {
        name: 'HTMLBook',
        link: "https://htmlbook.ru/",
        category: "Образование",
        like: 0
    },
    {
        name: 'learnJavaScript',
        link: "https://learn.javascript.ru/",
        category: "Образование",
        like: 0
    },
    {
        name: 'chatJPT',
        link: "https://chat.openai.com/",
        category: "Образование",
        like: 0
    }
];

const categories = ["Наука", "Развлечения", "Образование"];

let searchResult = [];

const categoryDiv = document.getElementById("categories");
const sitesDiv = document.getElementById('sites');
const addButton = document.getElementById('addButton');
const addSiteInputName = document.getElementById('addSiteInputName');
const addSiteInputLink = document.getElementById('addSiteInputLink');
const addSiteSelect = document.getElementById('addSiteSelect');
const searchInput = document.getElementById('searchInput');

// Добавление категорий на страницу
categories.forEach((category) => {
    const categoryButton = document.createElement("button");
    categoryButton.textContent = category;
    categoryButton.value = category;
    categoryButton.className = "btn";
    categoryButton.type = 'submit';
    displaySites(categoryButton, sites);
    categoryDiv.append(categoryButton);
});

// Функция отображения
function showSite(siteArr) {
    siteArr.forEach(site => {
        const siteContainer = document.createElement('div');
        siteContainer.className = 'site-container';
        const siteName = document.createElement('p');
        siteName.className = 'text';
        siteName.textContent = site.name;

        const siteLink = document.createElement('a');
        siteLink.className = 'link';
        siteLink.textContent = site.link;
        siteLink.href = site.link;

        const like = document.createElement('img');
        like.src = './like.jpeg';
        like.className = 'like';
        
        const likeCount = document.createElement('p');
        likeCount.textContent = site.like;
        likeFunc(like, likeCount, site);

        siteContainer.append(siteName, siteLink, like, likeCount);
        sitesDiv.append(siteContainer);
    })
}

// Функция - Поставить лайк
function likeFunc(button, likeCount, site) {
    button.addEventListener('click', function() {
        site.like++;
        likeCount.textContent = site.like;
    })
}

// Функция отображения сайтов по категории
function displaySites(button, siteArr) {
    button.addEventListener('click', function () {
        const foundSites = siteArr.filter(obj => obj.category === button.value);
        sitesDiv.innerHTML = '';
        showSite(foundSites);
    })
}

// Функция добавления сайта
addButton.addEventListener('click', function () {
    if (addSiteInputName.value && addSiteInputLink.value) {
        const newSite = {};
        newSite.name = addSiteInputName.value;
        newSite.link = addSiteInputLink.value;
        newSite.category = addSiteSelect.value;
        newSite.like = 0;
        sites.push(newSite);
        sitesDiv.innerHTML = '';
        const filteredSites = sites.filter(obj => obj.category === newSite.category);
        showSite(filteredSites);
    }
    addSiteInputName.value = '';
    addSiteInputLink.value = '';
});

// Функция поиска
function searchSites() {
    let found = false;
    searchResult = sites.filter(site => site.name.toUpperCase() === searchInput.value.toUpperCase())
    if (searchResult.length > 0) {
        sitesDiv.innerHTML = '';
        showSite(searchResult);
        found = true;
    }
    searchInput.value = '';
    if (!found) {
        sitesDiv.innerHTML = '';
        const siteContainer = document.createElement('div');
        siteContainer.className = 'site-container';
        const siteName = document.createElement('p');
        siteName.className = 'text';
        siteName.textContent = 'По вашему запросу ничего не найдено ;('
        siteContainer.append(siteName);
        sitesDiv.append(siteContainer);
    }
};

// Функция чтобы кнопка поиска реагировала на Enter
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchSites();
    }
});