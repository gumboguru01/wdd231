// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display the submitted form details
    const formData = JSON.parse(localStorage.getItem('formData')) || {};

    if (formData) {
        // Populate the "Thank You" page with submitted details
        document.getElementById('first-name').textContent = formData.firstName;
        document.getElementById('last-name').textContent = formData.lastName;
        document.getElementById('email').textContent = formData.email;
        document.getElementById('phone').textContent = formData.phone;
        document.getElementById('organization').textContent = formData.organization;
        document.getElementById('timestamp').textContent = formData.timestamp;
    }

    // Handle the back to form button click (optional)
    document.getElementById('back-button').addEventListener('click', () => {
        window.location.href = 'join.html';  // Replace with the actual form page URL
    });
});
