// THEME HANDLING - apply saved theme on all pages
const body = document.body;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
} else {
  body.classList.remove('dark-theme');
}

// THEME TOGGLE (only if toggle button exists)
const toggleBtn = document.querySelector('.theme-toggle-btn');

if (toggleBtn) {
  if (body.classList.contains('dark-theme')) {
    toggleBtn.classList.add('dark-mode-on');
    toggleBtn.textContent = 'Light Mode';
  } else {
    toggleBtn.classList.remove('dark-mode-on');
    toggleBtn.textContent = 'Dark Mode';
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-theme');
    toggleBtn.classList.toggle('dark-mode-on');
    toggleBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// TILT EFFECT ON PARAGRAPH
document.addEventListener('DOMContentLoaded', () => {
  const tiltElement = document.querySelector('.tilt-paragraph');

  if (tiltElement) {
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
  }
});

// FULLSCREEN IMAGE GALLERY WITH NAVIGATION
document.addEventListener('DOMContentLoaded', () => {
  const images = Array.from(document.querySelectorAll('.skills-gallery img'));
  const overlay = document.getElementById('fullscreen-overlay');
  const fullscreenImage = document.getElementById('fullscreen-image');
  const closeBtn = document.getElementById('close-fullscreen');
  const prevBtn = document.getElementById('prev-image');
  const nextBtn = document.getElementById('next-image');

  let currentIndex = 0;

  function openFullscreen(index) {
    currentIndex = index;
    fullscreenImage.src = images[currentIndex].src;
    overlay.style.display = 'flex';

    if (overlay.requestFullscreen) {
      overlay.requestFullscreen();
    } else if (overlay.webkitRequestFullscreen) {
      overlay.webkitRequestFullscreen();
    } else if (overlay.msRequestFullscreen) {
      overlay.msRequestFullscreen();
    }
  }

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    overlay.style.display = 'none';
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    fullscreenImage.src = images[currentIndex].src;
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    fullscreenImage.src = images[currentIndex].src;
  }

  images.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      openFullscreen(index);
    });
  });

  closeBtn.addEventListener('click', closeFullscreen);
  nextBtn.addEventListener('click', showNextImage);
  prevBtn.addEventListener('click', showPrevImage);

  document.addEventListener('keydown', (e) => {
    if (overlay.style.display === 'flex') {
      if (e.key === 'Escape') closeFullscreen();
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'ArrowLeft') showPrevImage();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      overlay.style.display = 'none';
    }
  });
});
