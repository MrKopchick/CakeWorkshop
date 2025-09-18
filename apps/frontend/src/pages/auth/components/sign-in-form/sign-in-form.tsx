import { Button, Input, NavLink } from '~/libs/components/components.js';
import { AppRoute, ButtonColor } from '~/libs/enums/enums.js';
import { useAppForm } from '~/libs/hooks/hooks.js';
import { UserPayloadKey } from '~/modules/user/user.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './libs/common/constants.js';
import styles from './styles.module.scss';

const SignInForm: React.FC = () => {
  const { control, errors } = useAppForm({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD
  });

  return (
    <>
      <h2 className={styles['title']}>Login to your account</h2>
      <form name="loginForm">
        <fieldset className={styles['fieldset']}>
          <Input
            control={control}
            errors={errors}
            name={UserPayloadKey.EMAIL}
            placeholder="Email"
            type="email"
          />
          <Input
            control={control}
            errors={errors}
            name={UserPayloadKey.PASSWORD}
            placeholder="Password"
            type="password"
          />
          <Button color={ButtonColor.TEAL} isFluid isPrimary type="submit">
            Sign In
          </Button>
        </fieldset>
      </form>
      <div>
        <span>New to us?</span>
        <NavLink to={AppRoute.SIGN_UP}>Sign Up</NavLink>
      </div>
    </>
  );
};

export { SignInForm };
