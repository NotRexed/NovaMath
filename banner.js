document.addEventListener('DOMContentLoaded', () => {
  const slidesWrapper = document.getElementById("slidesWrapper");
  const slides = document.querySelectorAll(".bannerslide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".previous");
  const nextBtn = document.querySelector(".nextslide");
  let slideIndex = 0;
  let isTransitioning = false;
  let slideInterval;

  function showSlide(index) {
    slidesWrapper.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach((slide, i) => {
      const text = slide.querySelector(".slide-text");
      if (!text) return;
      text.classList.remove("fade-in", "fade-out");

      if (i === index) {
        void text.offsetWidth; // reflow to restart animation
        text.classList.add("fade-in");
      } else {
        text.style.opacity = 0;
      }
    });

    updateDots();
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

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === slideIndex);
    });
  }

  function autoSlide() {
    changeSlide(1);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlide, 7000);
  }

  // Init
  showSlide(slideIndex);
  slideInterval = setInterval(autoSlide, 7000);

  // Attach buttons
  prevBtn?.addEventListener("click", () => changeSlide(-1));
  nextBtn?.addEventListener("click", () => changeSlide(1));

  // Attach dots dynamically in case slide count changes
  dots.forEach((dot, i) => dot.addEventListener("click", () => goToSlide(i)));

  // Pause on hover
  const slideshowContainer = document.querySelector(".slideshow-container");
  slideshowContainer?.addEventListener("mouseenter", () => clearInterval(slideInterval));
  slideshowContainer?.addEventListener("mouseleave", () => slideInterval = setInterval(autoSlide, 7000));
});
