function initCarousel() {
  const carousel = document.querySelector(".carousel__inner");
  const width = carousel.offsetWidth;
  const leftArrow = document.querySelector(".carousel__arrow_left");
  const rightArrow = document.querySelector(".carousel__arrow_right");
  let slide = 1;

  leftArrow.style.display = 'none';

  rightArrow.onclick = function() {
    carousel.style.transform = `translateX(-${slide * width}px)`;
    slide++;

    leftArrow.style.display = '';

    if (slide === 4) {
      rightArrow.style.display = 'none';
    }

  };

  leftArrow.onclick = function() {
    slide--;
    carousel.style.transform = `translateX(${width - width * slide}px)`;

    rightArrow.style.display = '';

    if (slide === 1) {
      leftArrow.style.display = 'none';
    }
  };
}