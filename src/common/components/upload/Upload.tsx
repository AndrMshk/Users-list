import React, { FC } from 'react';
import style from './upload.module.scss';
import { ErrorOption } from 'react-hook-form';
import classnames from 'classnames';

type UploadPropsType = {
  error?: string
  file: File | null
  setFile: (file: File | null) => void
  setError: (error: ErrorOption) => void
}

export const Upload: FC<UploadPropsType> = ({ setError, file, setFile, error }) => {

  const onChangeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const photo = e.target.files[0];
      const img = new Image();
      img.src = URL.createObjectURL(photo);
      img.onload = () => {
        if (img.width < 70 && img.height < 70) {
          setError({ type: 'custom', message: 'Minimum size of photo 70x70px' });
        } else {setError({});}
      };
      if (photo.type !== 'image/jpeg' && photo.type !== 'image/jpg') {
        setError({ type: 'custom', message: 'Invalid image' });
      } else if (photo.size >= 5242880) {
        setError({ type: 'custom', message: 'To big image size' });
      } else {
        setFile(photo);
        setError({});
      }
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
          accept=".jpeg,.jpg"
          type="file"
          id="file-upload"
          onChange={onChangeFileHandler} />
      </label>
      {error && <div className={style.errorMessage}>{error}</div>}
    </div>
  );
};


