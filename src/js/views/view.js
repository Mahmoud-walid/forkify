import icons from 'url:../../img/icons.svg';

export const view = function () {};

/**
 * 
 * @param {*} data 
 * @param {*} render 
 * @returns 
 */

view.prototype.render = function (data, render = true) {
  this.data = data;
  if (!data || (Array.isArray(data) && data.length === 0))
    throw new Error('Recipe not found. try again!');
  const markup = this.generateMarkup();
  if (!render) return markup;
  this._parentEle.innerHTML = ``;
  this._parentEle.insertAdjacentHTML('afterbegin', markup);
};

view.prototype.update = function (data) {
  this.data = data;
  const newMarkup = this.generateMarkup();

  const newDom = document.createRange().createContextualFragment(newMarkup);
  const newElements = Array.from(newDom.querySelectorAll('*'));
  const currentElement = Array.from(this._parentEle.querySelectorAll('*'));
  newElements.forEach((newEle, i) => {
    const curEle = currentElement[i];
    if (
      !newEle?.isEqualNode(curEle) &&
      newEle.firstChild?.nodeValue.trim() !== ''
    ) {
      // console.log('⭐', curEle, newEle.isEqualNode(curEle));
      curEle.textContent = newEle.textContent;
    }

    if (!newEle?.isEqualNode(curEle)) {
      // console.log(Array.from(newEle.attributes));
      Array.from(newEle.attributes).forEach(attr => {
        curEle.setAttribute(attr.name, attr.value);
      });
    }
  });
};

view.prototype.renderError = function (errorMessage) {
  const errorViewMSG =
    errorMessage.message.includes('400') &&
    !errorMessage.message.includes('characters long')
      ? 'We could not find that recipe, Please try again!'
      : errorMessage.message;
  const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errorViewMSG}</p>
      </div>
    `;
  this._parentEle.innerHTML = ``;
  this._parentEle.insertAdjacentHTML('afterbegin', markup);
  console.log(this._parentEle);
};

view.prototype.renderSpinner = function () {
  const markup = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
      `;
  this._parentEle.innerHTML = ``;
  this._parentEle.insertAdjacentHTML('afterbegin', markup);
};

view.prototype.renderMessage = function (message) {
  const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
  this._parentEle.innerHTML = ``;
  this._parentEle.insertAdjacentHTML('afterbegin', markup);
};
