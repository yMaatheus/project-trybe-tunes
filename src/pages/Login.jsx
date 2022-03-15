import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.state = {
      loginName: '',
      isButtonDisabled: true,
      isLoading: false,
    };
  }

  onInputChange({ target: { type, name, value, checked } }) {
    this.setState({
      [name]: (type === 'checkbox' ? checked : value),
    }, this.validateInput);
  }

  onHandleClick(event) {
    event.preventDefault();
    const { history } = this.props;
    const { loginName } = this.state;
    this.setState({ isLoading: true }, async () => {
      await createUser({ name: loginName });
      history.push('/search');
    });
  }

  validateInput() {
    const { loginName } = this.state;
    const chars = 3;
    this.setState({
      isButtonDisabled: loginName.length < chars,
    });
  }

  render() {
    const { isLoading, loginName, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-login">
        {isLoading ? <Loading /> : (
          <div>
            <label htmlFor="name-input">
              <input
                type="text"
                id="name-input"
                name="loginName"
                value={ loginName }
                onChange={ this.onInputChange }
                data-testid="login-name-input"
              />
            </label>
            <button
              type="submit"
              onClick={ this.onHandleClick }
              disabled={ isButtonDisabled }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </div>
        ) }
        {/* {isAuth && <Redirect to="/search" /> } */}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
