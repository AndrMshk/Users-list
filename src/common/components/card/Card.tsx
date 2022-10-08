import React, { FC, useState } from 'react';
import style from './card.module.scss';
import ava from '../../../assets/ava.svg';
import { Tooltip } from '../tooltip/Tooltip';

type CardPropsType = {
  email: string
  name: string
  phone: string
  photo: string
  position: string
  registration_timestamp: number
}

export const Card: FC<CardPropsType> = ({ name, phone, email, photo, position }) => {

  const [img, setImg] = useState(photo);

  return (
    <div className={style.card}>
      <img src={img ? img : ava} alt="avatar" onError={() => {setImg(ava);}} />
      <div className={style.name} data-tooltip={name}>
        <Tooltip text={name} />
      </div>
      <div className={style.description}>
        <div className={style.profession}>
          {position}
        </div>
        <div className={style.email} data-tooltip={email}>
          <Tooltip text={email} />
        </div>
        <div className={style.phone}>+{+phone}</div>
      </div>
    </div>
  );
};

