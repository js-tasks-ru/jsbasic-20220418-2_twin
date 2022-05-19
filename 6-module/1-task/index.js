/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows = [];

  constructor(rows) {
    this.#rows = rows;
    this.elem = this.#render();
  }

  #onButtonClick() {
    const a = this.closest('tr');
    a.parentElement.removeChild(a);
    console.log(this);
  }

  #render() {
    const template = `
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${this.#rows.map(item => `
            <tr>
              <td>${item.name}</td>
              <td>${item.age}</td>
              <td>${item.salary}</td>
              <td>${item.city}</td>
              <td><button>X</button></td>
            </tr>
            `).join('')}
        </tbody>
      </table>
    `;

    const div = document.createElement('div');
    div.innerHTML = template;

    const buttons = div.querySelectorAll('button');

    buttons.forEach((e) => {
      e.addEventListener('click', this.#onButtonClick);
    });

    return div;
  }
}