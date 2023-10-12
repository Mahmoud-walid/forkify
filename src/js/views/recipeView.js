import { view } from './view';

import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
console.log(Fraction);

const recipeView = function () {
  view.call(this);
  this._parentEle = document.querySelector('.recipe');
};
recipeView.prototype = Object.create(view.prototype); // inheritance

recipeView.prototype.addHandelerRender = function (handler) {
  ['hashchange', 'load'].forEach(event =>
    window.addEventListener(event, handler)
  );
};

recipeView.prototype.addHandlerUpdateServings = function (handler) {
  // console.log(dataset.serv);
  this._parentEle.addEventListener('click', event => {
    const btn = event.target.closest('.btn--tiny');
    if (!btn) return;
    const updateServingsBtn = +btn.dataset.updateservings;
    if (updateServingsBtn > 0) handler(updateServingsBtn);
  });
};

recipeView.prototype.addHandlerAddBookMark = function (handler) {
  this._parentEle.addEventListener('click', event => {
    const btn = event.target.closest('.btn--bookmark');
    if (!btn) return;
    console.log(btn);
    handler();
  });
};

recipeView.prototype.generateMarkup = function () {
  console.log(this.data);
  let recipe = this.data;
  return `
    <figure class="recipe__fig">
    <img src="${recipe.imageUrl}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--decrease-servings" data-updateServings="${
          recipe.servings - 1
        }">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings" data-updateServings="${
          recipe.servings + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="preview__user-generated ${recipe.key ? '' : 'hidden'}">
      <svg>
          <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    
    
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
    this.data.bookMarked ? '-fill' : ''
  }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

      ${recipe.ingredients
        .map(ele => {
          return `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              ele.quantity ? new Fraction(ele.quantity).toString() : ''
            }</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ele.unit}</span>
              ${ele.description}
            </div>
          </li>
        `;
        })
        .join('')}

    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
`;
};
// <svg>
//   <use href="${icons}#icon-user"></use>
// </svg>
export default new recipeView();
