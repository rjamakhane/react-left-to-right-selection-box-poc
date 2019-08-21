import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';

import { xrmService } from '../../services/xrmAPI';

//actions
import { fetchFieldsRelatedToObjectId, fetchSlectedFieldsByObjectId, updateSaveButtonStatus } from '../../actions/field-synch';

const useStyles = makeStyles(theme => ({
    button: {
        height: '42px',
        borderRadius: '0'
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    },
}));

const ActionButtons = (props) => {
    const classes = useStyles();
    let XRMAPI = window.parent.Xrm;
    const {
        addedFields,
        removedFields,
        saveButtonStatus,
        fetchFieldsRelatedToObjectId,
        fetchSlectedFieldsByObjectId,
        updateSaveButtonStatus
    } = props;
    let objectSynchId = XRMAPI && XRMAPI.Page.data.entity.getId();

    const handleSubmit = () => {
        console.log("addedFields", addedFields);
        console.log("removedFields", removedFields);
        let addedItems = _.filter(addedFields, function (item) {
            return _.isEmpty(item.demo_fieldsyncid)
        });
        xrmService.BulkInsertAndDeleteFieldSync(objectSynchId, addedItems, removedFields, () => {
            fetchSlectedFieldsByObjectId(objectSynchId);
            updateSaveButtonStatus(true); //disable save button
        });

    }

    return (
        <Fragment>
            <Button size="small" className={classes.button} onClick={handleSubmit} disabled={saveButtonStatus}>
                <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
                Save
            </Button>
        </Fragment>
    )
}

let mapStateToProps = ({ fieldSyncState }) => ({
    addedFields: fieldSyncState.addedFields,
    removedFields: fieldSyncState.removedFields,
    saveButtonStatus: fieldSyncState.saveButtonStatus
});

export default connect(mapStateToProps, {fetchFieldsRelatedToObjectId, fetchSlectedFieldsByObjectId, updateSaveButtonStatus})(ActionButtons);