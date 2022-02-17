import React, { memo } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import { Button, Grid } from '@mui/material';
import { useIntl } from 'react-intl';

interface Props {
  children: JSX.Element;
  onClickSubmit: (values: any) => void;
  onClickBackButton: () => void;
  initialValues: any;
  validationSchema: any;
  submitButtonLabel?: string;
  backButtonLabel?: string;
}

const Form: React.FC<Props> = ({
  children,
  onClickSubmit,
  onClickBackButton,
  initialValues,
  validationSchema,
  submitButtonLabel,
  backButtonLabel
}) => {
  const { formatMessage } = useIntl();

  const submitLabel = submitButtonLabel || formatMessage({ id: 'default.submit.button.label' });
  const backLabel = backButtonLabel || formatMessage({ id: 'default.back.button.label' });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onClickSubmit(values);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <FormikForm>
          {children}
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item xs={2}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                {submitLabel}
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={onClickBackButton}
              >
                {backLabel}
              </Button>
            </Grid>
          </Grid>
        </FormikForm>
      )}
    </Formik>
  );
};

export default memo(Form);