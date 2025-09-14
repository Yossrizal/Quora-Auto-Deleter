# Quora Auto Deleter

Note: These are quick utility scripts meant to be pasted into your browser console. They have not been optimized and may require adjustments if Quora’s UI changes.

## What’s Inside

- first_auto_scroll_profile_page.js: Auto-scrolls your profile page to load dynamic content.
- execute_quora_auto_deleter.js: Finds and deletes answers/posts below a numeric threshold.
- auto_scroll_then_delete.js: Combines both steps — scrolls first, then deletes.

## Quick Start

You can use either the two-step flow or the single combined script.

### Option A — Two Steps

1) Auto Scroll Profile Page
- Open your Quora profile page.
- Open the browser console (`F12` or `Ctrl+Shift+I`).
- Copy-paste the contents of `first_auto_scroll_profile_page.js` and run it.
- Enter the scroll duration (seconds). The page will scroll to load content.

2) Execute Auto Deleter
- After scrolling finishes, copy-paste the contents of `execute_quora_auto_deleter.js` and run it.
- When prompted, enter:
  - Min Number: delete items with a value lower than this.
  - Max Tasks: limit how many deletions to attempt in this run.
- The script scans visible items, skips abbreviated counts (e.g., `rb`, `jt`), and deletes those below the threshold.

### Option B — Single Script (Auto-Scroll Then Delete)

Use `auto_scroll_then_delete.js` to chain both actions automatically:

- Open your Quora profile page and the browser console.
- Copy-paste the contents of `auto_scroll_then_delete.js` and run it.
- Provide inputs when prompted:
  - Scroll Duration (seconds): how long to auto-scroll to load content.
  - Min Number (default 10): items with a value lower than this are candidates for deletion.
  - Max Tasks (default 5): upper limit of deletions to attempt.
- Confirm the summary dialog. The script will:
  - Auto-scroll for the specified duration to load dynamic items.
  - Parse each item’s number, skipping abbreviated values like `rb`/`jt`.
  - Open the overflow menu, choose “Hapus jawaban/kiriman,” and click “Konfirmasi.”
- A final alert summarizes how many items were deleted and total execution time.

## Files

- `first_auto_scroll_profile_page.js`: Auto-scroll your Quora profile page.
- `execute_quora_auto_deleter.js`: Delete low-number answers/posts.
- `auto_scroll_then_delete.js`: Auto-scroll first, then delete in one run.

## Tips & Notes

- Start conservatively: try a small `Max Tasks` first to verify behavior.
- Ensure your profile page is loaded and in the correct language; button/selectors may change with UI updates.
- If the site structure changes, selectors in the scripts may need updates.
- Use at your own risk and only on content you intend to remove.
