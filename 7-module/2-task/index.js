import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  // #modal = null;
  #modalTemplate = `
    <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
            
          </h3>
        </div>

        <div class="modal__body">
          
        </div>
      </div>

    </div>
  `

  constructor() {
    this.#render();
    this.open();
  }

  #render() {
    this.elem = createElement(this.#modalTemplate);
    const modal = document.body.querySelector('.modal');
    const button = this.elem.querySelector('.modal__close');
    button.addEventListener('click', this.close);

    const listener = (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    };

    document.addEventListener('keydown', listener);

    if (modal) {
      document.removeEventListener('keydown', listener);
    }
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  setTitle(title) {
    document.querySelector('.modal__title').textContent = title;
  }

  setBody(body) {
    document.querySelector('.modal__body').append(body);
  }

  close() {
    const modal = document.body.querySelector('.modal');
    if (modal) {
      document.body.removeChild(modal);
      document.body.classList.remove('is-modal-open');
    }
  }
}
