import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser } from '../lib/testUtils';

const notSignedInMock = [
  {
    request: {query: CURRENT_USER_QUERY},
    result: {data: {me: null}}
  }
];

const signedInMocks = [
  {
    request: {query: CURRENT_USER_QUERY},
    result: {data: {me: fakeUser()}}
  }
];

describe('<Nav />', () => {

  it('renders a minimal nav', async () => {
    const wrapper = mount(<MockedProvider mocks={notSignedInMock}>
      <Nav />
    </MockedProvider>);
    await wait();
    wrapper.update();
    const nav = wrapper.find('ul[data-test="nav"]');
    expect(nav.children().length).toBe(3);

  });

  it('renders a full nav in sign in', async () => {
    const wrapper = mount(<MockedProvider mocks={signedInMocks}>
      <Nav />
    </MockedProvider>);
    await wait();
    wrapper.update();
    const nav = wrapper.find('ul[data-test="nav"]');
    expect(nav.children().length).toBe(6);
  })

})