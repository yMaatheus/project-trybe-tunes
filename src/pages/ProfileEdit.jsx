import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonSaveClick = this.onButtonSaveClick.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.state = {
      isLoading: true,
      image: '',
      name: '',
      email: '',
      description: '',
      isButtonDisabled: false,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    const { image, name, email, description } = user;
    this.setState({
      isLoading: false,
      image,
      name,
      email,
      description,
    }, this.validateForm);
  }

  onInputChange({ target: { type, name, value, checked } }) {
    this.setState({
      [name]: (type === 'checkbox' ? checked : value),
    }, this.validateForm);
  }

  async onButtonSaveClick() {
    const { history } = this.props;
    const { image, name, email, description } = this.state;
    this.setState({ isLoading: true });
    await updateUser({ image, name, email, description });
    history.push('/profile');
  }

  validateForm() {
    const { image, name, email, description } = this.state;
    const array = [image, name, email, description];
    const isFilled = array.every((input) => input.length > 0);
    const checkEmail = email.includes('@');
    this.setState({ isButtonDisabled: !(isFilled && checkEmail) });
  }

  render() {
    const {
      isLoading, image, name, email, description, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? <Loading /> : (
          <section>
            <form>
              <fieldset>
                <img src={ image } alt={ name } />
                <input
                  type="text"
                  name="image"
                  value={ image }
                  onChange={ this.onInputChange }
                  placeholder="Insira um link"
                  data-testid="edit-input-image"
                />
                <h4>Nome</h4>
                <p>Fique à vontade para usar seu nome social</p>
                <input
                  type="text"
                  name="name"
                  value={ name }
                  onChange={ this.onInputChange }
                  placeholder="Insira seu nome"
                  data-testid="edit-input-name"
                />
                <h4>Email</h4>
                <p>Escolha um e-mail que consulte diariamente</p>
                <input
                  type="text"
                  name="email"
                  value={ email }
                  onChange={ this.onInputChange }
                  placeholder="usuario@usuario.com.br"
                  data-testid="edit-input-email"
                />
                <h4>Descrição</h4>
                <textarea
                  name="description"
                  value={ description }
                  onChange={ this.onInputChange }
                  id="descricao"
                  cols="10"
                  rows="10"
                  data-testid="edit-input-description"
                />
              </fieldset>
              <button
                type="button"
                onClick={ this.onButtonSaveClick }
                disabled={ isButtonDisabled }
                data-testid="edit-button-save"
              >
                Salvar

              </button>
            </form>
          </section>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default ProfileEdit;
