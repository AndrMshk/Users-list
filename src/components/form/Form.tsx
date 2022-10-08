import React, { useState } from 'react';
import { Button } from '../../common/components/button/Button';
import container from '../../common/styles/container.module.scss';
import style from './form.module.scss';
import { Upload } from '../../common/components/upload/Upload';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../bll/store';
import { RadioButton } from '../../common/components/radioButton/RadioButton';
import { createProfile } from '../../bll/usersReducer';
import { Input } from '../../common/components/input/Input';

type FormData = {
  name: string
  email: string
  phone: string
  position: string
  photo: File | null
}

export const Form = () => {

  const dispatch = useAppDispatch();

  const positions = useAppSelector(state => state.users.positions);

  const [file, setFile] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>(
    {
      mode: 'onChange',
      defaultValues: {
        name: '',
        email: '',
        phone: '',
        position: '',
        photo: null,
      },
    });

  const addPhotoHandler = () => {setValue('photo', file);};

  const onSubmit: SubmitHandler<FormData> = data => {
    addPhotoHandler();
    dispatch(createProfile(data));
    setFile(null);
    reset();
  };

  return (
    <div id="form" className={`${container.container} ${style.wrapper}`}>
      <h1>Working with POST request</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.inputs}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Required field',
              minLength: {
                value: 2,
                message: 'Username should contain 2-60 characters',
              },
              maxLength: {
                value: 60,
                message: 'Username should contain 2-60 characters',
              },
            }}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="Your name"
                {...field}
                error={errors.name?.message}
              />)} />
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Required field',
              pattern: {
                value: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                message: 'Please, enter valid email address',
              },
            }}
            render={({ field }) => (
              <Input
                type="email"
                placeholder="Email"
                {...field}
                error={errors.email?.message}
              />)} />
          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Required field',
              pattern: {
                value: /^[\+]{0,1}380([0-9]{9})$/,
                message: 'Please, enter valid phone',
              },
            }}
            render={({ field }) => (
              <Input
                type="tel"
                placeholder="Phone"
                {...field}
                error={errors.phone?.message}
                helperText={'+38 (XXX) XXX - XX - XX'} />)} />
        </div>
        <div className={style.radioButtons}>
          <p>Select your position</p>
          {positions.map(position =>
            <RadioButton
              key={position.id}
              title={position.name}
              id={position.id}
              {...register('position', { required: true })} />)}
        </div>
        <Upload
          setFile={(file) => {
            setValue('photo', file);
            setFile(file);
          }}
          setError={(error) => setError('photo', error)}
          file={file}
          error={errors.photo?.message} />
        <Button isDisabled={!isDirty || !isValid || !file} title="Sign up" isForSubmit />
      </form>
    </div>
  );
};
