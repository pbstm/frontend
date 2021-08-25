import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import PasswordForm from './index.js'

describe('Render tests', () => {
  let component, mockCallback

  beforeEach(
    () => (
      (mockCallback = jest.fn()),
      (component = render(<PasswordForm onSubmit={mockCallback} />))
    )
  )

  test('should exist', () => {
    expect(component).toBeTruthy()
  })

  test('initial render', () => {
    const link = screen.getByRole('link')
    expect(link).toBeTruthy()
  })
  
  test('render after click on link', async () => {
    const link = screen.getByRole('link')
    await waitFor(() => {
      fireEvent.click(link)
    })
    expect(screen.getByTestId('form')).toBeTruthy()
    expect(screen.getByTestId('current_password')).toBeTruthy()
    expect(screen.getByTestId('password')).toBeTruthy()
    expect(screen.getByTestId('password_confirmation')).toBeTruthy()
    expect(screen.getByRole('button')).toBeTruthy()
  })
})

describe('Callback test', () => {
  let component, mockCallback

  beforeEach(
    () => (
      (mockCallback = jest.fn()),
      (component = render(<PasswordForm onSubmit={mockCallback} />))
    )
  )

  test('Callback should be called with input values', async () => {
    const link = screen.getByRole('link')
    await waitFor(() => {
      fireEvent.click(link)
    })

    const currentPassword = screen.getByTestId('current_password')
    const password = screen.getByTestId('password')
    const passwordConfirmation = screen.getByTestId('password_confirmation')
    const submitBtn = screen.getByRole('button')

    await waitFor(() => {
      fireEvent.change(currentPassword, {
        target: {
          value: 'testCurrentPass'
        }
      })
    })
    await waitFor(() => {
      fireEvent.change(password, {
        target: {
          value: 'testPass'
        }
      })
    })
    await waitFor(() => {
      fireEvent.change(passwordConfirmation, {
        target: {
          value: 'testPassConfirm'
        }
      })
    })
    await waitFor(() => {
      fireEvent.click(submitBtn)
    })

    expect(mockCallback).toHaveBeenCalledWith({
      current_password: 'testCurrentPass',
      password: 'testPass',
      password_confirmation: 'testPassConfirm'
    })
  })
})
