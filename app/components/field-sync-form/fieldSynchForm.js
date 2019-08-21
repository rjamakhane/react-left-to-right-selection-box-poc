import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
var _ = require('lodash');

import Fab from '@material-ui/core/Fab';
import { Add, Remove, ArrowBack, ArrowForward } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

//constants
import { AVAILABLE_FIELDS, SELECTED_FIELDS } from '../../constants';


//component
import ObjectFields from './objectFields';

//hoc
import WithSearch from '../../hoc/withSearch';

//services
import { xrmService } from '../../services/xrmAPI';
import { UtilService } from '../../services/utilService';

//actions
import {
    fetchFieldsRelatedToObjectId,
    fetchSlectedFieldsByObjectId,
    updateFields,
    updateAddedFields,
    updateRemovedFields,
    updateSaveButtonStatus
} from '../../actions/field-synch';

import { updateLoader } from '../../actions/loader';

//style
import './style.scss';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'left',
        color: theme.palette.text.secondary,
        boxShadow: '0px 0px 4px 0px',
        minHeight: '450px',
        maxHeight: '450px'
    }
}));

function FieldSyncForm(props) {
    const classes = useStyles();
    const {
        searchItem,
        fetchFieldsRelatedToObjectId,
        fetchSlectedFieldsByObjectId,
        selectedFields,
        fields,
        addedFields,
        allFields,
        updateFields,
        updateAddedFields,
        updateRemovedFields,
        removedFields,
        updateLoader,
        updateSaveButtonStatus
    } = props;

    const [selectedId, setSelectedId] = useState(null);
    const [addField, setAddField] = useState(null);  //field user selected to move from arrow buttons
    const [removeField, setRemoveField] = useState(null); //field user selected to move from arrow buttons

    const resetSelection = () => {
        setSelectedId(null);
        setAddField(null);
        setRemoveField(null);
    }

    const addItem = (id) => {
        if (id) {
            let {
                fields,
                addedFields
            } = props;
            let f = [...props.fields]
            let addedItem = _.remove(f, { demo_fieldmetadataid: id });

            //if added item present in selected fields then save button should be unaffected
            if (!_.isEmpty(addedItem)) {
                let item = _.find(selectedFields, { 'fm.demo_fieldmetadataid': addedItem[0].demo_fieldmetadataid });
                if (!_.isEmpty(item)) {
                    addedItem[0].demo_fieldsyncid = item.demo_fieldsyncid;
                }
                //if adding already selected item back remove it from removedFields array
                if (!_.isEmpty(addedItem) && _.find(removedFields, { demo_fieldmetadataid: addedItem[0].demo_fieldmetadataid })) {
                    let rf = [...removedFields];
                    let fs = _.remove(rf, { demo_fieldmetadataid: addedItem[0].demo_fieldmetadataid });
                    updateRemovedFields([...rf]);
                }
                updateFields([...f]);
                updateAddedFields([...addedFields, ...addedItem]);
                resetSelection();
            }

        }
    }

    const removeItem = (id) => {
        if (id) {
            let {
                fields,
                addedFields
            } = props;
            let a = [...addedFields];
            let removedItem = _.remove(a, { demo_fieldmetadataid: id });
            if (!_.isEmpty(removedItem)) {
                //update removed fields if already added item are removed befor saving
                if (!_.isEmpty(removedItem) && removedItem[0].demo_fieldsyncid) {
                    updateRemovedFields([...removedFields, ...removedItem]);
                }
                updateFields([...removedItem, ...fields]);
                updateAddedFields([...a]);
                resetSelection();
            }
        }
    }

    const getUnusedFields = () => {
        let availableFields = [...allFields];
        _.forEach(addedFields, (item) => {
            _.remove(availableFields, { demo_fieldmetadataid: item.demo_fieldmetadataid });
        })

        return availableFields;
    }

    const filterItems = (items) => {
        let filteredFields = _.filter(((items && items.length) ? items : getUnusedFields()), (item) => {
            return `${item.demo_displayname}`.toUpperCase().indexOf(searchItem.toUpperCase()) >= 0;
        });
        updateFields(filteredFields);
        let saveButtonStatus = UtilService.enableSaveButton(addedFields, removedFields);
        updateSaveButtonStatus(!saveButtonStatus); //enable save button if chnages available

    }

    const parseAndUpdateSelectedFields = (selectedFields) => {
        let parsedSelectedFields = UtilService.parseFetchedSelectedFields(selectedFields);
        updateAddedFields([...parsedSelectedFields]);
        let unUsedFields = [...allFields];
        _.forEach(parsedSelectedFields, (item) => {
            item.demo_fieldmetadataid && _.remove(unUsedFields, { demo_fieldmetadataid: item.demo_fieldmetadataid })
        });
        filterItems(unUsedFields);
    }

    //initial load of data execute only once
    useEffect(() => {
        let objectSynchId = window.parent.Xrm && window.parent.Xrm.Page.data.entity.getId();
        updateLoader(true);
        window.parent.Xrm && window.parent.Xrm.Utility.showProgressIndicator("Loading...");
        fetchFieldsRelatedToObjectId(objectSynchId);
        fetchSlectedFieldsByObjectId(objectSynchId);
    }, []);

    //execute whenever user type in search bar
    useEffect(() => {
        filterItems();
    }, [searchItem, addedFields.length, fields.length]);

    //executes only once during initialization
    useEffect(() => {
        filterItems();
        parseAndUpdateSelectedFields(selectedFields);
        updateLoader(false);
        setTimeout(() => {
            window.parent.Xrm && window.parent.Xrm.Utility.closeProgressIndicator();
        }, 500);
    }, [allFields.length, selectedFields.length]);


    return (
        <div className="fields-container">
            <Grid container justify="flext-start" alignItems="center">
                <Grid item xs={5}>

                    <Paper className={classes.paper} >
                        <div className="paper-title">
                            <span>{AVAILABLE_FIELDS} ({fields.length})</span>
                        </div>
                        <ObjectFields
                            fields={fields}
                            selectItem={
                                (id) => {
                                    resetSelection();
                                    setAddField(id);
                                    setSelectedId(id);
                                }
                            }
                            addItem={addItem}
                            selectedId={selectedId}
                            icon={
                                (id, fields) => (
                                    <Add className="iconCls"
                                        onClick={
                                            () => {
                                                addItem(id)
                                            }}
                                    />
                                )
                            } />
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <ArrowForward
                        className="block iconCls"
                        onClick={() => { addItem(addField) }}
                    />
                    <ArrowBack
                        className="block iconCls"
                        onClick={() => { removeItem(removeField) }}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <div className="paper-title">
                            <span>{SELECTED_FIELDS} ({addedFields.length})</span>
                        </div>
                        <ObjectFields
                            fields={addedFields}
                            selectItem={
                                (id) => {
                                    resetSelection();
                                    setRemoveField(id);
                                    setSelectedId(id)
                                }
                            }
                            removeItem={removeItem}
                            selectedId={selectedId}
                            icon={
                                (id) => (
                                    <Remove className="iconCls"
                                        onClick={
                                            () => {
                                                removeItem(id)
                                            }}
                                    />
                                )
                            } />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

let mapStateToProps = ({ fieldSyncState }) => ({
    fields: fieldSyncState.fields,
    addedFields: fieldSyncState.addedFields,
    selectedFields: fieldSyncState.selectedFields,
    allFields: fieldSyncState.allFields,
    removedFields: fieldSyncState.removedFields,
});

let FieldSyncFormComponent = connect(mapStateToProps, {
    fetchFieldsRelatedToObjectId,
    fetchSlectedFieldsByObjectId,
    updateFields,
    updateAddedFields,
    updateRemovedFields,
    updateLoader,
    updateSaveButtonStatus
})(FieldSyncForm);

export default WithSearch(FieldSyncFormComponent);
