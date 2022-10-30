const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    users.forEach(user => {
        const isVisible = user.title.toLowerCase().includes(value) || user.url.includes(value);
        user.element.classList.toggle("hide", !isVisible)
    })
})

fetch("https://jsonplaceholder.typicode.com/photos")
    .then(res => res.json())
    .then(data => {
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0];
            const header = card.querySelector("[data-header]");
            const body = card.querySelector("[data-body]");
            header.textContent = user.title;
            body.textContent = user.url;
            userCardContainer.append(card);
            return { title: user.title, url: user.url, element: card }
            // console.log(user);
        })
    })
