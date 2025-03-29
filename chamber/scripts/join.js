// Get all modal elements
const modals = document.querySelectorAll('.modal');
const modalLinks = document.querySelectorAll('.card a');
const closeModalButtons = document.querySelectorAll('.close');

// Show the modal when a membership card link is clicked
modalLinks.forEach((link, index) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        modals[index].style.display = 'block';
    });
});

// Close the modal when the "close" button is clicked
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').style.display = 'none';
    });
});

// Close the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Ensure the timestamp is dynamically generated in the form
document.getElementById('timestamp').value = new Date().toISOString();

// Optional: Add animation to membership cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = 1;
            card.style.transition = 'opacity 1s ease-in';
        }, index * 300);
    });
});
