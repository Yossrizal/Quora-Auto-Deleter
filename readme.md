# Quora Auto Deleter

**Note:** This script is a temporary solution and hasn't been optimized or simplified yet.
This project contains two scripts to help automate actions on your Quora profile page:

## Usage Instructions

1. **Auto Scroll Profile Page**

   - Open your Quora profile page in your browser.
   - Open the browser console (press `F12` or `Ctrl+Shift+I`).
   - Copy and paste the contents of [`first_auto_scroll_profile_page.js`](c:/Projects/Quora%20Auto%20Deleter/first_auto_scroll_profile_page.js) into the console and run it.
   - Enter the desired scroll duration in seconds when prompted. The script will auto-scroll the page to load all dynamic content.

2. **Execute Auto Deleter**

   - After the profile page has been fully loaded and scrolled, copy and paste the contents of [`execute_quora_auto_deleter.js`](c:/Projects/Quora%20Auto%20Deleter/execute_quora_auto_deleter.js) into the console and run it.
   - Enter the minimum number and maximum tasks as prompted.
   - The script will automatically find and delete answers/posts below the specified number threshold.

## Files

- [`first_auto_scroll_profile_page.js`](c:/Projects/Quora%20Auto%20Deleter/first_auto_scroll_profile_page.js): Script to auto-scroll your Quora profile page.
- [`execute_quora_auto_deleter.js`](c:/Projects/Quora%20Auto%20Deleter/execute_quora_auto_deleter.js): Script to automatically delete low-number answers/posts.

## Notes

- Use these scripts responsibly and at your own risk.
- Make sure you are on your Quora profile page before running the scripts.