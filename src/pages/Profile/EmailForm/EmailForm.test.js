import React from 'react'
import { mount } from 'enzyme'
import EmailForm from './index.js'

let component,
  emailInput,
  userEmail,
  changeEmailSuccess,
  changeEmailError,
  mockCallback

describe('Basic tests', () => {
  beforeEach(
    () => (
      (userEmail = 'vasya@mail.ru'),
      (component = mount(<EmailForm userEmail={userEmail} />)),
      (emailInput = component.find({ name: 'email' }))
    )
  )
  test('should exist', () => {
    expect(component).toBeTruthy()
  })
  test('correct props', () => {
    expect(component.props().userEmail).toEqual(userEmail)
  })
  test('initial render', () => {
    expect(emailInput.length).toBe(1)
    expect(component.find({ name: 'password' }).length).toBe(0)
    expect(component.find('button').length).toBe(0)
  })
  test('render after onChange input email', () => {
    emailInput.simulate('change')
    expect(emailInput.length).toBe(1)
    expect(component.find({ name: 'password' }).length).toBe(1)
    expect(component.find('button').length).toBe(1)
  })
  test('defaultValue of input email equal to userEmail', () => {
    expect(emailInput.prop('defaultValue')).toEqual(userEmail)
  })
  test('after change email value to incorrect div-wrapper should have class .error', () => {
    emailInput.instance().value = 'vasyamail.ru'
    emailInput.simulate('change').simulate('blur')
    expect(component.find('.formsControls').at(0).hasClass('error')).toBe(true)
  })
  test('div-wrapper of blank password input after onBlur should have class .error', () => {
    emailInput.simulate('change')
    component.find({ name: 'password' }).simulate('blur')
    expect(component.find('.formsControls').at(1).hasClass('error')).toBe(true)
  })
})

describe('Incorrect initial email', () => {
  test('div-wrapper of input with incorrect email afret onBlur should have class .error', () => {
    userEmail = 'vasyamail.ru'
    component = mount(<EmailForm userEmail={userEmail} />)
    component.find({ name: 'email' }).simulate('blur')
    expect(component.find('.formsControls').hasClass('error')).toBe(true)
  })
})

describe('Render with success message', () => {
  beforeEach(
    () => (
      (changeEmailSuccess = 'Success Message'),
      (userEmail = 'vasya@mail.ru'),
      (component = mount(
        <EmailForm
          userEmail={userEmail}
          changeEmailSuccess={changeEmailSuccess}
        />
      ))
    )
  )
  test('render correctly', () => {
    expect(component.find({ name: 'email' }).length).toBe(1)
    expect(component.find('.formSummarySuccess').length).toBe(1)
    expect(component.find({ name: 'password' }).length).toBe(0)
    expect(component.find('button').length).toBe(0)
  })
  test('div with success message should contains correct message', () => {
    expect(component.find('.formSummarySuccess').text()).toEqual(
      'Success Message'
    )
  })
})

describe('Render with error message', () => {
  beforeEach(
    () => (
      (changeEmailError = 'Error Message'),
      (userEmail = 'vasya@mail.ru'),
      (component = mount(
        <EmailForm userEmail={userEmail} changeEmailError={changeEmailError} />
      ))
    )
  )
  beforeEach(
    //imitate editMode
    () => component.find({ name: 'email' }).simulate('change')
  )
  test('render correctly', () => {
    expect(component.find({ name: 'email' }).length).toBe(1)
    expect(component.find('.formSummaryError').length).toBe(1)
    expect(component.find({ name: 'password' }).length).toBe(1)
    expect(component.find('button').length).toBe(1)
  })
  test('div with error message should contains correct message', () => {
    expect(component.find('.formSummaryError').text()).toEqual('Error Message')
  })
})

describe('Callback tests', () => {
  beforeEach(
    () => (
      (userEmail = 'vasya@mail.ru'),
      (mockCallback = jest.fn()),
      (component = mount(
        <EmailForm userEmail={userEmail} onSubmitEmail={mockCallback} />
      ))
    )
  )
  test('Callback should be called on submit form', () => {
    component.find('form').simulate('submit', {})
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })
})
