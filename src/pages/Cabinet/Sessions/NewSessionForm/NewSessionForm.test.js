import React from 'react'
import { mount } from 'enzyme'
import NewSessionForm from './index.js'

let component, titleInput, descriptionInput, coverInput, mockCallback, form

describe('Basic tests', () => {
  beforeEach(
    () => (
      (component = mount(<NewSessionForm />)),
      (titleInput = component.find({ name: 'title' })),
      (descriptionInput = component.find({ name: 'description' })),
      (coverInput = component.find({ name: 'cover' }))
    )
  )
  test('should exist', () => {
    expect(component).toBeTruthy()
  })
  test('initial render', () => {
    expect(titleInput.length).toBe(1)
    expect(descriptionInput.length).toBe(1)
    expect(coverInput.length).toBe(1)
    expect(component.find('button').length).toBe(3)
  })
  test('div-wrapper of blank title input after onBlur should have class .error', () => {
    titleInput.simulate('blur')
    expect(component.find('.formsControls').at(0).hasClass('error')).toBe(true)
  })
  test('div-wrapper of blank description input after onBlur should have class .error', () => {
    descriptionInput.simulate('blur')
    expect(component.find('.formsControls').at(1).hasClass('error')).toBe(true)
  })
})

describe('Callback tests', () => {
  beforeEach(
    () => (
      (mockCallback = jest.fn()),
      (component = mount(<NewSessionForm onSubmit={mockCallback} />)),
      (titleInput = component.find({ name: 'title' })),
      (descriptionInput = component.find({ name: 'description' })),
      (coverInput = component.find({ name: 'cover' })),
      (form = component.find('form'))
    )
  )
  test('Callback should be called with input values', () => {
    const fileContents = 'file contents'
    const file = new Blob([fileContents], { type: 'text/plain' })
    console.log(file)
    const readAsDataURL = jest.fn()
    const addEventListener = jest.fn((_, evtHandler) => {
      evtHandler()
    })
    const dummyFileReader = {
      addEventListener,
      readAsDataURL,
      result: fileContents
    }
    window.FileReader = jest.fn(() => dummyFileReader)

    titleInput.simulate('change', {
      target: { name: 'title', value: 'testtitle' }
    })
    descriptionInput.simulate('change', {
      target: { name: 'description', value: 'testdescription' }
    })
    coverInput.simulate('change', { target: { name: 'cover', files: [file] } })
    form.simulate('submit', {})
    expect(FileReader).toHaveBeenCalled()
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledWith({
      title: 'testtitle',
      description: 'testdescription',
      cover: file
    })
  })
  test('Callback should not be called without input file', () => {
    titleInput.simulate('change', {
      target: { name: 'title', value: 'testtitle' }
    })
    descriptionInput.simulate('change', {
      target: { name: 'description', value: 'testdescription' }
    })
    form.simulate('submit', {})
    expect(mockCallback).toHaveBeenCalledTimes(0)
  })
})
