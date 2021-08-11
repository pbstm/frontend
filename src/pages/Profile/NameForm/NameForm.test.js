import React from 'react'
import { mount } from 'enzyme'
import NameForm from './index.js'

let component, userName, mockCallback

describe('NameForm component', () => {
  beforeEach(
    () => (
      (userName = 'Vasya'),
      (mockCallback = jest.fn()),
      (component = mount(
        <NameForm userName={userName} onSubmitName={mockCallback} />
      ))
    )
  )

  test('should exist', () => {
    expect(component).toBeTruthy()
  })
  test('props', () => {
    expect(component.props().userName).toEqual(userName)
  })
  test('after render input should be displayed', () => {
    expect(component.find('input').length).toBe(1)
  })
  test('defaultValue of input equal to userName', () => {
    expect(component.find('input').prop('defaultValue')).toEqual(userName)
  })
  test('after onBlur callback should be called', () => {
    component.find('input').simulate('blur')
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })
})
