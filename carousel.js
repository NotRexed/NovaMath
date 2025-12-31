const sliderContainers = document.querySelectorAll('.slider-container');

sliderContainers.forEach(container => {
  const slider = container.querySelector('.slider');
  const nextBtn = container.querySelector('.next');
  const prevBtn = container.querySelector('.prev');

  let isDown = false;
  let startX;
  let scrollLeft;
  let velocity = 0;
  let momentumID;

  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: 300, behavior: 'smooth' });
    setTimeout(updateArrows, 400);
  });

  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -300, behavior: 'smooth' });
    setTimeout(updateArrows, 400);
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
    velocity = walk - (scrollLeft - slider.scrollLeft);
  });

  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    cancelMomentumScroll();
  });

  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
    velocity = walk - (scrollLeft - slider.scrollLeft);
  });

  slider.addEventListener('scroll', () => {
    updateArrows();
  });

  function snapToClosest() {
    const slides = container.querySelectorAll('.slide');
    const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2;

    let closestSlide = null;
    let closestDistance = Infinity;

    slides.forEach(slide => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(sliderCenter - slideCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestSlide = slide;
      }
    });

    if (closestSlide) {
      const scrollTo = closestSlide.offsetLeft - (slider.offsetWidth / 2 - closestSlide.offsetWidth / 2);
      slider.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  }

  function updateArrows() {
    const scrollLeft = slider.scrollLeft;
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    if (scrollLeft <= 10) {
      prevBtn.classList.add('hidden');
    } else {
      prevBtn.classList.remove('hidden');
    }

    if (scrollLeft >= maxScrollLeft - 10) {
      nextBtn.classList.add('hidden');
    } else {
      nextBtn.classList.remove('hidden');
    }
  }

  updateArrows();
});
