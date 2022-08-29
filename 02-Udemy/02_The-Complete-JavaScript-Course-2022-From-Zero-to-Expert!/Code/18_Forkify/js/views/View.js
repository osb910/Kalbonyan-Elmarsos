class View {
  _data;
  _parent;
  _message = '';
  _errorMessage = '';

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A mrkup is returned if render=false
   * @this {Object} View instance
   * @author Omar Shareef
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parent.querySelectorAll('*'));

    newElements.forEach((newEl, idx) => {
      const curEl = curElements[idx];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
        // newEl.textContent
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parent.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="../../img/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="../../img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    // No recipes found for your query. Please try again!
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="../../img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    // No recipes found for your query. Please try again!
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(evt =>
      window.addEventListener(evt, handler)
    );
  }
}

export default View;
