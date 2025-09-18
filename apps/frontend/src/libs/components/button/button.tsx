import clsx from 'clsx';
import { type ReactNode } from 'react';

import { type ButtonColor } from '~/libs/enums/enums.js';
import { type ButtonType, type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type ButtonProperties = {
  children?: ReactNode;
  className?: string;
  color?: ValueOf<typeof ButtonColor>;
  isBasic?: boolean;
  isDisabled?: boolean;
  isFluid?: boolean;
  isLoading?: boolean;
  isPrimary?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
};

const Button: React.FC<ButtonProperties> = ({
  children,
  className,
  color,
  isBasic = false,
  isDisabled = false,
  isFluid = false,
  isLoading = false,
  isPrimary = false,
  onClick,
  type = 'button'
}) => {
  return (
    <button
      className={clsx(
        styles['btn'],
        isLoading && styles['loading'],
        isFluid && styles['fluid'],
        isBasic && styles['basic'],
        isPrimary && styles['primary'],
        color && styles[`btn__${color}`],
        className
      )}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export { Button };
