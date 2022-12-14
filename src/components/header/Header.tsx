import React from 'react';
import container from '../../common/styles/container.module.scss';
import style from './header.module.scss';
import logo from '../../assets/logo.png';
import { Button } from '../../common/components/button/Button';

export const Header = () => {

  return (
    <header className={`${style.wrapper}`}>
      <div className={`${container.container} ${style.content}`}>
        <img src={logo} alt="logo" />
        <nav className={style.buttonGroup}>
          <a href="#users"><Button title="Users" /></a>
          <a href="#form"><Button title="Sign up" /></a>
        </nav>
      </div>
    </header>
  );
};

