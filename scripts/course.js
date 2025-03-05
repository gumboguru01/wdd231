document.addEventListener("DOMContentLoaded", function () {
    // Dynamic Year and Last Modified Date
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    // Responsive Navigation Toggle
    document.getElementById("menu-toggle").addEventListener("click", function () {
        document.getElementById("nav-links").classList.toggle("show");
    });

    // Course Filtering Functionality
    const courses = [
        { name: "CSE 110", category: "CSE", completed: true },
        { name: "CSE 111", category: "CSE", completed: false },
        { name: "CSE 210", category: "CSE", completed: true },
        { name: "WDD 130", category: "WDD", completed: false },
        { name: "WDD 131", category: "WDD", completed: true },
        { name: "WDD 231", category: "WDD", completed: false }
    ];

    function displayCourses(filter) {
        const courseContainer = document.getElementById("course-list");
        courseContainer.innerHTML = "";
        let totalCredits = 0;

        courses.filter(course => filter === "All" || course.category === filter)
            .forEach(course => {
                let courseElement = document.createElement("div");
                courseElement.classList.add("course");
                if (course.completed) courseElement.classList.add("completed");
                courseElement.textContent = course.name;
                courseContainer.appendChild(courseElement);
                totalCredits += 3; // Assuming each course is 3 credits
            });

        document.getElementById("total-credits").textContent = `Total Credits: ${totalCredits}`;
    }

    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", function () {
            displayCourses(this.dataset.filter);
        });
    });

    // Initialize display
    displayCourses("All");
});
