import React, { useEffect } from 'react';
import { Header } from './components/header/Header';
import { Main } from './components/main/Main';
import { Cards } from './components/cards/Cards';
import { Form } from './components/form/Form';
import { useAppDispatch, useAppSelector } from './bll/store';
import { Preloader } from './common/components/preloader/Preloader';
import { setPosition, setUsers } from './bll/usersReducer';
import { ErrorMessage } from './common/components/errorMessage/ErrorMessage';

export const App = () => {

  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(state => state.users.currentPage);
  const { isLoading, error } = useAppSelector(state => state.app);

  useEffect(() => {
    dispatch(setPosition());
  }, []);

  useEffect(() => {
    dispatch(setUsers({ page: currentPage, count: 6 }));
  }, [currentPage]);

  return (
    <>
      <Header />
      <Main />
      <Cards />
      <Form />
      {isLoading && <Preloader />}
      {error && <ErrorMessage error={error} />}
    </>
  );
};





