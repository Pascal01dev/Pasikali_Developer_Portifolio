document.addEventListener("DOMContentLoaded", () => {
  // 1. SMOOTH NAVIGATION & TAB SCROLLING
  const tabButtons = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".printable-section");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active state from all tabs
      tabButtons.forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");

      const targetId = btn.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Scroll smoothly to target section
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // 2. REAL-TIME SEARCH / FILTERING
  const searchInput = document.getElementById("resumeSearch");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      sections.forEach((section) => {
        const textContent = section.textContent.toLowerCase();
        
        if (textContent.includes(searchTerm)) {
          section.classList.remove("hidden-section");
        } else {
          section.classList.add("hidden-section");
        }
      });
    });
  }

  // 3. DOWNLOAD CV AS PDF FUNCTIONALITY
  const downloadBtn = document.getElementById("downloadPdfBtn");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const element = document.getElementById("printableArea");

      // Configure pdf options
      const opt = {
        margin:       [0.4, 0.4, 0.4, 0.4],
        filename:     'Omolo_Pasikali_Resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#16202e' },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // Feedback state
      const originalText = downloadBtn.innerHTML;
      downloadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating PDF...';
      downloadBtn.disabled = true;

      // Ensure all sections are visible during PDF generation
      sections.forEach(s => s.classList.remove("hidden-section"));

      // Execute PDF generation
      html2pdf().set(opt).from(element).save().then(() => {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
      }).catch(err => {
        console.error("PDF generation error:", err);
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
      });
    });
  }
});