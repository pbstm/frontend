import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// @ts-ignore
import LoginForm from './index.tsx'

describe('Basic render tests', () => {
  let component, mockCallback

  beforeEach(
    () => (
      (mockCallback = jest.fn()),
      (component = render(<LoginForm onSubmit={mockCallback} />))
    )
  )

  test('should exist', () => {
    expect(component).toBeTruthy()
  })

  test('initial render', () => {
    expect(screen.getByTestId('form')).toBeTruthy()
    expect(screen.getByTestId('email')).toBeTruthy()
    expect(screen.getByTestId('password')).toBeTruthy()
    expect(screen.getByTestId('checkbox')).toBeTruthy()
    expect(screen.getByRole('button')).toBeTruthy()
  })
})

describe('Validation tests, under unvalid input after onBlur should appear div with "!" symbol', () => {
  let mockCallback, email, password

  beforeEach(
    () => (
      (mockCallback = jest.fn()),
      (render(<LoginForm onSubmit={mockCallback} />)),
      (email = screen.getByTestId('email')),
      (password = screen.getByTestId('password'))
    )
  )

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
})

test('Render with error message', async () => {
  const mockCallback = jest.fn()
  const loginError = 'Error Message'

  render(
    <LoginForm
      onSubmit={mockCallback}
      loginError={loginError}
    />
  )

  expect(screen.getByTestId('form')).toBeTruthy()
  expect(screen.getByTestId('email')).toBeTruthy()
  expect(screen.getByTestId('password')).toBeTruthy()
  expect(screen.getByTestId('checkbox')).toBeTruthy()
  expect(screen.getByRole('button')).toBeTruthy()
  expect(screen.getByText('Error Message')).toBeTruthy()
})

describe('Callback should be called with input values', () => {
  let mockCallback, email, password, checkbox, submitBtn

  beforeEach(
    () => (
      (mockCallback = jest.fn()),
      (render(<LoginForm onSubmit={mockCallback} />)),
      (email = screen.getByTestId('email')),
      (password = screen.getByTestId('password')),
      (checkbox = screen.getByTestId('checkbox')),
      (submitBtn = screen.getByRole('button'))
    )
  )

  test('Login as Photographer, checkbox type must be true', async () => {
    userEvent.type(email, 'test@email.com')
    userEvent.type(password, 'testPass')
    userEvent.click(checkbox)
    userEvent.click(submitBtn)
  
    await waitFor(() =>
      expect(mockCallback).toHaveBeenCalledWith({
        email: 'test@email.com',
        password: 'testPass',
        type: true
      })
    )
  })

  test('Login as Customer, checkbox type must be false', async () => {
    userEvent.type(email, 'test@email.com')
    userEvent.type(password, 'testPass')
    userEvent.click(submitBtn)
  
    await waitFor(() =>
      expect(mockCallback).toHaveBeenCalledWith({
        email: 'test@email.com',
        password: 'testPass',
        type: false
      })
    )
  })
})
