document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll('.project-gallery video');

  videos.forEach(video => {
    video.addEventListener('play', () => {
      videos.forEach(otherVideo => {
        if (otherVideo !== video) {
          otherVideo.pause();
        }
      });
    });
  });
});
