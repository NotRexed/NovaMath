document.addEventListener('DOMContentLoaded', () => {
  const slidesWrapper = document.getElementById("slidesWrapper");
  const slides = document.querySelectorAll(".bannerslide");
  const dots = document.querySelectorAll(".dot");
  let slideIndex = 0;
  let isTransitioning = false;
  let slideInterval;

  function showSlide(index) {
    slidesWrapper.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach((slide, i) => {
      const text = slide.querySelector(".slide-text");
      if (text) {
        text.classList.remove("fade-in", "fade-out");
        if (i === index) {
          void text.offsetWidth; // reflow
          text.classList.add("fade-in");
        } else {
          text.style.opacity = 0;
        }
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function changeSlide(n) {
    if (isTransitioning) return;
    isTransitioning = true;

    const currentText = slides[slideIndex].querySelector(".slide-text");
    if (currentText) {
      currentText.classList.remove("fade-in");
      currentText.classList.add("fade-out");
    }

    setTimeout(() => {
      slideIndex = (slideIndex + n + slides.length) % slides.length;
      showSlide(slideIndex);
      isTransitioning = false;
    }, 500);

    resetInterval();
  }

  function goToSlide(n) {
    if (n === slideIndex || isTransitioning) return;
    isTransitioning = true;

    const currentText = slides[slideIndex].querySelector(".slide-text");
    if (currentText) {
      currentText.classList.remove("fade-in");
      currentText.classList.add("fade-out");
    }

    setTimeout(() => {
      slideIndex = n;
      showSlide(slideIndex);
      isTransitioning = false;
    }, 500);

    resetInterval();
  }

  function autoSlide() {
    changeSlide(1);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlide, 7000);
  }

  // Attach dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goToSlide(i));
  });

  // Init
  showSlide(slideIndex);
  slideInterval = setInterval(autoSlide, 7000);

  // Pause auto-slide on hover
  const slideshowContainer = document.querySelector(".slideshow-container");
  slideshowContainer.addEventListener("mouseenter", () => clearInterval(slideInterval));
  slideshowContainer.addEventListener("mouseleave", () => resetInterval());
});