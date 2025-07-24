document.addEventListener('DOMContentLoaded', function() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const today = new Date();
    const dayIndex = today.getDay() - 1; // getDay() returns 0-6, Sun-Sat

    // Assigning the current date to each day and highlighting the current day
    days.forEach((day, index) => {
        const dateElement = document.getElementById(`${day}-date`);
        const dayDate = new Date(today);
        dayDate.setDate(today.getDate() + (index - dayIndex));
        dateElement.textContent = dayDate.toLocaleDateString();

        if (index === dayIndex) {
            document.querySelector(`.${day}`).classList.add('current-day');
        }
    });
});


