import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner">
      ${this.slides.map(slide => `
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `).join('')}
      </div>
    </div>
  `);

    this.#render();
  }

  #render() {
    const carousel = this.elem.querySelector('.carousel__inner');
    
    const leftArrow = this.elem.querySelector(".carousel__arrow_left");
    const rightArrow = this.elem.querySelector(".carousel__arrow_right");
    let count = 1;

    leftArrow.style.display = 'none';

    rightArrow.onclick = () => {
      const width = carousel.offsetWidth;
      carousel.style.transform = `translateX(-${count * width}px)`;
      count++;

      leftArrow.style.display = '';

      if (count === this.slides.length) {
        rightArrow.style.display = 'none';
      }

    };

    leftArrow.onclick = () => {
      const width = carousel.offsetWidth;
      count--;
      carousel.style.transform = `translateX(${width - width * count}px)`;

      rightArrow.style.display = '';

      if (count === 1) {
        leftArrow.style.display = 'none';
      }
    };

    const buttons = this.elem.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const event = new CustomEvent("product-add", {
          detail: button.closest('.carousel__slide').dataset.id,
          bubbles: true
        });

        button.dispatchEvent(event);
      });
    });
  }
}
