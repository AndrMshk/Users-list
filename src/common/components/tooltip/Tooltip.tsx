import React, { FC } from 'react';
import style from './tooltip.module.scss';

type TooltipPropsType = {
  text: string
}

export const Tooltip: FC<TooltipPropsType> = ({ text }) => {
  return <div className={style.tooltip} data-tooltip={text}>{text}</div>;
};

