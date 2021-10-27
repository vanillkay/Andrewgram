import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import { Slide } from '@material-ui/core';
import { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { LoginForm } from 'components/common/forms/login';
import { RegisterForm } from 'components/common/forms/register';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function FullWidthTabs(props) {
  const { setIsAppear } = props;

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <LinkTab label="Авторизоваться" {...a11yProps(0)} />
          <LinkTab label="Зарегистрироваться" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={!value ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <LoginForm setIsAppear={setIsAppear} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <RegisterForm setIsAppear={setIsAppear} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  'auth-page': {
    margin: '0 auto',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'auth-page__auth-block': {
    width: '100%',
    maxWidth: '700px',
    boxSizing: 'border-box',
    borderRadius: '20px',
    paddingTop: '3rem',
  },
}));

const AuthBlock = () => {
  const classes = useStyles();
  const [isAppear, setIsAppear] = useState(false);

  useEffect(() => {
    setIsAppear(true);
  }, []);

  return (
    <Slide in={isAppear} timeout={{ enter: 1000, exit: 500 }}>
      <div className={classes['auth-page']}>
        <div className={classes['auth-page__auth-block']}>
          <FullWidthTabs setIsAppear={setIsAppear} />
        </div>
      </div>
    </Slide>
  );
};

export { AuthBlock };
