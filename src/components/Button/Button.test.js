import React from 'react'
import { shallow } from 'enzyme'
// @ts-ignore
import { Button } from './index.tsx'

let component, mockCallback, text, stylish;

describe('Button tests', () => {
    beforeEach(
      () => (
        (text = 'testText'),
        (stylish = 'testClass'),
        (mockCallback = jest.fn()),
        (component = shallow(<Button onClick={mockCallback} text={text} stylish={stylish}></Button>))
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
    test('styles applied correctly', () => {
        expect(component.find('button').hasClass('Button')).toBe(true)
        expect(component.find('button').hasClass('testClass')).toBe(true)
    });
  })

