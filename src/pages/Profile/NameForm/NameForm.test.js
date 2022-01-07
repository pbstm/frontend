import React from 'react'
import { mount } from 'enzyme'
// @ts-ignore
import NameForm from './index.tsx'

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
  test('after change name and onBlur callback should be called', () => {
    component.find('input').instance().value = 'Petya'
    component.find('input').simulate('change').simulate('blur')
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })
  test('after onBlur without change name callback should not be called', () => {
    component.find('input').simulate('blur')
    expect(mockCallback).toHaveBeenCalledTimes(0)
  })
})
