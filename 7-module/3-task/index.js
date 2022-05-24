export default class StepSlider {
  #elem = null;

  #templateElem = `
    <div class="slider">
    
      <div class="slider__thumb">
        <span class="slider__value"></span>
      </div>
    
      <div class="slider__progress"></div>
    
      <div class="slider__steps"></div>
    </div>
  `

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.#render();
    this.#addEventListeners();
  }

  get elem() {
    return this.#elem;
  }

  #addEventListeners() {
    let spans = this.#elem.querySelectorAll('span');
    let thumb = this.#elem.querySelector('.slider__thumb');
    let progress = this.#elem.querySelector('.slider__progress');

    this.#elem.querySelector('.slider').addEventListener('click', (event) => {
      let left = event.clientX - this.#elem.getBoundingClientRect().left;
      let leftRelative = left / this.#elem.offsetWidth;
      let segments = this.steps - 1;
      let value = Math.round(leftRelative * 10);
      let valuePercents = value / segments * 100;

      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;

      this.value = value;
      this.#elem.querySelector('.slider__value').innerHTML = this.value;

      spans.forEach(span => span.classList.remove('slider__step-active'));
      spans[value + 1].classList.add('slider__step-active');
    });

    this.#elem.onclick = () => {
      this.#elem.querySelector('.slider').dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value + 1,
        bubbles: true
      }));
    };
  }

  #render() {
    const div = document.createElement('div');
    div.innerHTML = this.#templateElem;
    this.#elem = div;
    this.#elem.querySelector('.slider__value').innerHTML = this.value;

    for (let i = 0; i < this.steps; i++) {
      const span = document.createElement('span');
      this.#elem.querySelector('.slider__steps').append(span);
    }
    
    let step1 = this.#elem.querySelector('.slider__steps span');
    step1.classList.add('slider__step-active');

    this.#elem.querySelector('.slider__progress').style.width = '50%';
    this.#elem.querySelector('.slider__thumb').style.left = '50%';
  }
}
