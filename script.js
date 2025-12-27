// ==========================
// SELECT REVEAL ELEMENTS
// ==========================
const reveals = document.querySelectorAll(".reveal");

// ==========================
// CONFETTI FUNCTION
// ==========================
function launchConfetti(element, extra = false) {
  const colors = ["#ff0055", "#0055ff", "#00ff99", "#ffeb3b", "#000"];
  const amount = extra ? 200 : 80; // More confetti if extra=true

  const rect = element.getBoundingClientRect();

  for (let i = 0; i < amount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti-piece");

    const size = Math.random() * 14 + 8;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];

    // Center confetti on element
    confetti.style.left = `${rect.left + rect.width / 2}px`;
    confetti.style.top = `${rect.top + rect.height / 2}px`;

    confetti.style.setProperty("--x", `${(Math.random() - 0.5) * 600}px`);
    confetti.style.setProperty("--y", `${Math.random() * -600 - 200}px`);

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1200);
  }
}

// ==========================
// INTERSECTION OBSERVER
// ==========================
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Confetti trigger
        if (entry.target.classList.contains("confetti-trigger")) {
          launchConfetti(entry.target);
          document.body.classList.add("flash");
          setTimeout(() => document.body.classList.remove("flash"), 600);
        }

        // Extra confetti for final birthday message
        if (entry.target.classList.contains("final-message")) {
          launchConfetti(entry.target, true);
        }

        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

// Start observing
reveals.forEach(el => observer.observe(el));

// ==========================
// CLICKABLE GOAT AUDIO
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const goatEls = document.querySelectorAll(".clickable-goat");
  const goatAudio = document.getElementById("goat-sound");

  goatEls.forEach(el => {
    el.addEventListener("click", () => {
      if (goatAudio) {
        goatAudio.currentTime = 0;
        goatAudio.play().catch(err => console.log("Goat audio blocked:", err));
      }
    });
  });
});

// ==========================
// CLICK IMAGE TO PLAY MUSIC (UPDATED)
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const musicTrigger = document.getElementById("music-trigger");
  const themeSong = document.getElementById("theme-song");
  const musicHint = document.querySelector(".music-hint");

  if (musicTrigger && themeSong) {
    musicTrigger.addEventListener("click", () => {

      // If paused, play music and HIDE text
      if (themeSong.paused) {
        themeSong.play().catch(err => console.log("Audio error:", err));

        // Hide the text
        if (musicHint) {
            musicHint.style.opacity = "0"; // Fades it out
            setTimeout(() => musicHint.style.display = "none", 300); // Removes it completely
        }

        // Optional: Confetti pop on start
        launchConfetti(musicTrigger);
      }
      // If playing, pause it (Text does NOT come back)
      else {
        themeSong.pause();
      }
    });
  }
});