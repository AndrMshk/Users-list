import React, { FC, useState } from 'react';
import style from './upload.module.scss';
import classnames from 'classnames';

type UploadPropsType = {
  error?: string
  file: File | null
  setFile: (file: File | null) => void
  setError: (errorMessage: string) => void
  clearErrors: () => void
}

export const Upload: FC<UploadPropsType> = ({ file, setFile, error, setError, clearErrors }) => {

  const onChangeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const photo = e.target.files[0];
      const img = new Image();
      img.src = URL.createObjectURL(photo);
      img.onload = () => {
        if (img.width < 70 && img.height < 70) {
          setError('Minimum size of photo 70x70px');
          return;
        } else {clearErrors();}
        if (photo.type !== 'image/jpeg' && photo.type !== 'image/jpg') {
          setError('Invalid image');
        } else if (photo.size >= 5242880) {
          setError('To big image size');
        } else {
          setFile(photo);
          clearErrors();
        }
      };
    }
  };

  return (
    <div className={style.main}>
      <label htmlFor="file-upload" className={style.wrapper}>
        <div className={classnames(style.button, { [style.errorButton]: error })}>
          <div>Upload</div>
        </div>
        <div className={classnames(style.fileName, { [style.errorFileName]: error })}>
          <div className={classnames({ [style.empty]: file })}>
            {file ? file.name : 'Upload your photo'}
          </div>
        </div>
        <input
          required
          accept=".jpeg,.jpg"
          type="file"
          id="file-upload"
          onChange={onChangeFileHandler} />
      </label>
      {error && <div className={style.errorMessage}>{error}</div>}
    </div>
  );
};


