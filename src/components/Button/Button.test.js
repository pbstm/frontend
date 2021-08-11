import React from 'react'
import { shallow } from 'enzyme'
import { Button } from './index.js'

let component, mockCallback;

describe('Button tests', () => {
    beforeEach(
      () => (
        (mockCallback = jest.fn()),
        (component = shallow(<Button onClick={mockCallback}>Text</Button>))
      )
    )
    test('Callback should be called', () => {
      component.find('button').simulate('click')
      expect(mockCallback).toHaveBeenCalled()
    })
  })
