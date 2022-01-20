import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Grid from '@mui/material/Grid';

import { Props } from 'types';
import { AppContext, actions } from 'context/App';
import { loadLocaleMessages, locales } from 'utils/i18n';

const TopBar: React.FC<Props> = () => {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [openLanguageOptions, setOpenLanguageOptions] = React.useState(false);
  const {
    appSettings: { locale: selectedLocale },
    dispatch: contextDispatch
  } = React.useContext(AppContext);

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
    <AppBar position="static">
      <Toolbar>
        <Grid container={true} spacing={12}>
          <Grid item xs={10}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <FormattedMessage id="app-title" />
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button" fullWidth>
              <Button>{options.find((option) => option.value === selectedLocale)?.label}</Button>
              <Button
                type="button"
                size="small"
                aria-controls={openLanguageOptions ? 'split-button-menu' : undefined}
                aria-expanded={openLanguageOptions ? 'true' : undefined}
                aria-label="language-button"
                aria-haspopup="menu"
                onClick={handleToggle}
                sx={{
                  maxWidth: 50
                }}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
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
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default React.memo(TopBar);