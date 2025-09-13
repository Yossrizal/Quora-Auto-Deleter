(async () => {
  // --- Default values --- //
  const DEFAULT_MIN_NUMBER = 10;   // default minimal number
  const DEFAULT_MAX_TASKS = 5;     // default maksimal task

  const DELAY_CLICK = 1200;        // delay 1,2 detik setelah setiap klik (overflow & hapus)
  const DELAY_CONFIRM = 4000;      // delay 4 detik setelah klik konfirmasi
  const SCROLL_DELAY = 1000;       // delay setelah scroll ke elemen

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // --- Prompt user input --- //
  let MIN_NUMBER = parseInt(prompt("Masukkan minimal number (default = " + DEFAULT_MIN_NUMBER + "):", DEFAULT_MIN_NUMBER), 10);
  if (isNaN(MIN_NUMBER)) MIN_NUMBER = DEFAULT_MIN_NUMBER;

  let MAX_TASKS = parseInt(prompt("Masukkan maksimal task (default = " + DEFAULT_MAX_TASKS + "):", DEFAULT_MAX_TASKS), 10);
  if (isNaN(MAX_TASKS)) MAX_TASKS = DEFAULT_MAX_TASKS;

  // --- Mulai timer eksekusi --- //
  const startTime = performance.now();

  let successCount = 0; // counter berhasil

  try {
    const parents = document.querySelectorAll('.q-box.qu-pt--medium.qu-borderBottom');
    const tasks = [];

    // --- Kumpulkan semua task valid --- //
    parents.forEach((parent, idx) => {
      if (MAX_TASKS && tasks.length >= MAX_TASKS) return; // stop jika limit tercapai

      const titleEl = parent.querySelector('.q-box.qu-userSelect--text');
      const title = titleEl ? titleEl.textContent.trim() : '(no title)';

      const valEl = parent.querySelector(
        '.q-text.qu-whiteSpace--nowrap.qu-display--inline-flex.qu-alignItems--center.qu-justifyContent--center'
      );
      if (!valEl) return;

      const rawVal = valEl.textContent.trim();

      // skip nilai ribuan / jutaan
      if (/rb|jt/i.test(rawVal)) {
        console.log(`⏭️ Skip "${title}" (#${idx}) karena nilai singkatan (${rawVal})`);
        return;
      }

      const num = parseInt(rawVal.replace(/\D/g, ''), 10);
      if (isNaN(num)) return;

      if (num < MIN_NUMBER) {
        tasks.push({ parent, idx, title, number: num });
      }
    });

    console.table(tasks);

    // --- Proses tiap task --- //
    for (const task of tasks) {
      console.log(`\n=== Processing "${task.title}" (#${task.idx}, value: ${task.number}) ===`);

      // scroll ke parent div
      task.parent.scrollIntoView({ behavior: "smooth", block: "center" });
      await sleep(SCROLL_DELAY);

      // Step 1: klik overflow menu
      const overflowBtn = task.parent.querySelector(
        '.q-click-wrapper.puppeteer_test_overflow_menu.b10gcu9l.bobc9nh.b1cg7ppz.c1nud10e.qu-active--bg--darken.qu-borderRadius--pill.qu-alignItems--center.qu-justifyContent--center.qu-whiteSpace--nowrap.qu-userSelect--none.qu-display--inline-flex.qu-tapHighlight--white.qu-textAlign--center.qu-cursor--pointer.qu-hover--bg--darken'
      );
      if (!overflowBtn) {
        console.warn(`⚠️ Overflow button tidak ditemukan untuk "${task.title}"`);
        continue;
      }
      overflowBtn.click();
      console.log(`👉 Clicked overflow menu`);
      await sleep(DELAY_CLICK);

      // Step 2: klik "Hapus jawaban"
      const popoverItems = Array.from(document.querySelectorAll(
        '.q-click-wrapper.puppeteer_test_popover_item.c1nud10e.qu-p--medium.qu-px--medium.qu-py--small.qu-alignItems--center.qu-justifyContent--space-between.qu-display--flex.qu-bg--raised.qu-tapHighlight--white.qu-cursor--pointer.qu-hover--bg--darken.qu-hover--textDecoration--underline'
      ));
      const hapusBtn = popoverItems.find(el =>
        el.textContent.includes("Hapus jawaban") || el.textContent.includes("Hapus Kiriman")
      );
      if (!hapusBtn) {
        console.warn(`⚠️ Tidak ada popover "Hapus jawaban" ditemukan.`);
        continue;
      }
      hapusBtn.click();
      console.log(`✅ Clicked "Hapus jawaban"`);
      await sleep(DELAY_CLICK);

      // Step 3: klik tombol "Konfirmasi"
      const konfirmasiBtn = Array.from(document.querySelectorAll(
        'body > div#root .q-flex.qu-justifyContent--center.qu-alignItems--center .q-click-wrapper.b17i7nxr.b1l8alrs.bobc9nh.b1cg7ppz.c1nud10e.qu-active--textDecoration--none.qu-focus--textDecoration--none.qu-borderRadius--pill.qu-alignItems--center.qu-justifyContent--center.qu-whiteSpace--nowrap.qu-userSelect--none.qu-display--inline-flex.qu-bg--blue.qu-tapHighlight--white.qu-textAlign--center.qu-cursor--pointer.qu-hover--textDecoration--none'
      )).find(el => el.textContent.includes("Konfirmasi"));
      if (konfirmasiBtn) {
        konfirmasiBtn.click();
        console.log(`🚀 Clicked "Konfirmasi"`);
        successCount++; // ✅ hitung berhasil
        await sleep(DELAY_CONFIRM);
      } else {
        console.warn(`⚠️ Tombol "Konfirmasi" tidak ditemukan.`);
      }
    }

    // --- Hitung total waktu eksekusi --- //
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
