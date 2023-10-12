import { view } from './view';
import icons from 'url:../../img/icons.svg';

const addMyRecipeView = function () {
  view.call(this);
  this._parentEle = document.querySelector('.upload');
  this.windowAddRecipe = document.querySelector('.add-recipe-window');
  this.overlay = document.querySelector('.overlay');
  this.btnOpen = document.querySelector('.nav__btn--add-recipe');
  this.btnClose = document.querySelector('.btn--close-modal');
};
addMyRecipeView.prototype = Object.create(view.prototype);

addMyRecipeView.prototype.toggleWindow = function () {
  this.windowAddRecipe.classList.toggle('hidden');
  this.overlay.classList.toggle('hidden');
};

addMyRecipeView.prototype.addHandlerShowWindow = function () {
  this.btnOpen.addEventListener('click', () => this.toggleWindow());
};

addMyRecipeView.prototype.addHandlerCloseWindow = function () {
  this.btnClose.addEventListener('click', () => this.toggleWindow());
  this.overlay.addEventListener('click', () => this.toggleWindow());
};

addMyRecipeView.prototype.addHandlerUpload = function (handler) {
  this._parentEle.addEventListener('submit', event => {
    event.preventDefault();
    const dataArray = [...new FormData(this._parentEle)];
    // ` Object.fromEntries ` convert the array to object
    const data = Object.fromEntries(dataArray);
    handler(data);
  });
};

addMyRecipeView.prototype.generateMarkup = function () {};

export default new addMyRecipeView();
