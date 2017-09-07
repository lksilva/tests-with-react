/**
 * Jest considera qualquer arquivo que termine com *.test.js ou *.spec.js um test.
 * 
 */

import React from 'react';
import App from '../App.js';
import { shallow } from 'enzyme';

describe('Testing <App /> Component!', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <App />
    );
  });

  // In App should have a <th>
  it('should have the `th` "Items"', () => {
    expect(
      wrapper.contains(<th>Items</th>)
    ).toBe(true);
  });
  it('should have a `button`', () => {
    expect(
      wrapper.containsMatchingElement(<button>Add item</button>)
    ).toBe(true);
  });
  it('should have an `input` element', () => {
    expect(
      wrapper.containsMatchingElement(
        <input />
      )
    ).toBe(true);
  });
  it('`button` should be disabled', () => {
    const button = wrapper.find('button').first();
    expect(
      button.props().disabled
    ).toBe(true);
  });
});