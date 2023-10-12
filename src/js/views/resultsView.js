import icons from 'url:../../img/icons.svg';
import { view } from './view';

const resultView = function () {
  view.call(this);
  this._parentEle = document.querySelector('.results');
};
resultView.prototype = Object.create(view.prototype); // inheritance

resultView.prototype.generateMarkup = function () {
  const currentHashID = window.location.hash.slice(1);

  const markup = this.data
    .map(ele => {
      return `
    <li class="preview ${
      currentHashID === ele.id ? 'preview__link--active' : ''
    }">
        <a class="preview__link" href="#${ele.id}">
            <figure class="preview__fig">
                <img src="${ele.imageUrl}" alt="${ele.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${ele.title}</h4>
                <p class="preview__publisher">${ele.publisher}</p>
              <div class="preview__user-generated ${ele.key ? '' : 'hidden'}">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
        </a>
    </li>
`;
    })
    .join('');
  return markup;
};
// <div class="preview__user-generated">
// <svg>
//     <use href="${icons}#icon-user"></use>
// </svg>
// </div>
export default new resultView();
