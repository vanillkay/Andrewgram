import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';

import { LoginForm } from 'components/common/forms/login';
import { RegisterForm } from 'components/common/forms/register';

import { a11yProps } from '../helpers';
import { LinkTabProps, TabPanelProps } from '../types';

const TabPanel: FC<TabPanelProps> = ({ value, index, children, ...other }) => (
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

const LinkTab: FC<LinkTabProps> = (props: LinkTabProps) => (
  <Tab component="a" onClick={(event) => event.preventDefault()} {...props} />
);

const FullWidthTabs: FC<{ setIsAppear: Dispatch<SetStateAction<boolean>> }> = ({
  setIsAppear,
}) => {
  const [value, setValue] = useState<number>(0);

  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          textColor="primary"
          variant="fullWidth"
          onChange={handleChange}
          indicatorColor="primary"
          aria-label="full width tabs example"
        >
          <LinkTab label="Авторизоваться" {...a11yProps(0)} />
          <LinkTab label="Зарегистрироваться" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        index={value}
        onChangeIndex={setValue}
        axis={!value ? 'x-reverse' : 'x'}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <LoginForm setIsAppear={setIsAppear} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <RegisterForm />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export { FullWidthTabs };
