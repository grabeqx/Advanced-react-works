import React from 'react';
import Link from 'next/link';
import {Mutation} from 'react-apollo';

import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';
import {TOGGLE_CART_MUTATION} from './Cart';

const Nav = () => (
  <User>
      {({data: {me}}) => (
        <NavStyles data-test="nav">
          <Link href="/items">
            <a>Shop</a>
          </Link>
          {me && (
            <React.Fragment>
              <Link href="/sell">
                <a>Sell!</a>
              </Link>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Link href="/me">
                <a>Account</a>
              </Link>
              <Signout />
            </React.Fragment>
          )}
          {!me && (
            <Link href="/signup">
              <a>Sign in</a>
            </Link>
          )}
          <Mutation mutation={TOGGLE_CART_MUTATION}>
            {toggleCart => (
              <button onClick={toggleCart}>My cart</button>
            )}
          </Mutation>
        </NavStyles>
      )}
    </User>
);

export default Nav;