import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from "./Login";
import Register from "./Register";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

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


function FullWidthTabs() {

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
                    <Tab label="Авторизоваться" {...a11yProps(0)} />
                    <Tab label="Зарегистрироваться" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>

                    <Login/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Register/>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    "auth-page": {
        margin: '0 auto',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    "auth-page__auth-block": {
        width: '90%',
        maxWidth: '600px',
        border: '3px solid #3f51b5',
        boxSizing: 'border-box',
        borderRadius: '20px',
        padding: '3rem',
        "& p": {
            marginTop: '0',
            fontSize: '2rem'
        }
    }
}));


const Auth = () => {
    const classes = useStyles();
    return (
        <div className={classes["auth-page"]}>
            <div className={classes["auth-page__auth-block"]}>
                <p>Добро пожаловать в Andrewgram</p>
                <FullWidthTabs/>
            </div>
        </div>
    );
};

export default Auth;