import View from './View.js';
import previewView from './previewView.js';

class ResultsView extends View {
  _parent = document.querySelector('.results');
  _data;
  _errorMessage = 'No recipes found for your query! Please try again :)';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
