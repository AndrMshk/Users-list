import React, { ChangeEvent, FC, forwardRef } from 'react';
import classnames from 'classnames';
import style from './input.module.scss';

type InputPropsType = {
  type: string
  error?: string
  name: string
  placeholder: string
  helperText?: string
  onChange: (e: ChangeEvent<any>) => void
  value: string
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

export const Input: FC<InputPropsType> = forwardRef(
  ({ type, error, name, placeholder, helperText, onChange, value, onBlur }, _) => {
    return (
      <div
        data-placeholder={placeholder}
        className={classnames(style.formGroup, {
          [style.focused]: value,
          [style.error]: error,
        })}>
        <input
          onBlur={onBlur}
          name={name}
          type={type}
          id={name}
          onChange={onChange}
          value={value} />
        {(helperText || error) &&
        <div className={classnames(style.helperText, { [style.errorMessage]: error })}>
          {error ? error : helperText}
        </div>}
      </div>
    );
  });




