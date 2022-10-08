import React, { forwardRef, LegacyRef } from 'react';
import { ChangeHandler } from 'react-hook-form';
import style from './radioButton.module.scss';

type RadioButtonPropsType = {
  id: number
  title: string
  name: string
  onBlur: ChangeHandler
  onChange: ChangeHandler
}

export const RadioButton = forwardRef(
  (props: RadioButtonPropsType, ref: LegacyRef<HTMLInputElement> | undefined) => {
    return (
      <div className={style.radio}>
        <input
          {...props}
          id={props.id.toString()}
          type="radio"
          value={props.id}
          ref={ref} />
        <label htmlFor={props.id.toString()}>{props.title}</label>
      </div>
    );
  });
