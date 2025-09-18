import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import { type ReactElement } from 'react';
import {
  type Control,
  type FieldPath,
  type FieldValues
} from 'react-hook-form';

import { useController } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type InputProperties<T extends FieldValues> = {
  className?: string;
  control: Control<T>;
  disabled?: boolean;
  errors?: object;
  name: FieldPath<T>;
  placeholder: string;
  rows?: number;
  type?: 'email' | 'password' | 'submit' | 'text';
};

const Input = <T extends FieldValues>({
  className,
  control,
  disabled,
  errors = {},
  name,
  placeholder,
  rows,
  type = 'text'
}: InputProperties<T>): ReactElement => {
  const { field } = useController<T>({ control, name });
  const isTextarea = Boolean(rows);

  return (
    <div className={styles['inputWrapper']}>
      <div className={styles['inputContainer']}>
        {isTextarea ? (
          <textarea
            {...field}
            className={clsx(styles['textArea'], className)}
            name={name}
            placeholder={placeholder}
            rows={rows}
          />
        ) : (
          <input
            {...field}
            className={clsx(styles['input'], className)}
            disabled={disabled}
            placeholder={placeholder}
            type={type}
          />
        )}
      </div>
      <span className={styles['errorWrapper']}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

export { Input };
