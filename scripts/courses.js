const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, subject: "WDD", completed: true },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, subject: "WDD", completed: false },
  { code: "CSE 110", name: "Intro to Programming", credits: 2, subject: "CSE", completed: true },
  { code: "WDD 231", name: "Frontend Development I", credits: 3, subject: "WDD", completed: false }
];

const container = document.getElementById("courseContainer");
const totalCredits = document.getElementById("totalCredits");

function displayCourses(list) {
  container.innerHTML = "";
  let total = 0;
  list.forEach(course => {
    const div = document.createElement("div");
    div.textContent = course.code;
    div.classList.add(course.completed ? "completed" : "pending");
    container.appendChild(div);
    total += course.credits;
  });
  totalCredits.textContent = `The total credits for courses listed above is ${total}`;
}

document.getElementById("all").addEventListener("click", () => displayCourses(courses));
document.getElementById("cse").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "CSE")));
document.getElementById("wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "WDD")));

displayCourses(courses); // initial load
