// RESPONSIVE HEADER
document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav-menu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-menu a");
  const scrollContainer = document.querySelector(".portifolio-details");

  if (mobileToggle && mobileNav) {
    // 1. Toggle mobile menu open/close & switch icon between bars/xmark
    mobileToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
      
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        if (mobileNav.classList.contains("active")) {
          icon.className = "fa-solid fa-xmark";
        } else {
          icon.className = "fa-solid fa-bars";
        }
      }
    });

    // 2. Handle smooth scrolling and auto-close menu on click
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");

        if (targetId.startsWith("#") && targetId.length > 1) {
          e.preventDefault();
          const targetSection = document.querySelector(targetId);

          if (targetSection) {
            // Target scrolling depending on layout mode
            if (scrollContainer && window.innerWidth > 768) {
              const targetPosition = targetSection.offsetTop - 20;
              scrollContainer.scrollTo({
                top: targetPosition,
                behavior: "smooth",
              });
            } else {
              targetSection.scrollIntoView({ behavior: "smooth" });
            }
          }
        }

        // Highlight active link
        mobileNavLinks.forEach((nav) => nav.classList.remove("active-nav"));
        link.classList.add("active-nav");

        // Close menu and reset icon
        mobileNav.classList.remove("active");
        const icon = mobileToggle.querySelector("i");
        if (icon) {
          icon.className = "fa-solid fa-bars";
        }
      });
    });
  }
});



// SIDEBAR JS FOR THE SERVICES MENU
// List of skills to cycle through
const sidebarSkills = [
  "Web Design",
  "Web Development",
  "Database design and development",
  "DevOps"
];

const typewriterElement = document.getElementById("typingText");
let arrayIndex = 0;
let characterIndex = 0;
let isDeletingText = false;

// Timing configurations (in milliseconds)
const typingSpeed = 70;
const deletingSpeed = 35;
const pauseAtEnd = 2000; 
const pauseBeforeStart = 400;

function runSidebarTypewriter() {
  if (!typewriterElement) return; // Prevent errors if element is missing on some pages
  
  const currentText = sidebarSkills[arrayIndex];

  if (isDeletingText) {
    typewriterElement.textContent = currentText.substring(0, characterIndex - 1);
    characterIndex--;
  } else {
    typewriterElement.textContent = currentText.substring(0, characterIndex + 1);
    characterIndex++;
  }

  let nextDelay = isDeletingText ? deletingSpeed : typingSpeed;

  // Finished typing the current skill
  if (!isDeletingText && characterIndex === currentText.length) {
    nextDelay = pauseAtEnd;
    isDeletingText = true;
  } 
  // Finished deleting the current skill
  else if (isDeletingText && characterIndex === 0) {
    isDeletingText = false;
    arrayIndex = (arrayIndex + 1) % sidebarSkills.length;
    nextDelay = pauseBeforeStart;
  }

  setTimeout(runSidebarTypewriter, nextDelay);
}

// Safely start once DOM loads
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(runSidebarTypewriter, pauseBeforeStart);
});


// HEADER JS FOR THE NAVIGATION MENU
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("header nav a");
  const sections = document.querySelectorAll("section[id]");
  const container = document.querySelector(".portifolio-details");

  if (container && sections.length > 0) {
    container.addEventListener("scroll", () => {
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (container.scrollTop >= sectionTop) {
          currentSection = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active-nav");
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active-nav");
        }
      });
    });
  }
});


// ABOUT JS FOR THE FIGURE ANIMATION
document.addEventListener("DOMContentLoaded", () => {
  const animateCounters = () => {
    // Select all <h2> elements inside the about-statistics container
    const stats = document.querySelectorAll(".about-statistics .stat h2");

    stats.forEach((stat) => {
      // Retain special characters like '+' (e.g., '2+' or '25+')
      const text = stat.textContent.trim();
      const targetNumber = parseInt(text.replace(/\D/g, ""), 10);
      const suffix = text.replace(/[0-9]/g, ""); // Stores '+' or extra text

      if (isNaN(targetNumber)) return;

      let currentNumber = 0;
      const duration = 1500; // Animation duration in milliseconds
      const incrementTime = 30; // Step speed in milliseconds
      const totalSteps = duration / incrementTime;
      const stepValue = Math.ceil(targetNumber / totalSteps) || 1;

      const timer = setInterval(() => {
        currentNumber += stepValue;
        if (currentNumber >= targetNumber) {
          currentNumber = targetNumber;
          clearInterval(timer);
        }

        // Render number along with its preserved target suffix markup
        if (suffix.includes("+")) {
          stat.innerHTML = `${currentNumber}<span>+</span>`;
        } else {
          stat.textContent = `${currentNumber}${suffix}`;
        }
      }, incrementTime);
    });
  };

  // Trigger count-up animation when statistics scroll into view
  const statsContainer = document.querySelector(".about-statistics");
  if (statsContainer && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target); // Run count-up once
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(statsContainer);
  } else if (statsContainer) {
    animateCounters();
  }
});


// SKILLS JS FOR PROGRESS BARS ANIMATION
document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     1. DYNAMIC SKILL BARS ANIMATION
     ========================================================= */
  // Define skill values matching your HTML elements
  const skillLevels = {
    "fill-html": 95,
    "fill-javascript": 80,
    "fill-tailwind": 85,
    "fill-bootstrap": 75,
    "fill-css": 90,
    "fill-react": 78,
    "fill-php": 70,
    "fill-sql": 82,
  };

  const animateSkills = () => {
    Object.entries(skillLevels).forEach(([id, percentage]) => {
      const el = document.getElementById(id);
      if (el) {
        el.style.width = `${percentage}%`;
      }
    });
  };

  // Trigger animation when skills section enters viewport
  const skillsSection = document.getElementById("skills-section");
  if (skillsSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(skillsSection);
  } else {
    animateSkills();
  }

  /* =========================================================
     4. CONTACT FORM PREVENT DEFAULT REFRESH
     ========================================================= */
  const contactForm = document.querySelector(".contact-message");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your message has been submitted successfully.");
      contactForm.reset();
    });
  }
});

 /* =========================================================
     3. NAVIGATION SCROLLSPY (ACTIVE LINK HIGHLIGHTING)
     ========================================================= */
  const navLinks = document.querySelectorAll("header nav a");
  const sections = document.querySelectorAll("section[id]");
  const container = document.querySelector(".portifolio-details");

  if (container && sections.length > 0) {
    container.addEventListener("scroll", () => {
      let currentSection = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (container.scrollTop >= sectionTop) {
          currentSection = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active-nav");
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active-nav");
        }
      });
    });
  }

// FORM HANDLING FOR CONTACT FORM
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  const submitBtn = document.getElementById("submitBtn");

  // Your Google Apps Script Web App Endpoint
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyDuZPKzoJ3OjmFF1P7KzRHx7LJwrq5N0fTyuGzHaBC290LvlVrjR9E1VWn4Bkeki4wOA/exec";

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Extract form values safely
      const formData = {
        name: document.getElementById("senderName") ? document.getElementById("senderName").value : "",
        email: document.getElementById("senderEmail") ? document.getElementById("senderEmail").value : "",
        phone: document.getElementById("senderPhone") ? document.getElementById("senderPhone").value : "",
        subject: document.getElementById("senderSubject") ? document.getElementById("senderSubject").value : "",
        message: document.getElementById("senderMessage") ? document.getElementById("senderMessage").value : ""
      };

      // Send payload to Google Sheet endpoint
      fetch(SCRIPT_URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          alert("Thank you! Your message has been sent successfully.");
          form.reset();
        } else {
          alert("Submission failed. Please try again.");
        }
      })
      .catch(error => {
        console.error("Submission Error:", error);
        alert("An error occurred. Please check your connection.");
      })
      .finally(() => {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      });
    });
  }
});