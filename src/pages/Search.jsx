import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.state = {
      search: '',
      isButtonDisabled: true,
    };
  }

  onInputChange({ target: { type, name, value, checked } }) {
    this.setState({
      [name]: (type === 'checkbox' ? checked : value),
    }, this.validateForm);
  }

  validateForm() {
    const { search } = this.state;
    const chars = 2;
    this.setState({
      isButtonDisabled: search.length < chars,
    });
  }

  render() {
    const { search, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="input-search">
            <input
              type="text"
              id="input-search"
              name="search"
              value={ search }
              onChange={ this.onInputChange }
              data-testid="search-artist-input"
            />
            <button
              type="submit"
              disabled={ isButtonDisabled }
              data-testid="search-artist-button"
            >
              Pesquisar

            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
