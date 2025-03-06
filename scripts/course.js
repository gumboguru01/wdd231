document.addEventListener("DOMContentLoaded", function () {
    // Set the current year dynamically
    document.getElementById("currentyear").textContent = new Date().getFullYear();

    // Set the last modified date
    document.getElementById("lastModified").textContent = `Last Update: ${document.lastModified}`;

    // Responsive navigation menu
    const menuButton = document.getElementById("menu");
    const navLinks = document.getElementById("nav-links");

    menuButton.addEventListener("click", () => {
        navLinks.classList.toggle("hidden");
    });

    // Course List Array
    const courses = [
        { code: "CSE 110", name: "Intro to Programming", category: "CSE", credits: 3, completed: false },
        { code: "CSE 111", name: "Programming with Functions", category: "CSE", credits: 4, completed: true },
        { code: "CSE 210", name: "Programming with Classes", category: "CSE", credits: 3, completed: true },
        { code: "WDD 130", name: "Web Fundamentals", category: "WDD", credits: 3, completed: true },
        { code: "WDD 131", name: "Web Design", category: "WDD", credits: 3, completed: false },
        { code: "WDD 231", name: "Web Frontend Development", category: "WDD", credits: 3, completed: false }
    ];

    // Function to display courses dynamically
    function displayCourses(filter) {
        const courseContainer = document.getElementById("courses");
        courseContainer.innerHTML = "";

        let filteredCourses = courses;
        if (filter !== "all") {
            filteredCourses = courses.filter(course => course.category === filter);
        }

        let totalCredits = 0;
        filteredCourses.forEach(course => {
            totalCredits += course.credits;
            const courseCard = document.createElement("div");
            courseCard.classList.add("course-card");
            if (course.completed) {
                courseCard.classList.add("completed");
            }

            courseCard.innerHTML = `
                <p class="course-code">${course.code}</p>
                <p class="course-name">${course.name}</p>
            `;
            courseContainer.appendChild(courseCard);
        });

        // Update total credits
        document.getElementById("total-credits").textContent = totalCredits;
    }

    // Add event listeners for filter buttons
    document.getElementById("filter-buttons").addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            displayCourses(event.target.getAttribute("data-filter"));
        }
    });

    // Initialize with all courses displayed
    displayCourses("all");
});
