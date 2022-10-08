import React from 'react';
import style from './preloader.module.scss';

export const Preloader = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.spinner} />
    </div>
  );
};
