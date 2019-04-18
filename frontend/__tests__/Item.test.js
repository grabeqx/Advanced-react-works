import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
  id: 'ABS',
  title: 'A cool Item',
  price: 400,
  description: 'lorem ipusm',
  image: 'image.png',
  largeImage: 'fullImage.png'
};

describe('<Item />', () => {
  it('renders and matches the snapshot', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  })

  // it('renders and displays properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);

  //   const priceTag = wrapper.find('PriceTag');

  //   console.log(wrapper.debug());
  //   expect(priceTag.children().text()).toBe('$5');
  //   expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  //   const img = wrapper.find('img');
  //   expect(img.props().src).toBe(fakeItem.image);
  //   expect(img.props().alt).toBe(fakeItem.title);
  // });

  // it('renders out the buttons properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const buttonList = wrapper.find('.buttonList');
  //   expect(buttonList.children()).toHaveLength(3);
  //   expect(buttonList.find('Link')).toHaveLength(1);
  //   expect(buttonList.find('Link')).toBeTruthy();
  //   expect(buttonList.find('AddToCart')).toBeTruthy();
  //   expect(buttonList.find('DeleteButton')).toBeTruthy();

  // });

})