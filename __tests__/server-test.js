import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Actions } from 'react-native-router-flux';
import SetServer from '../index';

configure({ adapter: new Adapter() });
jest.mock('react-native-router-flux', () => ({
  Actions: { pop: jest.fn() },
}));

const onConfirmServer = jest.fn();
const saveBGColors = ['blue', 'pink'];
const headerCurve = 77;
const brandLogo = 12;

it('render correctly without props', () => {
  const tree = renderer.create(<SetServer />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('render correctly with props', () => {
  const tree = renderer.create(<SetServer onConfirmServer={onConfirmServer} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('confirm button is clicked', () => {
  const rootComponent = shallow(<SetServer onConfirmServer={onConfirmServer} />);
  rootComponent
    .find('Button')
    .first()
    .props()
    .onPress();
  expect(
    rootComponent
      .find('Button')
      .first()
      .props().title,
  ).toMatch('Confirm');
  expect(onConfirmServer.mock.calls.length).toEqual(1);
});

it('confirm button is clicked, default prop', () => {
  const rootComponent = shallow(<SetServer />);
  rootComponent
    .find('Button')
    .first()
    .props()
    .onPress();
  expect(
    rootComponent
      .find('Button')
      .first()
      .props().onPress,
  ).toBeInstanceOf(Function);
});

it('bac button is clicked', () => {
  const rootComponent = shallow(<SetServer onConfirmServer={onConfirmServer} />);
  rootComponent
    .find('Button')
    .last()
    .props()
    .onPress();
  expect(
    rootComponent
      .find('Button')
      .last()
      .props().title,
  ).toMatch('Back');
  expect(onConfirmServer.mock.calls.length).toEqual(1);
});

it('back button is clicked, default prop', () => {
  const rootComponent = shallow(<SetServer />);
  rootComponent
    .find('Button')
    .last()
    .props()
    .onPress();
  expect(
    rootComponent
      .find('Button')
      .last()
      .props().onPress,
  ).toBeInstanceOf(Function);
});

it('save BG color', () => {
  const rootComponent = shallow(<SetServer saveBGColors={saveBGColors} />);
  expect(rootComponent.instance().props.saveBGColors).toEqual(saveBGColors);
});

it('renders an headerCurve', () => {
  const rootComponent = shallow(<SetServer headerCurve={headerCurve} />);
  expect(rootComponent).toMatchSnapshot();
});

it('renders an brandLogo', () => {
  const rootComponent = shallow(<SetServer brandLogo={brandLogo} />);
  expect(rootComponent).toMatchSnapshot();
});

it('should render the onChange to input', () => {
  const rootComponent = shallow(<SetServer onConfirmServer={onConfirmServer} />);
  rootComponent
    .find('TextInput')
    .props()
    .onChangeText('test');
  expect(rootComponent.state().serverInput).toMatch('test');
});
