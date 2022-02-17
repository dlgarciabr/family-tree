import { useIntl } from 'react-intl';

import { signUp } from 'validations';

const useValidation = () => {
  const { formatMessage } = useIntl();

  return {
    signUpSchema: signUp(formatMessage)
  };
};

export default useValidation;