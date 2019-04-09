import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;

class Reset extends Component {

  state = {
    password: '',
    confirmPassword: ''
  }

  saveTostate = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <Mutation 
        mutation={RESET_MUTATION} 
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }} 
        refetchQueries={[{query: CURRENT_USER_QUERY}]}
      >
        {(resetPassword, {error, loading, called}) => {
          return (
            <Form method="post" onSubmit={async (e) => {
              e.preventDefault();
              await resetPassword();
              this.setState({
                password: '',
                confirmPassword: ''
              });
            }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset your password</h2>
                <Error error={error} />
                {!error && !loading && called && <p>chack your email</p>}
                <label htmlFor="password">
                  Password
                  <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.saveTostate} />
                </label>
                <label htmlFor="confirmPassword">
                  Confirm password
                  <input type="password" name="confirmPassword" placeholder="confirm Password" value={this.state.confirmPassword} onChange={this.saveTostate} />
                </label>
                <button type="submit">Reset</button>
              </fieldset>
            </Form> 
          );
        }}
      </Mutation>
    )
  }
}

export default Reset;