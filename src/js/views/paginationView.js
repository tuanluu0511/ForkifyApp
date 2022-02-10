import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    //Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupBtnNext(curPage);
    }

    //Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBtnPre(curPage);
    }

    //Other page
    if (curPage < numPages) {
      return (
        this._generateMarkupBtnPre(curPage) +
        this._generateMarkupBtnNext(curPage)
      );
    }
    //Page 1, and there are NO other pages
    return '';
  }
  _generateMarkupBtnPre(curPage) {
    return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>
            </button>
      `;
  }
  _generateMarkupBtnNext(curPage) {
    return `
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
          </svg>
          </button>
          `;
  }
}

export default new PaginationView();
