import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import secured from '../secured';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: {id: $id}) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUSTAION = gql`
  mutation UPDATE_ITEM_MUSTAION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;


class UpdateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  };

  handleChange = (e) => {
    const {name, type, value} = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val
    })
  }

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
  }

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{
        id: this.props.id
      }}>
        {({data, loading}) => {
          if(!data.item) return <p>No item</p>
          return (       
            <Mutation mutation={UPDATE_ITEM_MUSTAION} variables={this.state}>
                {(updateItem, {loading, error}) => (
                  <Form onSubmit={ (e) => this.updateItem(e, updateItem)}>
                    <Error error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                      <label htmlFor="title">
                        Title
                        <input type="text" id="title" name="title" placeholder="Title" required defaultValue={data.item.title} onChange={this.handleChange}/>
                      </label>
                      <label htmlFor="price">
                        Price
                        <input type="number" id="price" name="price" placeholder="Price" required defaultValue={data.item.price} onChange={this.handleChange}/>
                      </label>
                      <label htmlFor="price">
                        Description
                        <textarea id="description" name="description" placeholder="Description" required defaultValue={data.item.description} onChange={this.handleChange}/>
                      </label>
                      <button type="submit">Save</button>
                    </fieldset>
                  </Form>
                )}
          </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default UpdateItem;
export {UPDATE_ITEM_MUSTAION};