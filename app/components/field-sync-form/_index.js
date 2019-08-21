import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import Fab from '@material-ui/core/Fab';
import { Add, Remove, ArrowBack, ArrowForward } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


//component
import ObjectFields from './objectFields';

//hoc
import WithSearch from '../../hoc/withSearch';

//services
import { xrmService } from '../../services/xrmAPI';

//style
import './style.scss';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'left',
        color: theme.palette.text.secondary,
        minHeight: '400px',
        maxHeight: '400px',
        overflow: 'scroll'
    },
}));

function ObjectFieldForm(props) {
    const { searchItem } = props;

    const classes = useStyles();

    const [allFields, setAllFields] = useState([]);////all available fields
    const [fields, setFields] = useState(allFields); //filtered  fields
    const [addedFields, setAddedFields] = useState([]); //field user selected
    const [addField, setAddField] = useState(null);  //field user selected to move from arrow buttons
    const [removeField, setRemoveField] = useState(null); //field user selected to move from arrow buttons
    const [selectedId, setSelectedId] = useState(null); //id to make field highlighter

    function getUnusedFields() {
        let availableFields = [...allFields];
        _.forEach(addedFields, (item) => {
            _.remove(availableFields, { demo_fieldmetadataid: item.demo_fieldmetadataid });
        })

        return availableFields;
    }

    async function initalizeData() {
        let objectSynchId = window.parent.Xrm.Page.data.entity.getId();
        //all the fields sync data which is already saved
        let fieldSynchResponse = await xrmService.getFieldsSynchByObjectSynchId(objectSynchId);
        let addedFieldsData;
        if (fieldSynchResponse.entities.length) {
            addedFieldsData = _.map(fieldSynchResponse.entities, (item) => {
                return {
                    "demo_fieldmetadataid": item["fm.demo_fieldmetadataid"],
                    "demo_displayname": item["fm.demo_displayname"],
                    "demo_name": item["fm.demo_name"],
                    "demo_fieldsyncid": item.demo_fieldsyncid
                }
            });
            setAddedFields(addedFieldsData);
            filterItems();
        }

        let responseData = await xrmService.getFieldsRelatedToObjectId(objectSynchId);
        let unUsedFields = [...responseData.entities];
        setAllFields(responseData.entities);
        _.forEach(addedFieldsData, (item) => {
            item.demo_fieldmetadataid && _.remove(unUsedFields, { demo_fieldmetadataid: item.demo_fieldmetadataid })
        });
        filterItems(unUsedFields);
    }

    function initalizeDataDemoData() {
        let sampleFields = [
            {
                "@odata.etag": "W/\"39172231\"",
                "demo_fieldmetadataid": "a5a0b776-f18c-e911-a966-000d3a4e890b",
                "demo_displayname": "Activated Date",
                "_demo_objectid_value@OData.Community.Display.V1.FormattedValue": "ord_Order",
                "_demo_objectid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "demo_ObjectId",
                "_demo_objectid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "demo_objectmetadata",
                "_demo_objectid_value": "ab8ed37a-e88c-e911-a96e-000d3a4e8d41"
            },
            {
                "@odata.etag": "W/\"39172232\"",
                "demo_fieldmetadataid": "a7a0b776-f18c-e911-a966-000d3a4e890b",
                "demo_displayname": "Amendment Effective Date",
                "_demo_objectid_value@OData.Community.Display.V1.FormattedValue": "ord_Order",
                "_demo_objectid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "demo_ObjectId",
                "_demo_objectid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "demo_objectmetadata",
                "_demo_objectid_value": "ab8ed37a-e88c-e911-a96e-000d3a4e8d41"
            }
        ];
        let selectedFields = {};
        selectedFields.entities = [
            {
                "@odata.etag": "W/\"39172231\"",
                "demo_fieldsyncid": "6381a147-6ca1-e911-a968-000d3a4e8",
                "fm.demo_fieldmetadataid": "a5a0b776-f18c-e911-a966-000d3a4e890b",
                "fm.demo_displayname": "Activated Date"
            }
        ];
        let fieldSynchResponse = selectedFields;
        let addedFieldsData;

        if (fieldSynchResponse.entities.length) {
            addedFieldsData = _.map(fieldSynchResponse.entities, (item) => {
                return {
                    "demo_fieldmetadataid": item["fm.demo_fieldmetadataid"],
                    "demo_displayname": item["fm.demo_displayname"],
                    "demo_name": item["fm.demo_name"],
                    "demo_fieldsyncid": item.demo_fieldsyncid
                }
            });
            setTimeout(() => {
                setAddedFields(addedFieldsData);
                filterItems();
            }, 400)
        }

        setTimeout(() => {
            let unUsedFields = [...sampleFields];
            setAllFields(sampleFields);
            _.forEach(addedFieldsData, (item) => {
                item.demo_fieldmetadataid && _.remove(unUsedFields, { demo_fieldmetadataid: item.demo_fieldmetadataid })
            });
            filterItems(unUsedFields);
        }, 500)
    }

    useEffect(() => {
        initalizeDataDemoData();
        // initalizeData();
    }, []);

    useEffect(() => {
        filterItems();
    }, [searchItem]);

    function filterItems(items) {
        let filteredFields = _.filter(((items && items.length) ? items : getUnusedFields()), (item) => {
            return `${item.demo_displayname}`.toUpperCase().indexOf(searchItem.toUpperCase()) >= 0;
        });
        setFields(filteredFields);
    }

    function addItem(id) {
        let addedItem = _.remove(fields, { demo_fieldmetadataid: id });
        setFields([...fields]);
        setAddedFields([...addedItem, ...addedFields]);
        setSelectedId(null);
    }

    function removeItem(id) {
        let removedItem = _.remove(addedFields, { demo_fieldmetadataid: id });
        setFields([...removedItem, ...fields]);
        setAddedFields([...addedFields]);
        setSelectedId(null);
    }

    return (
        <div className="fields-container">
            <Grid container justify="flext-start" alignItems="center">
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <ObjectFields
                            fields={fields}
                            selectItem={
                                (id) => {
                                    setAddField(id);
                                    setSelectedId(id);
                                }
                            }
                            addItem={addItem}
                            selectedId={selectedId}
                            icon={
                                (id) => (
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
                        <ObjectFields
                            fields={addedFields}
                            selectItem={
                                (id) => {
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

export default WithSearch(ObjectFieldForm);
