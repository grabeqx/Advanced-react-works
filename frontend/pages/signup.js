import styled from 'styled-components';

import SignUp from '../components/SignUp';
import SignIn from '../components/Signin';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const signup = (props) => {
  return (
    <Columns>
      <SignUp />
      <SignIn />
    </Columns>
  )
}

export default signup