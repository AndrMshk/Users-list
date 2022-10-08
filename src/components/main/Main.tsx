import React from 'react';
import container from '../../common/styles/container.module.scss';
import style from './main.module.scss';
import { Button } from '../../common/components/button/Button';

export const Main = () => {
  return (
    <div className={`${container.container} ${style.wrapper}`}>
      <div className={style.content}>
        <h1>Test assignment for front-end developer </h1>
        <p>
          What defines a good front-end developer is one that has skilled knowledge of HTML,
          CSS, JS with a vast understanding of User design thinking as they'll be
          building web interfaces with accessibility in mind. They should also be excited to learn,
          as the world of Front-End Development keeps evolving.
        </p>
        <a href="#form"><Button title="Sign up" /></a>
      </div>
    </div>
  );
};
