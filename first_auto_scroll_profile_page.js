// Ask for duration in seconds
let seconds = prompt("Enter scroll duration in seconds:", "30");

if (seconds !== null) {
    seconds = parseInt(seconds);
    if (isNaN(seconds) || seconds <= 0) {
        alert("Please enter a valid positive number!");
    } else {
        if (confirm(`Start fast auto-scroll for ${seconds} seconds (for dynamic pages)?`)) {
            const step = 50; // pixels per scroll
            const interval = 10; // milliseconds between scrolls
            const maxTime = seconds * 1000;
            let elapsed = 0;

            const scrollInterval = setInterval(() => {
                window.scrollBy(0, step); // scroll down
                elapsed += interval;

                if (elapsed >= maxTime) {
                    clearInterval(scrollInterval);
                    console.log(`Auto-scroll stopped after ${seconds} seconds`);
                }
            }, interval);
        } else {
            console.log("Auto-scroll canceled");
        }
    }
} else {
    console.log("Auto-scroll canceled");
}
