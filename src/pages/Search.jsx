import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.state = {
      searchInput: '',
      isButtonDisabled: true,
      isLoading: false,
      search: '',
      array: [],
    };
  }

  onInputChange({ target: { type, name, value, checked } }) {
    this.setState({
      [name]: (type === 'checkbox' ? checked : value),
    }, this.validateForm);
  }

  async onClickSearch(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { searchInput } = this.state;
    const array = await searchAlbumsAPI(searchInput);
    this.setState({
      array,
      search: searchInput,
      searchInput: '',
      isLoading: false,
      isButtonDisabled: true,
    });
  }

  validateForm() {
    const { searchInput } = this.state;
    const chars = 2;
    this.setState({
      isButtonDisabled: searchInput.length < chars,
    });
  }

  render() {
    const { searchInput, isButtonDisabled, isLoading, search, array } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="input-search">
            <input
              type="text"
              id="input-search"
              name="searchInput"
              value={ searchInput }
              onChange={ this.onInputChange }
              data-testid="search-artist-input"
            />
            <button
              type="submit"
              disabled={ isButtonDisabled }
              onClick={ this.onClickSearch }
              data-testid="search-artist-button"
            >
              Pesquisar

            </button>
          </label>
        </form>
        {isLoading ? <Loading /> : (
          <section>
            <h2>
              { `Resultado de álbuns de: ${search}` }
            </h2>
            <section>
              { (search) && ((array.length > 0) ? (array.map(
                ({ artistName, collectionId, collectionName, artworkUrl100 }, index) => (
                  <Link
                    to={ `/album/${collectionId}` }
                    key={ index }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    <section>
                      <img src={ artworkUrl100 } alt={ collectionName } />
                    </section>
                    <h2>{ collectionName }</h2>
                    <p>{ artistName }</p>
                  </Link>
                ),
              )) : <h3>Nenhum álbum foi encontrado</h3>) }
            </section>
          </section>
        ) }
      </div>
    );
  }
}

export default Search;
