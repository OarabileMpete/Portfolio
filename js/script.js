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

// FULLSCREEN IMAGE GALLERY WITH NAVIGATION (custom overlay - kept here if you want it)
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
    // Clicking opens custom fullscreen overlay
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

// NATIVE FULLSCREEN ON IMAGE CLICK + KEYBOARD NAVIGATION IN FULLSCREEN
document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = Array.from(document.querySelectorAll('.skills-gallery img'));
  let currentIndex = -1;

  // Create fallback container & elements for showing last viewed image after fullscreen exits
  const fallbackContainer = document.createElement('div');
  fallbackContainer.id = 'fullscreen-fallback';
  fallbackContainer.style.cssText = `
    display:none;
    position:fixed;
    top:0; left:0;
    width:100vw; height:100vh;
    background:#000;
    justify-content:center;
    align-items:center;
    z-index:10000;
  `;
  fallbackContainer.style.display = 'none';
  fallbackContainer.style.flexDirection = 'column';
  fallbackContainer.style.cursor = 'default';

  const fallbackImage = document.createElement('img');
  fallbackImage.id = 'fallback-image';
  fallbackImage.style.cssText = `
    max-width:90vw;
    max-height:90vh;
    margin-bottom: 20px;
    user-select:none;
    pointer-events:none;
  `;

  const fallbackCloseBtn = document.createElement('button');
  fallbackCloseBtn.id = 'fallback-close';
  fallbackCloseBtn.textContent = '×';
  fallbackCloseBtn.style.cssText = `
    font-size: 40px;
    color: #fff;
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
  `;

  fallbackContainer.appendChild(fallbackImage);
  fallbackContainer.appendChild(fallbackCloseBtn);
  document.body.appendChild(fallbackContainer);

  function showFallbackImage(src) {
    fallbackImage.src = src;
    fallbackContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function hideFallbackImage() {
    fallbackContainer.style.display = 'none';
    document.body.style.overflow = '';
  }

  fallbackCloseBtn.addEventListener('click', hideFallbackImage);

  galleryImages.forEach((img, index) => {
    img.style.cursor = 'pointer'; // pointer on hover

    img.addEventListener('click', () => {
      currentIndex = index;
      requestFullscreen(img);
      hideFallbackImage(); // hide fallback if open
    });
  });

  function requestFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { // Safari
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE11
      element.msRequestFullscreen();
    }
  }

  // Listen for keydown events to navigate images while any image is fullscreen
  document.addEventListener('keydown', (e) => {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    ) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % galleryImages.length;
        fadeAndChangeFullscreenImage(currentIndex);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        fadeAndChangeFullscreenImage(currentIndex);
      }
    }
  });

  function fadeAndChangeFullscreenImage(index) {
    const img = galleryImages[index];
    const fullscreenElem = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

    if (!fullscreenElem) {
      // If no fullscreen element, just update fallback image
      currentIndex = index;
      showFallbackImage(img.src);
      return;
    }

    // Fade out effect
    fullscreenElem.style.transition = 'opacity 0.3s';
    fullscreenElem.style.opacity = 0;

    function onTransitionEnd() {
      fullscreenElem.style.transition = '';
      fullscreenElem.style.opacity = 1;
      fullscreenElem.removeEventListener('transitionend', onTransitionEnd);

      // Exit fullscreen and then re-enter on new image
      function afterExit() {
        document.removeEventListener('fullscreenchange', afterExit);
        document.removeEventListener('webkitfullscreenchange', afterExit);
        document.removeEventListener('msfullscreenchange', afterExit);

        requestFullscreen(img);
        currentIndex = index;
      }

      if (document.exitFullscreen) {
        document.addEventListener('fullscreenchange', afterExit);
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.addEventListener('webkitfullscreenchange', afterExit);
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.addEventListener('msfullscreenchange', afterExit);
        document.msExitFullscreen();
      }
    }

    fullscreenElem.addEventListener('transitionend', onTransitionEnd);
  }

  // Show fallback image when exiting fullscreen (like after ESC)
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement) {
      if (currentIndex !== -1) {
        const img = galleryImages[currentIndex];
        showFallbackImage(img.src);
      }
    } else {
      hideFallbackImage();
    }
  });
});

const edu = document.querySelector('.education-section');

// Toggle fullscreen on click of edu
edu.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent event bubbling to document click
  edu.classList.toggle('fullscreen');
  document.body.classList.toggle('modal-active');
});

// Clicking anywhere else on the document closes fullscreen if open
document.addEventListener('click', () => {
  if (edu.classList.contains('fullscreen')) {
    edu.classList.remove('fullscreen');
    document.body.classList.remove('modal-active');
  }
});

// Optional: ESC key closes fullscreen
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    edu.classList.remove('fullscreen');
    document.body.classList.remove('modal-active');
  }
});

const paragraph = document.getElementById("fullscreen-paragraph");

paragraph.addEventListener("click", () => {
  const fullscreenPara = paragraph.cloneNode(true);
  fullscreenPara.classList.add("fullscreen");

  const closeBtn = document.createElement("div");
  closeBtn.classList.add("close-btn");
  closeBtn.textContent = "×";
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(fullscreenPara);
  });

  fullscreenPara.appendChild(closeBtn);
  document.body.appendChild(fullscreenPara);
});

// YOUTUBE IFRAME API HANDLING - pause other videos when one plays
let players = [];

function onYouTubeIframeAPIReady() {
  // Select all iframes inside video containers
  const iframes = document.querySelectorAll('.video-container iframe');

  players = Array.from(iframes).map(iframe => {
    return new YT.Player(iframe.id, {
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    players.forEach(player => {
      if (player !== event.target) {
        player.pauseVideo();
      }
    });
  }
}
