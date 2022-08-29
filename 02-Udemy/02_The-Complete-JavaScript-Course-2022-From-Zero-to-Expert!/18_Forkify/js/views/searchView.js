import View from './View.js';

class SearchView extends View {
  _parent = document.querySelector('.search');

  _clearInput() {
    setTimeout(
      () => (this._parent.querySelector('.search__field').value = ''),
      500
    );
  }

  getQuery() {
    return this._parent.querySelector('.search__field').value;
  }

  addSearchHandler(handler) {
    this._parent.addEventListener('submit', handler);
  }
}

export default new SearchView();
