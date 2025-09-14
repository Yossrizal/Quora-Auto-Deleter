// Combined auto-scroll and auto-deleter script
// This script will auto-scroll for a given duration, then execute the Quora auto-deleter logic


(async () => {
    // --- Collect all user inputs first --- //
    // Scroll duration
    let seconds = prompt("Enter scroll duration in seconds:", "30");
    if (seconds === null) {
        console.log("Auto-scroll canceled");
        return;
    }
    seconds = parseInt(seconds);
    if (isNaN(seconds) || seconds <= 0) {
        alert("Please enter a valid positive number!");
        return;
    }

    // Quora Auto Deleter inputs
    const DEFAULT_MIN_NUMBER = 10;
    const DEFAULT_MAX_TASKS = 5;
    let MIN_NUMBER = parseInt(prompt("Masukkan minimal number (default = " + DEFAULT_MIN_NUMBER + "):", DEFAULT_MIN_NUMBER), 10);
    if (isNaN(MIN_NUMBER)) MIN_NUMBER = DEFAULT_MIN_NUMBER;
    let MAX_TASKS = parseInt(prompt("Masukkan maksimal task (default = " + DEFAULT_MAX_TASKS + "):", DEFAULT_MAX_TASKS), 10);
    if (isNaN(MAX_TASKS)) MAX_TASKS = DEFAULT_MAX_TASKS;

    // Confirm all actions before starting
    if (!confirm(`Start fast auto-scroll for ${seconds} seconds (for dynamic pages)?\nThen auto-delete with Min Number = ${MIN_NUMBER}, Max Tasks = ${MAX_TASKS}`)) {
        console.log("Auto-scroll and delete canceled");
        return;
    }

    // --- Auto-scroll logic --- //
    const step = 50; // pixels per scroll
    const interval = 10; // milliseconds between scrolls
    const maxTime = seconds * 1000;
    let elapsed = 0;
    await new Promise(resolve => {
        const scrollInterval = setInterval(() => {
            window.scrollBy(0, step);
            elapsed += interval;
            if (elapsed >= maxTime) {
                clearInterval(scrollInterval);
                console.log(`Auto-scroll stopped after ${seconds} seconds`);
                resolve();
            }
        }, interval);
    });

    // --- Quora Auto Deleter logic --- //
    const DELAY_CLICK = 1200;
    const DELAY_CONFIRM = 4000;
    const SCROLL_DELAY = 1000;
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const startTime = performance.now();
    let successCount = 0;

    try {
        const parents = document.querySelectorAll('.q-box.qu-pt--medium.qu-borderBottom');
        const tasks = [];
        parents.forEach((parent, idx) => {
            if (MAX_TASKS && tasks.length >= MAX_TASKS) return;
            const titleEl = parent.querySelector('.q-box.qu-userSelect--text');
            const title = titleEl ? titleEl.textContent.trim() : '(no title)';
            const valEl = parent.querySelector('.q-text.qu-whiteSpace--nowrap.qu-display--inline-flex.qu-alignItems--center.qu-justifyContent--center');
            let rawVal = '0';
            if (!valEl) {
                console.warn(`⚠️ Value element tidak ditemukan untuk "${title}" (#${idx})`);
            } else {
                rawVal = valEl.textContent.trim();
            }
            
            if (/rb|jt/i.test(rawVal)) {
                console.log(`⏭️ Skip "${title}" (#${idx}) karena nilai singkatan (${rawVal})`);
                return;
            }
            let num = parseInt(rawVal.replace(/\D/g, ''), 10);
            if (isNaN(num) || num === null) num = 0;
            if (num < MIN_NUMBER) {
                tasks.push({ parent, idx, title, number: num });
            }
        });
        console.table(tasks);
        for (const task of tasks) {
            console.log(`\n=== Processing "${task.title}" (#${task.idx}, value: ${task.number}) ===`);
            task.parent.scrollIntoView({ behavior: "smooth", block: "center" });
            await sleep(SCROLL_DELAY);
            const overflowBtn = task.parent.querySelector('.q-click-wrapper.puppeteer_test_overflow_menu.b10gcu9l.bobc9nh.b1cg7ppz.c1nud10e.qu-active--bg--darken.qu-borderRadius--pill.qu-alignItems--center.qu-justifyContent--center.qu-whiteSpace--nowrap.qu-userSelect--none.qu-display--inline-flex.qu-tapHighlight--white.qu-textAlign--center.qu-cursor--pointer.qu-hover--bg--darken');
            if (!overflowBtn) {
                console.warn(`⚠️ Overflow button tidak ditemukan untuk "${task.title}"`);
                continue;
            }
            overflowBtn.click();
            console.log(`👉 Clicked overflow menu`);
            await sleep(DELAY_CLICK);
            const popoverItems = Array.from(document.querySelectorAll('.q-click-wrapper.puppeteer_test_popover_item.c1nud10e.qu-p--medium.qu-px--medium.qu-py--small.qu-alignItems--center.qu-justifyContent--space-between.qu-display--flex.qu-bg--raised.qu-tapHighlight--white.qu-cursor--pointer.qu-hover--bg--darken.qu-hover--textDecoration--underline'));
            const hapusBtn = popoverItems.find(el => el.textContent.includes("Hapus jawaban") || el.textContent.includes("Hapus kiriman"));
            if (!hapusBtn) {
                console.warn(`⚠️ Tidak ada popover "Hapus jawaban" ditemukan.`);
                continue;
            }
            hapusBtn.click();
            console.log(`✅ Clicked "Hapus jawaban"`);
            await sleep(DELAY_CLICK);
            const konfirmasiBtn = Array.from(document.querySelectorAll('body > div#root .q-flex.qu-justifyContent--center.qu-alignItems--center .q-click-wrapper.b17i7nxr.b1l8alrs.bobc9nh.b1cg7ppz.c1nud10e.qu-active--textDecoration--none.qu-focus--textDecoration--none.qu-borderRadius--pill.qu-alignItems--center.qu-justifyContent--center.qu-whiteSpace--nowrap.qu-userSelect--none.qu-display--inline-flex.qu-bg--blue.qu-tapHighlight--white.qu-textAlign--center.qu-cursor--pointer.qu-hover--textDecoration--none')).find(el => el.textContent.includes("Konfirmasi"));
            if (konfirmasiBtn) {
                konfirmasiBtn.click();
                console.log(`🚀 Clicked "Konfirmasi"`);
                successCount++;
                await sleep(DELAY_CONFIRM);
            } else {
                console.warn(`⚠️ Tombol "Konfirmasi" tidak ditemukan.`);
            }
        }
        const endTime = performance.now();
        const execTime = ((endTime - startTime) / 1000).toFixed(2);
        console.log("✅ Semua task selesai diproses.");
        alert(
            `✅ Semua task selesai diproses!\n` +
            `Min Number = ${MIN_NUMBER}\n` +
            `Max Tasks = ${MAX_TASKS}\n\n` +
            `📌 Jumlah berhasil dihapus: ${successCount}\n` +
            `⏱️ Waktu eksekusi: ${execTime} detik`
        );
    } catch (e) {
        console.error("Error:", e);
        alert("❌ Terjadi error: " + e.message);
    }
})();
