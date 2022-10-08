import React, { FC } from 'react';
import style from './button.module.scss';
import classnames from 'classnames';

type ButtonPropsType = {
  onClick?: () => void
  isDisabled?: boolean
  isForSubmit?: boolean
  title: string
}

export const Button: FC<ButtonPropsType> = ({ onClick, title, isDisabled, isForSubmit }) => {
  return (
    <button
      onClick={onClick}
      type={isForSubmit ? 'submit' : undefined}
      disabled={isDisabled}
      className={classnames(style.button, {[style.disabled]: isDisabled})}>
      {title}
    </button>
  );
};
