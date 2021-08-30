import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterForm from './index.js'

describe('Basic render tests', () => {
  let component, mockCallback

  beforeEach(
    () => (
      (mockCallback = jest.fn()),
      (component = render(<RegisterForm onSubmit={mockCallback} />))
    )
  )

  test('should exist', () => {
    expect(component).toBeTruthy()
  })

  test('initial render', () => {
    expect(screen.getByTestId('form')).toBeTruthy()
    expect(screen.getByTestId('name')).toBeTruthy()
    expect(screen.getByTestId('email')).toBeTruthy()
    expect(screen.getByTestId('password')).toBeTruthy()
    expect(screen.getByTestId('password_confirmation')).toBeTruthy()
    expect(screen.getByRole('button')).toBeTruthy()
  })
})

describe('Validation tests, under unvalid input after onBlur should appear div with "!" symbol', () => {
  let mockCallback, name, email, password, passwordConfirmation

  beforeEach(
    () => (
      (mockCallback = jest.fn()),
      render(<RegisterForm onSubmit={mockCallback} />),
      (name = screen.getByTestId('name')),
      (email = screen.getByTestId('email')),
      (password = screen.getByTestId('password')),
      (passwordConfirmation = screen.getByTestId('password_confirmation'))
    )
  )

  test('required name', async () => {
    await waitFor(() => {
      fireEvent.blur(name)
    })
    expect(screen.getByText('!')).toBeTruthy()
  })

  test('required email', async () => {
    await waitFor(() => {
      fireEvent.blur(email)
    })
    expect(screen.getByText('!')).toBeTruthy()
  })

  test('required password', async () => {
    await waitFor(() => {
      fireEvent.blur(password)
    })
    expect(screen.getByText('!')).toBeTruthy()
  })

  test('required password confirmation', async () => {
    await waitFor(() => {
      fireEvent.blur(passwordConfirmation)
    })
    expect(screen.getByText('!')).toBeTruthy()
  })

  test('email must have valid format', async () => {
    userEvent.type(email, 'unvalid_email')
    await waitFor(() => {
      fireEvent.blur(email)
    })
    expect(screen.getByText('!')).toBeTruthy()
  })

  test('password must contain 6 or more symbols', async () => {
    userEvent.type(password, '12345')
    await waitFor(() => {
      fireEvent.blur(password)
    })
    expect(screen.getByText('!')).toBeTruthy()
  })

  test('password and password_confirmation must be equal', async () => {
    userEvent.type(password, 'password')
    await waitFor(() => {
      fireEvent.blur(password)
    })
    userEvent.type(passwordConfirmation, 'unequalpassword')
    await waitFor(() => {
      fireEvent.blur(passwordConfirmation)
    })
    expect(screen.getByText('!')).toBeTruthy()
  })
})

test('Render with error message', async () => {
  const mockCallback = jest.fn()
  const registerError = 'Error Message'

  render(<RegisterForm onSubmit={mockCallback} registerError={registerError} />)

  expect(screen.getByTestId('form')).toBeTruthy()
  expect(screen.getByTestId('name')).toBeTruthy()
  expect(screen.getByTestId('email')).toBeTruthy()
  expect(screen.getByTestId('password')).toBeTruthy()
  expect(screen.getByTestId('password_confirmation')).toBeTruthy()
  expect(screen.getByRole('button')).toBeTruthy()
  expect(screen.getByText('Error Message')).toBeTruthy()
})

test('Callback should be called with input values', async () => {
  const mockCallback = jest.fn()
  render(<RegisterForm onSubmit={mockCallback} />)

  const name = screen.getByTestId('name')
  const email = screen.getByTestId('email')
  const password = screen.getByTestId('password')
  const passwordConfirmation = screen.getByTestId('password_confirmation')
  const submitBtn = screen.getByRole('button')

  userEvent.type(name, 'testName')
  userEvent.type(email, 'test@email.com')
  userEvent.type(password, 'testPass')
  userEvent.type(passwordConfirmation, 'testPass')
  userEvent.click(submitBtn)

  await waitFor(() =>
    expect(mockCallback).toHaveBeenCalledWith({
      name: 'testName',
      email: 'test@email.com',
      password: 'testPass',
      password_confirmation: 'testPass'
    })
  )
})
