import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import {CURRENT_USER_QUERY} from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends React.Component {

  update = (cache, payload) => {
    const data = cache.readQuery({
      query: CURRENT_USER_QUERY
    });
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    cache.writeQuery({query: CURRENT_USER_QUERY, data});
  }

  render() {
    return (
      <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{
        id: this.props.id
      }} 
        update={this.update} 
        optimisticResponse={{
          __typename: 'Mutation',
          removeFromCart: {
            __typename: 'CartItem',
            id: this.props.id
          }
        }}
      >
        {(removeFromCart, {loading, error}) => (
          <BigButton title="Delete Item" onClick={removeFromCart}>
            &times;
          </BigButton>
        )}
      </Mutation>
    )
  }
}

export default RemoveFromCart;