import React, { useState } from 'react';
import { Add, ArrowBack, ArrowForward } from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';


//component
import './style.scss';

export default function ObjectFields(props) {

    let { fields, selectItem, selectedId } = props;

    function handleSelection(id) {
        selectItem(id)
    }

    return (
        <div className="box">
            <List component="nav" aria-label="Mailbox folders">
                {
                    fields.length ? fields.map((item, index) => {
                        return (
                            <ListItem button divider key={index} onClick={() => { handleSelection(item.demo_fieldmetadataid) }} selected={selectedId === item.demo_fieldmetadataid}>
                                <ListItemText primary={item.demo_displayname} />
                                <ListItemIcon className="icons" >
                                    {props.icon(item.demo_fieldmetadataid)}
                                </ListItemIcon>
                            </ListItem>
                        )
                    }) : <p className="no-data">No Items found!</p>
                }
            </List>
        </div>
    )
}
