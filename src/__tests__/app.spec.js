import { shallow } from 'enzyme'
import React from 'react';
import expect from 'expect';

describe('The app', () => {
  it('should render a tag for this example', () => {
    const wrapper = shallow(<div/>);
    expect(wrapper.length).toBe(1);
  });
})
