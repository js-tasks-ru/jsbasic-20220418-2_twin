import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #elem = null;

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.#render();
    this.#setStep(value);
    this.#addEventsListeners();
  }

  get elem() {
    return this.#elem;
  }
  
  #ratio(x, clientX, width) {
    return (clientX - x) / width;
  }
  
  #slideValue(ratio) {
    return Math.round((this.steps - 1) * ratio);
  }
  
  #dispatchSliderChange() {
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }
  
  #setStep(value) {
    const thumb = this.elem.querySelector('.slider__thumb');
    let steps = this.elem.querySelector('.slider__steps').children;
    let process = value * 100 / (this.steps - 1);
    
    Array.from(steps).forEach(step => { 
      step.classList.remove('slider__step-active'); 
    });

    this.value = value;
    steps[value].classList.add('slider__step-active');
    this.elem.querySelector('.slider__value').innerHTML = value;
    thumb.style.left = `${value * 100 / (this.steps - 1)}%`;
    this.elem.querySelector('.slider__progress').style.width = `${process}%`;
  }

  #addEventsListeners() {
    this.elem.addEventListener('pointerdown', () => {
      const { x, width } = this.elem.getBoundingClientRect();
      const thumb = this.elem.querySelector('.slider__thumb');
      const processELem = this.elem.querySelector('.slider__progress');
      
      const onMove = ({ pageX }) => {
        this.elem.classList.add('slider_dragging');
        const process = 100 * this.#ratio(x, pageX, width);

        if (pageX <= x) {
          thumb.style.left = `0%`;
        } else if (pageX >= x + width) {
          thumb.style.left = `100%`;
        } else {
          thumb.style.left = `${process}%`;
          processELem.style.width = `${process}%`;
        }
      };

      document.addEventListener('pointermove', onMove);
      
      document.addEventListener('pointerup', (event) => {
        this.elem.classList.remove('slider_dragging');
        const value = this.#slideValue(this.#ratio(x, event.clientX, width));
        this.#setStep(value);
        this.#dispatchSliderChange();
        document.removeEventListener('pointermove', onMove);
      }, { once: true });
    });
    
    this.elem.addEventListener('click', ({ clientX }) => {
      const { x, width } = this.elem.getBoundingClientRect();
      const value = this.#slideValue(this.#ratio(x, clientX, width));
      if (value != this.value) {
        this.#setStep(value);
        this.#dispatchSliderChange();
      }
    });
  }
  
  #render() {
    this.#elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
  
        <div class="slider__progress"></div>
  
        <div class="slider__steps">
        </div>
      </div>
    `);
  
    for (let i = 0; i < this.steps; i++) {
      this.#elem.querySelector('.slider__steps').append(createElement('<span></span>'));
    }
  }
}