import React from 'react'
import classes from './Button.module.scss'

export enum ButtonStyles {
  Primary = "Primary",
  PrimarySmall = "PrimarySmall",
  Secondary = "Secondary",
  SecondarySmall = "SecondarySmall"
}

export enum ButtonTypes {
  Button = "button",
  Submit = "submit",
  Reset = "reset"
}

interface IButtonProps {
  text?: string;
  onClick?: () => void;
  stylish: ButtonStyles;
  type?: ButtonTypes;
  disabled?: boolean;
}

const Button = ({ text, onClick, stylish, type, disabled }: IButtonProps) => (
  <button className={`${classes.Button} ${classes[stylish]}`} onClick={onClick} type={type} disabled={disabled}>
    {text}
  </button>
)

export { Button }
