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