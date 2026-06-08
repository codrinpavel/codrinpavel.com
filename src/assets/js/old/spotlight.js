document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('spotlight-track');

  let started = false;
  let isAnimating = false;

  const toggleButton = document.createElement('button');
  toggleButton.className = 'spotlight-toggle';
  toggleButton.type = 'button';
  toggleButton.textContent = 'Play';
  track.parentElement.append(toggleButton);

  function getCurrentFigure() {
    return track.querySelector('figure:first-child');
  }

  function getCurrentVideo() {
    return getCurrentFigure().querySelector('video');
  }

  function getCurrentProgress() {
    return getCurrentFigure().querySelector('.spotlight-progress');
  }

  function updateToggleButton() {
    toggleButton.textContent = getCurrentVideo().paused ? 'Play' : 'Pause';
  }

  function resetProgress(progress) {
    progress.style.animation = 'none';
    progress.style.animationPlayState = 'running';
    void progress.offsetWidth;
    progress.style.animation = '';
  }

  function startProgress(video) {
    const progress = video.closest('figure').querySelector('.spotlight-progress');

    resetProgress(progress);

    const start = () => {
      progress.style.animation = `spotlight-progress ${video.duration}s linear forwards`;
      progress.style.animationPlayState = 'running';
    };

    if (Number.isFinite(video.duration) && video.duration > 0) {
      start();
    } else {
      video.addEventListener('loadedmetadata', start, { once: true });
    }
  }

  function pauseProgress(video) {
    const progress = video.closest('figure').querySelector('.spotlight-progress');
    progress.style.animationPlayState = 'paused';
  }

  function resumeProgress(video) {
    const progress = video.closest('figure').querySelector('.spotlight-progress');
    progress.style.animationPlayState = 'running';
  }

  function resetAllProgressBars() {
    track.querySelectorAll('.spotlight-progress').forEach(resetProgress);
  }

  function pauseAllVideos() {
    track.querySelectorAll('video').forEach(video => {
      video.pause();
      video.currentTime = 0;
    });

    resetAllProgressBars();
    updateToggleButton();
  }

  function playCurrentVideo() {
    const video = getCurrentVideo();
    video.play().then(updateToggleButton)
  }

  function goToNextVideo() {
    if (isAnimating) return;

    isAnimating = true;

    pauseAllVideos();

    track.style.transition = 'transform 600ms ease';
    track.style.transform = 'translateX(-100%)';

    const onTransitionEnd = () => {
      track.removeEventListener('transitionend', onTransitionEnd);

      track.appendChild(track.firstElementChild);

      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';

      void track.offsetWidth;

      isAnimating = false;

      playCurrentVideo();
    };

    track.addEventListener('transitionend', onTransitionEnd);
  }

  toggleButton.addEventListener('click', () => {
    const video = getCurrentVideo();

    if (video.paused) {
      video.play().then(updateToggleButton);
    } else {
      video.pause();
      updateToggleButton();
    }
  });

  track.querySelectorAll('video').forEach(video => {
    video.addEventListener('play', () => {
      const progress = video.closest('figure').querySelector('.spotlight-progress');

      const hasAnimation =
        progress.style.animation.includes('spotlight-progress');

      if (!hasAnimation || video.currentTime < 0.05) {
        startProgress(video);
      } else {
        resumeProgress(video);
      }

      updateToggleButton();
    });

    video.addEventListener('pause', () => {
      pauseProgress(video);
      updateToggleButton();
    });

    video.addEventListener('ended', () => {
      pauseProgress(video);
      goToNextVideo();
    });
  });

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        playCurrentVideo();
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(track);
});