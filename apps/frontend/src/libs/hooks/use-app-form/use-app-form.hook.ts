import { joiResolver } from '@hookform/resolvers/joi';
import {
  type Control,
  type DefaultValues,
  type FieldErrors,
  type FieldValues,
  useForm,
  type UseFormHandleSubmit,
  type UseFormProps,
  type UseFormReset,
  type UseFormSetValue,
  type UseFormWatch,
  type ValidationMode
} from 'react-hook-form';

import { type ValidationSchema } from '~/libs/types/types.js';

type Parameters<T extends FieldValues = FieldValues> = {
  defaultValues: DefaultValues<T>;
  mode?: keyof ValidationMode;
  validationSchema?: ValidationSchema;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  isDirty: boolean;
  isValid: boolean;
  reset: UseFormReset<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  defaultValues,
  mode = 'onSubmit',
  validationSchema
}: Parameters<T>): ReturnValue<T> => {
  let parameters: UseFormProps<T> = {
    defaultValues,
    mode
  };

  if (validationSchema) {
    parameters = {
      ...parameters,
      resolver: joiResolver(validationSchema)
    };
  }

  const {
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    reset,
    setValue,
    watch
  } = useForm<T>(parameters);

  return {
    control,
    errors,
    handleSubmit,
    isDirty,
    isValid,
    reset,
    setValue,
    watch
  };
};

export { useAppForm };
