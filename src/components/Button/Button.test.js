import React from 'react'
import { shallow } from 'enzyme'
import { Button } from './index.js'

let component, mockCallback, text;

describe('Button tests', () => {
    beforeEach(
      () => (
        (text = 'testText'),
        (mockCallback = jest.fn()),
        (component = shallow(<Button onClick={mockCallback} text={text}></Button>))
      )
    )
    test('Callback should be called', () => {
      component.find('button').simulate('click')
      expect(mockCallback).toHaveBeenCalled()
    })
    test('should render correctly', () => {
        expect(component.find('button')).toHaveLength(1);
        expect(component.text()).toEqual('testText');
    });
  })
