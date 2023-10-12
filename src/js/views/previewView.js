import icons from 'url:../../img/icons.svg';
import { view } from './view';

const previewView = function () {
  view.call(this);
  this._parentEle = '';
};
previewView.prototype = Object.create(view.prototype); // inheritance

previewView.prototype.generateMarkup = function () {
  const currentHashID = window.location.hash.slice(1);

  const markup = `
    <li class="preview ${
      currentHashID === this.data.id ? 'preview__link--active' : ''
    }">
        <a class="preview__link" href="#${this.data.id}">
            <figure class="preview__fig">
                <img src="${this.data.imageUrl}" alt="${this.data.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${this.data.title}</h4>
                <p class="preview__publisher">${this.data.publisher}</p>
              <div class="preview__user-generated ${
                this.data.key ? '' : 'hidden'
              }">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
      </li>
`;
  return markup;
};
// <div class="preview__user-generated">
// <svg>
//     <use href="${icons}#icon-user"></use>
// </svg>
// </div>
export default new previewView();
