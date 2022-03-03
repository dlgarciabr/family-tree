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

import { Props } from 'types';
import { AppContext, actions } from 'context/App';
import { AuthenticationContext } from 'context/Authentication';
import { loadLocaleMessages, locales } from 'utils/i18n';
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

  const options = Object.values(locales);

  const changeLanguage = (newLocale: string) => {
    const newMessages = loadLocaleMessages(newLocale);
    contextDispatch({
      type: actions.LOCALE_CHANGED,
      messages: newMessages,
      locale: newLocale
    });
  };

  const handleToggle = () => {
    setOpenLanguageOptions((prevOpen) => !prevOpen);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    locale: string,
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
    user ?
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
                  {options.find((option) => option.value === selectedLocale)?.label}
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
                  disablePortal
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
                            {options.map((option) => (
                              <MenuItem
                                key={option.value}
                                disabled={option.value === selectedLocale}
                                selected={option.value === selectedLocale}
                                onClick={(event) => handleMenuItemClick(event, option.value)}
                              >
                                {option.label}
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
      :
      null
  );
};
export default React.memo(TopBar);