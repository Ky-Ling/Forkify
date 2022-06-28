import icons from 'url:../../img/icons.svg'; // Parcel 2
import View from './view.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function(e) {
        const btn = e.target.closest(".btn--inline");

        if (!btn) return;
        const goToPage = +btn.dataset.goto;
        // console.log(goToPage);
        handler(goToPage);
    })
  }
  
  _generateMarkUp() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
        return `
        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
    }

    // Last page
    if (this._data.page === numPages && numPages > 1) {
      return `
        <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>    
        `;
    }

    // Other page

    if (this._data.page < numPages) {
        return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>    

            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
    }

    // Page 1, and there are no other pages
    return '';
  }

}

export default new PaginationView();
