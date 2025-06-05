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