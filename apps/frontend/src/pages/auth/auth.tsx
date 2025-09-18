import { Image } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useCallback,
  useLocation
} from '~/libs/hooks/hooks.js';
import { authActions, type UserSignUpRequestDto } from '~/modules/auth/auth.js';

import { SignInForm, SignUpForm } from './components/components.js';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleSignUpSubmit = useCallback(
    (payload: UserSignUpRequestDto): void => {
      void dispatch(authActions.signUp(payload));
    },
    [dispatch]
  );

  const getScreen = (path: string): null | React.JSX.Element => {
    switch (path) {
      case AppRoute.SIGN_IN: {
        return <SignInForm />;
      }

      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }

      default: {
        return null;
      }
    }
  };

  return (
    <div className={styles['login']}>
      <section className={styles['form']}>
        <h2 className={styles['logoWrapper']}>
          <Image
            alt="Thread logo"
            height="75"
            isCircular
            // eslint-disable-next-line sonarjs/no-clear-text-protocols
            src="http://s1.iconbird.com/ico/2013/8/428/w256h2561377930292cattied.png"
            width="75"
          />
          Thread
        </h2>
        {getScreen(pathname)}
      </section>
    </div>
  );
};

export { Auth };
