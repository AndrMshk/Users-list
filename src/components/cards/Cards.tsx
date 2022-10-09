import React from 'react';
import container from '../../common/styles/container.module.scss';
import style from './cards.module.scss';
import { Card } from '../../common/components/card/Card';
import { Button } from '../../common/components/button/Button';
import { useAppDispatch, useAppSelector } from '../../bll/store';
import { setUsersPageAction } from '../../bll/usersReducer';

export const Cards = () => {

  const { currentPage, totalUsersCount, users } = useAppSelector(state => state.users);

  const dispatch = useAppDispatch();

  return (
    <div id="users" className={`${container.container} ${style.wrapper}`}>
      <h1>Working with GET request</h1>
      <div className={style.cards}>
        {users.map(user => <Card key={user.id} {...user} />)}
      </div>
      {currentPage !== Math.ceil(totalUsersCount / 6) &&
      <Button title="Show more" onClick={() => {dispatch(setUsersPageAction(currentPage + 1));}} />}
    </div>
  );
};
