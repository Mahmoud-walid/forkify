import { view } from './view';
import icons from 'url:../../img/icons.svg';

const paginationView = function () {
  view.call(this);
  this._parentEle = document.querySelector('.pagination');
};
paginationView.prototype = Object.create(view.prototype);

paginationView.prototype.addHandlerPagination = function (handler) {
  this._parentEle.addEventListener('click', event => {
    const btn = event.target.closest('.btn--inline');
    if (!btn) return;
    const gotoPage = +btn.dataset.goto;
    handler(gotoPage);
  });
};

paginationView.prototype.generateMarkup = function () {
  const numePages = Math.ceil(this.data.results.length / this.data.perPage);
  console.log(numePages);
  const currentPage = this.data.page;

  // page 1 - other pages
  if (currentPage === 1 && numePages > 1) {
    return `
    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;
  }

  // last page
  if (currentPage === numePages && numePages > 1) {
    return `
    <button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>
    `;
  }

  // other page
  if (currentPage < numePages) {
    return `
    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    
    <button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>
    `;
  }

  // page 1 - NO other pages
  return '';
};
// const markup = `
//   <button class="btn--inline pagination__btn--prev">
//       <svg class="search__icon">
//           <use href="src/img/icons.svg#icon-arrow-left"></use>
//       </svg>
//       <span>Page 1</span>
//   </button>

//   <button class="btn--inline pagination__btn--next">
//       <span>Page 3</span>
//       <svg class="search__icon">
//           <use href="src/img/icons.svg#icon-arrow-right"></use>
//       </svg>
//   </button>
//      `;
// return markup;

export default new paginationView();
