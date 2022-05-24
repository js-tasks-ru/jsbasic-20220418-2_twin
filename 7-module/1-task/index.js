import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #elem = null;

  #templateMenu = `
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
        
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
  `
  constructor(categories) {
    this.categories = categories;

    this.#render();
    this.#addEventListeners();
  }

  get elem() {
    return this.#elem;
  }

  #hideArrows() {
    const ribbonInner = document.querySelector('.ribbon__inner');
    let scrollWidth = ribbonInner.scrollWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft === 0) {
      document.querySelector('.ribbon__arrow_left').classList.toggle('ribbon__arrow_visible');
    }

    if (scrollRight < 1) {
      document.querySelector('.ribbon__arrow_right').classList.toggle('ribbon__arrow_visible');
    }
  }

  #addEventListeners() {
    this.#elem.onclick = ({ target }) => {
      const link = target.closest('.ribbon__item');
      if (link) {
        this.#elem.dispatchEvent(new CustomEvent(
          'ribbon-select', {
            detail: target.closest('[data-id]').dataset.id,
            bubbles: true
          }
        ));
        return;
      }

      if (target.closest('.ribbon__arrow_left')) {
        this.#hideArrows();
        document.querySelector('.ribbon__inner').scrollBy(-350, 0);
      }

      if (target.closest('.ribbon__arrow_right')) {
        document.querySelector('.ribbon__inner').scrollBy(350, 0);
        this.#hideArrows();
      }
    };
  }

  #render() {
    this.#elem = createElement(this.#templateMenu);
    this.#elem.querySelector('.ribbon__arrow_left').classList.toggle('ribbon__arrow_visible');
    const categoryElements = this.categories.map(({ id, name }) => {
      return createElement(`
        <a href="#" class="ribbon__item" data-id="${id}">${name}</a>
      `);
    });

    this.#elem.querySelector(".ribbon__inner").append(...categoryElements);
  }
}
