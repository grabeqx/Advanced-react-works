import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Table from './styles/Table';
import SickButton from './styles/SickButton';
import PropTypes from 'prop-types';


const possiblePermissions = ['ADMIN', 'USER', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISISIONUPDATE'];

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const Permissions = (props) => (
  <Query query={ALL_USERS_QUERY}>
    {({data, loading, error}) => (
      <div>
        <Error error={error} />
        <div>
          <h2>Menage permissions</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {possiblePermissions.map((permission, index) => (
                  <th key={index}>{permission}</th>
                ))}
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => <UserPermisions user={user} key={user.id}/>)}
            </tbody>
          </Table>
        </div>
      </div>
    )}
  </Query>
);

class UserPermisions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired
  }
  state = {
    permissions: this.props.user.permissions
  }

  handlePermissionChange = (e) => {
    const checkbox = e.target;
    let updatedPermissions = [...this.state.permissions];
    if(checkbox.checked) {
      updatedPermissions.push(checkbox.value);
      this.setState({
        permissions: updatedPermissions
      })
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
      this.setState({
        permissions: updatedPermissions
      });
    }
  }

  render() {
    const user = this.props.user;
    return (
      <Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{
        permissions: this.state.permissions,
        userId: this.props.user.id
      }}>
        {(updatePermissions, {loading, error}) => (
          <>
          {error && <td colSpan="5"><Error error={error} /></td>}
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            {possiblePermissions.map((permission, index) => (
              <td key={index}>
                <label htmlFor={`${user.id}-permision-${permission}`}>
                  <input type="checkbox" checked={this.state.permissions.includes(permission)} value={permission} onChange={this.handlePermissionChange}/>
                </label>
              </td>
            ))}
            <td>
              <SickButton onClick={updatePermissions} type="button" disabled={loading}>Update</SickButton>
            </td>
          </tr>
          </>
        )}
      </Mutation>
    )
  }
}

export default Permissions;