
async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    const directory = document.getElementById("directory");
    directory.innerHTML = "";

    const isGrid = directory.classList.contains("grid");

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add(isGrid ? "member-card" : "member-list");

        if (isGrid) {
            card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p>Level: ${member.membershipLevel}</p>
      `;
        } else {
            card.innerHTML = `
        <span>${member.name}</span>
        <span>${member.phone}</span>
        <a href="${member.website}" target="_blank">Website</a>
      `;
        }

        directory.appendChild(card);
    });
}

// Toggle view
document.getElementById("grid-view").addEventListener("click", () => {
    const directory = document.getElementById("directory");
    directory.classList.add("grid");
    directory.classList.remove("list");
    loadMembers();
});

document.getElementById("list-view").addEventListener("click", () => {
    const directory = document.getElementById("directory");
    directory.classList.add("list");
    directory.classList.remove("grid");
    loadMembers();
});

// Footer info
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// Initial load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("directory").classList.add("grid");
    loadMembers();
});
