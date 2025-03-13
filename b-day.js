document.addEventListener("DOMContentLoaded", function () {
    function updateCountdown() {
        const now = new Date();
        let birthday = new Date(now.getFullYear(), 5, 28); // June 28 of the current year

        // If today is past June 28, set the countdown for next year
        if (now > birthday) {
            birthday.setFullYear(now.getFullYear() + 1);
        }

        const timeDiff = birthday - now;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        document.getElementById("birthday-countdown").textContent = `${daysLeft} days for Skye's birthday!`;
    }

    updateCountdown(); // Run immediately
    setInterval(updateCountdown, 86400000); // Update once per day
});
