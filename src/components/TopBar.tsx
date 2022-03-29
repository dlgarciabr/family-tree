import React from 'react';

import { FormattedMessage } from 'react-intl';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  AppBar,
  Toolbar,
  Typography,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Button,
  ButtonGroup,
  Grow,
  Paper,
  Popper,
  Grid
} from '@mui/material';
import { Link } from 'react-router-dom';

import { Locale, Props } from 'types';
import { AppContext, actions } from 'context/App';
import { AuthenticationContext } from 'context/Authentication';
import { locales } from 'utils/i18n';
import { Routes } from 'components/AppRoutes';

const TopBar: React.FC<Props> = () => {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [openLanguageOptions, setOpenLanguageOptions] = React.useState(false);
  const {
    appSettings: { locale: selectedLocale },
    dispatch: contextDispatch
  } = React.useContext(AppContext);

  const {
    operations: { signOut },
    state: { user }
  } = React.useContext(AuthenticationContext);

  const localeList = Object.values(locales);

  const changeLanguage = (newLocale: Locale) => {
    contextDispatch({
      type: actions.LOCALE_CHANGED,
      locale: newLocale
    });
  };

  const handleToggle = () => {
    setOpenLanguageOptions((prevOpen) => !prevOpen);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    locale: Locale,
  ) => {
    changeLanguage(locale);
    setOpenLanguageOptions(false);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpenLanguageOptions(false);
  };

  return (
    user ? (
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={0}>
            <Grid item xs={8} md={9} lg={10}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to={Routes.HOME}>
                  <FormattedMessage id="app.title" />
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={4} md={3} lg={2}>
              <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button" fullWidth>
                <Button style={{ minWidth: 150 }}>
                  {localeList.find((locale) => locale === selectedLocale)?.name}
                </Button>
                <Button
                  type="button"
                  size="small"
                  aria-controls={openLanguageOptions ? 'split-button-menu' : undefined}
                  aria-expanded={openLanguageOptions ? 'true' : undefined}
                  aria-label="language-button"
                  aria-haspopup="menu"
                  onClick={handleToggle}
                  style={{ width: 50 }}
                >
                  <ArrowDropDownIcon />
                </Button>
                <Popper
                  open={openLanguageOptions}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom' ? 'center top' : 'center bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList id="split-button-menu">
                            {localeList.map((locale) => (
                              <MenuItem
                                key={locale.value}
                                disabled={locale === selectedLocale}
                                selected={locale === selectedLocale}
                                onClick={(event) => handleMenuItemClick(event, locale)}
                              >
                                {locale.name}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </ButtonGroup>
              <Button variant="contained" onClick={() => signOut()}>
                <FormattedMessage id="signout.button.label" />
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    ) : null
  );
};
export default React.memo(TopBar);