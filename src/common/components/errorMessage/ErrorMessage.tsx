import React, { FC } from 'react';
import style from './errorMessage.module.scss';
import { useAppDispatch } from '../../../bll/store';
import { setAppErrorAction } from '../../../bll/appReducer';
import classnames from 'classnames';

type ErrorMessagePropsType = {
  error?: string
}

export const ErrorMessage: FC<ErrorMessagePropsType> = ({ error }) => {

  const dispatch = useAppDispatch();

  return (
    <div className={classnames(style.overlay, { [style.open]: error })}>
      <div className={style.popup}>
        <h2>Error</h2>
        <span
          onClick={() => {dispatch(setAppErrorAction(''));}}
          className={style.close}
        >&times;
        </span>
        <div className={style.errorMessage}>{error}</div>
      </div>
    </div>
  );
};
