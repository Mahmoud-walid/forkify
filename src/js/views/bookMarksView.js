import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import { view } from './view';

const bookMarksView = function () {
  view.call(this);
  this._parentEle = document.querySelector('.bookmarks__list');
};
bookMarksView.prototype = Object.create(view.prototype); // inheritance

bookMarksView.prototype.addHandlerRender = function (handler) {
  window.addEventListener('load', handler);
};

bookMarksView.prototype.generateMarkup = function () {
  // console.log(this.data);
  return this.data.map(recipe => previewView.render(recipe, false)).join('');
};
// <div class="preview__user-generated">
// <svg>
//     <use href="${icons}#icon-user"></use>
// </svg>
// </div>
export default new bookMarksView();
