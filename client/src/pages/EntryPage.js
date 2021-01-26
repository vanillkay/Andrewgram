import React from 'react';
import Entry from "../components/EntryComponents/Entry";
import {makeStyles} from "@material-ui/core/styles";



const useStyles = makeStyles(() => ({
    'entry-page': {
        width: '100%',
        minHeight: '90vh',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}))

const EntryPage = () => {
    const classes = useStyles();
    return (
        <div className={classes['entry-page']}>
            <Entry/>
        </div>
    );
};

export default EntryPage;