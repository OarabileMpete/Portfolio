// VIDEO HANDLING
const video = document.querySelector('.editing-bg');

if (video) {
  // Optional: Set playback speed
  video.addEventListener("loadedmetadata", () => {
    video.playbackRate = 3;
  });

  // When video ends
  video.addEventListener("ended", () => {
    // Fade out
    video.style.opacity = 0;

    // Wait for fade-out to finish, then remove the video
    setTimeout(() => {
      video.remove(); // Completely removes the video from DOM
    }, 2000); // Match the fade-out duration (2 seconds)
  });
}

// THEME TOGGLE
const body = document.body;
const toggleBtn = document.querySelector('.theme-toggle-btn');

// Check saved theme on page load and apply
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  toggleBtn.classList.add('dark-mode-on');
  toggleBtn.textContent = 'Light Mode';
} else {
  body.classList.remove('dark-theme');
  toggleBtn.classList.remove('dark-mode-on');
  toggleBtn.textContent = 'Dark Mode';
}

// Toggle button event listener
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  toggleBtn.classList.toggle('dark-mode-on');

  if (body.classList.contains('dark-theme')) {
    toggleBtn.textContent = 'Light Mode';
    localStorage.setItem('theme', 'dark');
  } else {
    toggleBtn.textContent = 'Dark Mode';
    localStorage.setItem('theme', 'light');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const tiltElement = document.querySelector('.tilt-paragraph');

  tiltElement.addEventListener('mousemove', (e) => {
    const rect = tiltElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 3;
    const centerY = rect.height / 3;

    const rotateX = ((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * -12;

    tiltElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltElement.addEventListener('mouseleave', () => {
    tiltElement.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('video.editing-bg');
  if (!video) return;

  // Pause the video right after it starts autoplaying on load
  video.pause();

  // Get the Skills button (assuming it has a class or id)
  const skillsButton = document.querySelector('.contact-link[href="skills.html"], #skillsButton');

  if (skillsButton) {
    skillsButton.addEventListener('click', (event) => {
      event.preventDefault(); // prevent default navigation if needed

      video.play();

      // Optionally navigate after starting video (if you want)
      // window.location.href = skillsButton.href;
    });
  }
});

// Make drawings clickable and fullscreen on click
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.skills-gallery img').forEach(img => {
    img.style.cursor = 'pointer'; // show pointer on hover

    img.addEventListener('click', () => {
      if (img.requestFullscreen) {
        img.requestFullscreen();
      } else if (img.webkitRequestFullscreen) { /* Safari */
        img.webkitRequestFullscreen();
      } else if (img.msRequestFullscreen) { /* IE11 */
        img.msRequestFullscreen();
      }
    });
  });
});
