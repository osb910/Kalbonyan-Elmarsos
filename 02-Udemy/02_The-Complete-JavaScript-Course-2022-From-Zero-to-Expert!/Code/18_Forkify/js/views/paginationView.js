import View from './View.js';

class PaginationView extends View {
  _parent = document.querySelector('.pagination');

  addClickHandler(handler) {
    this._parent.addEventListener('click', evt => {
      const btn = evt.target.closest('.btn--inline');
      if (!btn) return;
      const goTo = +btn.dataset.goto;
      handler(goTo);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    let prevBtn = false;
    let nextBtn = false;

    // Page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      prevBtn = false;
      nextBtn = true;
      // return 'page 1, others';
    }

    // Page 1, no other pages
    else if (curPage === 1 && numPages <= 1) {
      prevBtn = false;
      nextBtn = false;
      // return 'page 1, no others';
    }
    // Last page
    else if (curPage === numPages && numPages > 1) {
      prevBtn = true;
      nextBtn = false;
      // return 'last page';
    }

    // Other page
    else if (curPage < numPages) {
      prevBtn = true;
      nextBtn = true;
      // return 'other page';
    }

    const prevBtnHtml = `
      <button data-goto='${
        curPage - 1
      }' class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="../../img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `;

    const nextBtnHtml = `
      <button data-goto='${
        curPage + 1
      }' class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="../../img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button>
    `;

    return `
      ${prevBtn ? prevBtnHtml : ''}
      ${nextBtn ? nextBtnHtml : ''}
    `;
  }
}

export default new PaginationView();
