import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Grid from '@material-ui/core/Grid';

//stylese
import './search.scss';

const useStyles = makeStyles({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
});



//with hooks
const WithSearch = (WrappedComponent) => {
    return () => {
        const classes = useStyles();
        const [searchItem, setSearchItem] = useState("");
        function handleChange(e) {
            setSearchItem(e.target.value);
        }
        return (
            <div className="serach-container">
                <Grid container spacing={3} justify="flex-start" alignItems="center">
                    <Grid item xs={12} className="search-box">
                        <Paper className={classes.root}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search Fields"
                                value={searchItem}
                                onChange={handleChange}
                            />
                            <IconButton className={classes.iconButton} aria-label="Search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <WrappedComponent searchItem={searchItem}></WrappedComponent>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default WithSearch;
