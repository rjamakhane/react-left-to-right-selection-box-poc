import {
    FETCH_FIELDS_RELATED_TO_OBJECT,
    FETCH_SELECTED_FIELDS_OF_OBJECT_SYNCH,
    ADD_FIELD,
    REMOVE_FIELD,
    UPDATE_FIELDS,
    UPDATE_ADDED_FIELDS,
    UPDATE_REMOVED_FIELDS,
    UPDATE_SAVE_BUTTON_STATUS
} from '../constants';

//service 
import { xrmService } from '../services/xrmAPI';
import { UtilService } from '../services/utilService';
let sampleFields = {};
sampleFields.entities = [
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
        "demo_fieldmetadataid": "a7a0b776-f18c-e911-sa966-000d3a4e890b",
        "demo_displayname": "Amendment Effective Date",
        "_demo_objectid_value@OData.Community.Display.V1.FormattedValue": "ord_Order",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "demo_ObjectId",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "demo_objectmetadata",
        "_demo_objectid_value": "ab8ed37a-e88c-e911-a96e-000d3a4e8d41"
    },
    {
        "@odata.etag": "W/\"39172232\"",
        "demo_fieldmetadataid": "a7a0b776-f18c-e911-a9d66-000d3a4e890b",
        "demo_displayname": "Amendment Effective Date",
        "_demo_objectid_value@OData.Community.Display.V1.FormattedValue": "ord_Order",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "demo_ObjectId",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "demo_objectmetadata",
        "_demo_objectid_value": "ab8ed37a-e88c-e911-a96e-000d3a4e8d41"
    },
    {
        "@odata.etag": "W/\"39172232\"",
        "demo_fieldmetadataid": "a7a0b776-fs18c-e911-a966-000d3a4e890b",
        "demo_displayname": "Amendment Effective Date",
        "_demo_objectid_value@OData.Community.Display.V1.FormattedValue": "ord_Order",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "demo_ObjectId",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "demo_objectmetadata",
        "_demo_objectid_value": "ab8ed37a-e88c-e911-a96e-000d3a4e8d41"
    },
    {
        "@odata.etag": "W/\"39172232\"",
        "demo_fieldmetadataid": "a7a0b776-f1w8c-e911-a966-000d3a4e890b",
        "demo_displayname": "Amendment Effective Date",
        "_demo_objectid_value@OData.Community.Display.V1.FormattedValue": "ord_Order",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "demo_ObjectId",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "demo_objectmetadata",
        "_demo_objectid_value": "ab8ed37a-e88c-e911-a96e-000d3a4e8d41"
    },
    {
        "@odata.etag": "W/\"39172232\"",
        "demo_fieldmetadataid": "a7a0b776-f318c-e911-a966-000d3a4e890b",
        "demo_displayname": "Amendment Effective Date",
        "_demo_objectid_value@OData.Community.Display.V1.FormattedValue": "ord_Order",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "demo_ObjectId",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "demo_objectmetadata",
        "_demo_objectid_value": "ab8ed37a-e88c-e911-a96e-000d3a4e8d41"
    },
    {
        "@odata.etag": "W/\"39172232\"",
        "demo_fieldmetadataid": "a7a0b776-f218c-e911-a966-000d3a4e890b",
        "demo_displayname": "Amendment Effective Date",
        "_demo_objectid_value@OData.Community.Display.V1.FormattedValue": "ord_Order",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "demo_ObjectId",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "demo_objectmetadata",
        "_demo_objectid_value": "ab8ed37a-e88c-e911-a96e-000d3a4e8d41"
    },
    {
        "@odata.etag": "W/\"39172232\"",
        "demo_fieldmetadataid": "a7a0b776-f18c-e911-a966-0002d3a4e890b",
        "demo_displayname": "Amendment Effective Date",
        "_demo_objectid_value@OData.Community.Display.V1.FormattedValue": "ord_Order",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "demo_ObjectId",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "demo_objectmetadata",
        "_demo_objectid_value": "ab8ed37a-e88c-e911-a96e-000d3a4e8d41"
    },
    {
        "@odata.etag": "W/\"39172232\"",
        "demo_fieldmetadataid": "a7a20b776-f18c-e911-a966-000d3a4e890b",
        "demo_displayname": "Amendment Effective Date",
        "_demo_objectid_value@OData.Community.Display.V1.FormattedValue": "ord_Order",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "demo_ObjectId",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "demo_objectmetadata",
        "_demo_objectid_value": "ab8ed37a-e88c-e911-a96e-000d3a4e8d41"
    },
    {
        "@odata.etag": "W/\"39172232\"",
        "demo_fieldmetadataid": "a7a0b776-f18c-e911-a9626-000d3a4e890b",
        "demo_displayname": "Amendment Effective Date",
        "_demo_objectid_value@OData.Community.Display.V1.FormattedValue": "ord_Order",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "demo_ObjectId",
        "_demo_objectid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "demo_objectmetadata",
        "_demo_objectid_value": "ab8ed37a-e88c-e911-a96e-000d3a4e8d41"
    },
    {
        "@odata.etag": "W/\"39172232\"",
        "demo_fieldmetadataid": "a72a0b776-f18c-e911-a966-000d3a4e890b",
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
    },
    {
        "@odata.etag": "W/\"39172231\"",
        "demo_fieldsyncid": "6381a147-6ca1-e911-a968-000d3a4e81",
        "fm.demo_fieldmetadataid": "a7a0b776-f18c-e911-a966-000d3a4e890b",
        "fm.demo_displayname": "Amendment Effective Date",
    }
];

export const updateAddedFields = (data) => async dispatch => {
    dispatch({
        type: UPDATE_ADDED_FIELDS,
        payload: data
    });
}

export const updateFields = (data) => async dispatch => {
    dispatch({
        type: UPDATE_FIELDS,
        payload: data
    });
}

export const updateRemovedFields = (data) => async dispatch => {
    dispatch({
        type: UPDATE_REMOVED_FIELDS,
        payload: data
    });
}

export const updateSaveButtonStatus = (flag) => async dispatch => {
    dispatch({
        type: UPDATE_SAVE_BUTTON_STATUS,
        payload: flag
    });
}

export const fetchFieldsRelatedToObjectId = (id) => async dispatch => {
    const { entities } = await xrmService.getFieldsRelatedToObjectId(id);
    // const { entities } = sampleFields;
    dispatch({
        type: FETCH_FIELDS_RELATED_TO_OBJECT,
        payload: entities
    });
}

export const fetchSlectedFieldsByObjectId = (id) => async dispatch => {
    const { entities } = await xrmService.getFieldsSynchByObjectSynchId(id);
    // const { entities } = selectedFields;
    let parsedSelectedFields = UtilService.parseFetchedSelectedFields(entities);
    dispatch({
        type: FETCH_SELECTED_FIELDS_OF_OBJECT_SYNCH,
        payload: { entities, parsedSelectedFields }
    });
}






