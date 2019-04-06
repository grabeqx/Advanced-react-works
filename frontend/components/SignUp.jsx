import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class SignUp extends Component {

  state = {
    email: '',
    name: '',
    password: ''
  }

  saveTostate = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, {error, loading}) => {
          return (
            <Form method="post" onSubmit={async (e) => {
              e.preventDefault();
              const res = await signup();
              this.setState({
                name: '',
                email: '',
                password: ''
              });
            }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign up to create account</h2>
                <Error error={error} />
                <label htmlFor="email">
                  Email
                  <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.saveTostate} />
                </label>
                <label htmlFor="name">
                  Name
                  <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.saveTostate} />
                </label>
                <label htmlFor="password">
                  Password
                  <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.saveTostate} />
                </label>
                <button type="submit">Sign up</button>
              </fieldset>
            </Form> 
          );
        }}
      </Mutation>
    )
  }
}

export default SignUp;