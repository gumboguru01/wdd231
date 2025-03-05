document.addEventListener("DOMContentLoaded", () => {
    // Course Data Array
    const courses = [
        { code: "CSE 110", category: "CSE", credits: 3, completed: true },
        { code: "CSE 111", category: "CSE", credits: 3, completed: false },
        { code: "CSE 210", category: "CSE", credits: 4, completed: true },
        { code: "WDD 130", category: "WDD", credits: 3, completed: true },
        { code: "WDD 131", category: "WDD", credits: 3, completed: false },
        { code: "WDD 231", category: "WDD", credits: 3, completed: false }
    ];

    const courseContainer = document.getElementById("course-list");
    const creditDisplay = document.getElementById("total-credits");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // Function to display courses
    function displayCourses(filter) {
        courseContainer.innerHTML = ""; // Clear existing content
        let filteredCourses = filter === "All" ? courses : courses.filter(course => course.category === filter);

        filteredCourses.forEach(course => {
            const courseDiv = document.createElement("div");
            courseDiv.classList.add("course-card");
            if (course.completed) {
                courseDiv.classList.add("completed");
            }
            courseDiv.innerHTML = `<span>${course.code} - ${course.credits} credits</span>`;
            courseContainer.appendChild(courseDiv);
        });

        // Calculate total credits dynamically
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        creditDisplay.textContent = `Total Credits: ${totalCredits}`;
    }

    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filterType = button.dataset.filter;
            displayCourses(filterType);
        });
    });

    // Initialize with all courses
    displayCourses("All");

    // Footer Date Updates
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});
