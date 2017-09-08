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
  // containsMatchingElement is for don't give in element all atributes how type, disabled and etc...
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
  // In button.props has all properties of button
  it('`button` should be disabled', () => {
    const button = wrapper.find('button').first();
    expect(
      button.props().disabled
    ).toBe(true);
  });

  describe('The user action inpunt', () => {
    const item = 'Eusébio';

    beforeEach(() => {
      const input = wrapper.find('input').first();
      input.simulate('change', {
        target: { value: item }
      })
    });

    it('should update the state property `item`', () => {
      expect(
        wrapper.state().item
      ).toEqual(item);
    });

    it('`Button` should be enabled', () => {
      const button = wrapper.find('button').first();
      expect(
        button.props().disabled
      ).toBe(false)
    });

    describe('and then clears the input', () => {
      beforeEach(() => {
        const input = wrapper.find('input').first();
        input.simulate('change', {
          target: { value: '' }
        })
      });

      it('`Button` should be disabled', () => {
        const button = wrapper.find('button').first();
        expect(
          button.props().disabled
        ).toBe(true)
      })
    });

    describe('and then submits the form', () => {
      beforeEach(() => {
        const form = wrapper.find('form').first();
        form.simulate('submit', {
          preventDefault: () => { },
        });
      });

      it('should add the item to state', () => {
        expect(
          wrapper.state().items
        ).toContain(item);
      });

      it('should render the item in the table', () => {
        expect(
          wrapper.containsMatchingElement(
            <td>{item}</td>
          )
        ).toBe(true);
      });

      it('should clear the input field', () => {
        const input = wrapper.find('input').first();
        expect(
          input.props().value
        ).toEqual('');
      });

      it('`button` should be disabled', () => {
        const button = wrapper.find('button').first();
        expect(
          button.props().disabled
        ).toBe(true);
      })
    });
  });

});