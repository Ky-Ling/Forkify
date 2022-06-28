import icons from 'url:../../img/icons.svg'; // Parcel 2


export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data the data to be rendered(e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM 
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Ky-Ling
   * @todo Finish the implementation
   */

  
  render(data, render=true) {
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkUp();

    if(!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {

    // We will create new markup but won't render it, when we generate the new markup, we will compare the 
    //  new HTML to the current HTML, and only change text and attributes that have actually changed from 
    //  the old version to new version.
    this._data = data;
    const newMarkup = this._generateMarkUp();

    // Convert this markup string to a DOM object leaving it in the memory, and we can compare it with
    //  the actual DOM in the page.
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    // console.log(curElements);
    // console.log(newElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Update changed text
      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "") {
        curEl.textContent = newEl.textContent;
      }

      // Update changed attributes
      if(!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
      }
    })
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
        </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message=this._errMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderMessage(message=this._message) {
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

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
}