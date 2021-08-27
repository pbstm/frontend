import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PasswordForm from './index.js'

describe('Basic render tests', () => {
  let component, mockCallback, link

  beforeEach(
    () => (
      (mockCallback = jest.fn()),
      (component = render(<PasswordForm onSubmit={mockCallback} />)),
      (link = screen.getByRole('link'))
    )
  )

  test('should exist', () => {
    expect(component).toBeTruthy()
  })

  test('initial render', () => {
    expect(link).toBeTruthy()
  })

  test('render after click on link', () => {
    userEvent.click(link)
    expect(screen.getByTestId('form')).toBeTruthy()
    expect(screen.getByTestId('current_password')).toBeTruthy()
    expect(screen.getByTestId('password')).toBeTruthy()
    expect(screen.getByTestId('password_confirmation')).toBeTruthy()
    expect(screen.getByRole('button')).toBeTruthy()
  })
})

describe('Validation tests, under unvalid input after onBlur should appear div with "!" symbol', () => {
  let component, mockCallback, link, currentPassword, password, passwordConfirmation

  beforeEach(
    () => (
      (mockCallback = jest.fn()),
      (component = render(<PasswordForm onSubmit={mockCallback} />)),
      (link = screen.getByRole('link')),
      userEvent.click(link),
      (currentPassword = screen.getByTestId('current_password')),
      (password = screen.getByTestId('password')),
      (passwordConfirmation = screen.getByTestId('password_confirmation'))
    )
  )

  test('required current_password', async () => {
    await waitFor(() => {
      fireEvent.blur(currentPassword)
    })
    expect(screen.getByText('!')).toBeTruthy()
  })

  test('required password', async () => {
    await waitFor(() => {
      fireEvent.blur(password)
    })
    expect(screen.getByText('!')).toBeTruthy()
  })

  test('required password_confirmation', async () => {
    await waitFor(() => {
      fireEvent.blur(passwordConfirmation)
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
  const changePasswordError = 'Error Message'

  render(
    <PasswordForm
      onSubmit={mockCallback}
      changePasswordError={changePasswordError}
    />
  )

  const link = screen.getByRole('link')
  userEvent.click(link)

  expect(screen.getByTestId('form')).toBeTruthy()
  expect(screen.getByTestId('current_password')).toBeTruthy()
  expect(screen.getByTestId('password')).toBeTruthy()
  expect(screen.getByTestId('password_confirmation')).toBeTruthy()
  expect(screen.getByRole('button')).toBeTruthy()
  expect(screen.getByText('Error Message')).toBeTruthy()
})

test('Callback should be called with input values', async () => {
  const mockCallback = jest.fn()
  render(<PasswordForm onSubmit={mockCallback} />)

  const link = screen.getByRole('link')
  userEvent.click(link)

  const currentPassword = screen.getByTestId('current_password')
  const password = screen.getByTestId('password')
  const passwordConfirmation = screen.getByTestId('password_confirmation')
  const submitBtn = screen.getByRole('button')

  userEvent.type(currentPassword, 'testCurrentPass')
  userEvent.type(password, 'testPass')
  userEvent.type(passwordConfirmation, 'testPass')
  userEvent.click(submitBtn)

  await waitFor(() =>
    expect(mockCallback).toHaveBeenCalledWith({
      current_password: 'testCurrentPass',
      password: 'testPass',
      password_confirmation: 'testPass'
    })
  )
})
