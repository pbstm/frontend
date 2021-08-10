import React from 'react'
import { mount } from 'enzyme'
import EmailForm from './index.js'

let component, userEmail

describe('EmailForm component', () => {
  beforeEach(
    () => (
      (userEmail = 'vasya@mail.ru'),
      (component = mount(<EmailForm userEmail={userEmail} />))
    )
  )

  test('should exist', () => {
    expect(component).toBeTruthy()
  })
  test('props', () => {
    expect(component.props().userEmail).toEqual(userEmail)
  })
  test('after render input with name="email" should be displayed', () => {
    expect(component.find({ name: 'email' }).length).toBe(1)
  })
  test('after render input with name="password" should not be displayed', () => {
    expect(component.find({ name: 'password' }).length).toBe(0)
  })
  test('after render button with type="submit" should not be displayed', () => {
    expect(component.find({ type: 'submit' }).length).toBe(0)
  })
  test('after change email input with name="password" should be displayed', () => {
    component.find({ name: 'email' }).simulate('change')
    expect(component.find({ name: 'password' }).length).toBe(1)
  })
  test('after change email button with type="submit" should be displayed', () => {
    component.find({ name: 'email' }).simulate('change')
    expect(component.find({ name: 'password' }).length).toBe(1)
  })
  test('defaultValue of input email equal to userEmail', () => {
    expect(component.find({ name: 'email' }).prop('defaultValue')).toEqual(
      userEmail
    )
  })
  test('after change email value to incorrect div-wrapper should have class .error', () => {
    const emailInput = component.find({ name: 'email' })
    emailInput.instance().value = 'vasyamail.ru'
    emailInput.simulate('change').simulate('blur')
    expect(component.find('.formsControls').at(0).hasClass('error')).toBe(true)
  })
  test('div-wrapper of blank password input after onBlur should have class .error', () => {
    component.find({ name: 'email' }).simulate('change')
    component.find({ name: 'password' }).simulate('blur')
    expect(component.find('.formsControls').at(1).hasClass('error')).toBe(true)
  })
})

describe('Incorrect initial email', () => {
  beforeEach(
    () => (
      (userEmail = 'vasyamail.ru'),
      (component = mount(<EmailForm userEmail={userEmail} />))
    )
  )
  test('div-wrapper of input with incorrect email afret onBlur should have class .error', () => {
    component.find({ name: 'email' }).simulate('blur')
    expect(component.find('.formsControls').hasClass('error')).toBe(true)
  })
})
