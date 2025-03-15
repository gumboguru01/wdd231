document.addEventListener("DOMContentLoaded", function () {
    const membersContainer = document.getElementById("membersContainer");
    const toggleButton = document.getElementById("toggleView");

    async function fetchMembers() {
        const response = await fetch("data/members.json");
        const members = await response.json();
        displayMembers(members);
    }

    function displayMembers(members) {
        membersContainer.innerHTML = "";
        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>Membership Level: ${member.membership}</p>
            `;
            membersContainer.appendChild(card);
        });
    }

    toggleButton.addEventListener("click", () => {
        membersContainer.classList.toggle("grid-view");
        membersContainer.classList.toggle("list-view");
    });

    fetchMembers();

    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});
