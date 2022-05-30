import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.slides = slides;
    this.categories = categories;
  }

  async render() {
    this.renderCarousel();
    this.renderRibbon();
    this.renderStepSlider();
    this.renderCartIcon();
    
    this.products = await fetch("products.json").then(response => response.json());
    await this.renderProductsGrid(this.products);
    
    this.cart = new Cart(this.cartIcon);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      categoryId: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', ({ detail: productId }) => {
      let cartItem = this.products.find(item => item.id == productId);
      this.cart.addProduct(cartItem);
    });

    this.stepSlider.elem.addEventListener('slider-change', ({ detail: value }) => {
      this.productsGrid.updateFilter({
        maxSpiciness: value
      });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', ({ detail: categoryId }) => {
      this.productsGrid.updateFilter({
        category: categoryId
      });
    });

    document.getElementById("nuts-checkbox").onchange = event => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    };

    document.getElementById("vegeterian-checkbox").onchange = event => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    };
  }

  renderCartIcon() {
    this.cartIcon = new CartIcon();
    document.querySelector("[data-cart-icon-holder]").append(this.cartIcon.elem);
  }

  renderCarousel() {
    this.carousel = new Carousel(this.slides);
    document.querySelector("[data-carousel-holder]").append(this.carousel.elem);
  }

  renderRibbon() {
    this.ribbonMenu = new RibbonMenu(this.categories);
    document.querySelector("[data-ribbon-holder]").append(this.ribbonMenu.elem);
  }

  renderStepSlider() {
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    document.querySelector("[data-slider-holder]").append(this.stepSlider.elem);
  }

  renderProductsGrid(products) {
    this.productsGrid = new ProductsGrid(products);

    document.querySelector("[data-products-grid-holder]").innerHTML = "";
    document.querySelector("[data-products-grid-holder]").append(this.productsGrid.elem);
  }
}
