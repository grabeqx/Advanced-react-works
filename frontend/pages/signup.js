import SignUp from '../components/SignUp';
import styled from 'styled-components';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const signup = (props) => {
  return (
    <Columns>
      <SignUp />
      <SignUp />
      <SignUp />
    </Columns>
  )
}

export default signup