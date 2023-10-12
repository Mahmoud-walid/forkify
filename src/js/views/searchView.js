const searchView = function () {
  this._parentEle = document.querySelector('.search');
};

searchView.prototype.getQuery = function () {
  return this._parentEle.querySelector('.search__field').value;
};

searchView.prototype.addHandlerSearch = function (handler) {
  window.addEventListener('DOMContentLoaded', () =>
    this._parentEle.querySelector('.search__field').focus()
  );
  this._parentEle.addEventListener('submit', event => {
    event.preventDefault();
    handler();
    this._parentEle.querySelector('.search__field').value = '';
  });
};

export default new searchView();
