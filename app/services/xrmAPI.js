import { Entities } from '../constants';
import axios from 'axios';

let XRMAPI = window.parent.Xrm;

let getFieldsRelatedToObjectId = async (objectSynchId) => {
    var fetchXml = `<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>  
                        <entity name='${Entities.FIELDS_META_DATA_ENTITY}'> 
                            <attribute name='demo_fieldmetadataid'/> 
                            <attribute name='demo_name'/>
                            <attribute name='demo_displayname'/> 
                            <attribute name='demo_objectid'/> 
                            <link-entity name='demo_objectsync' from='demo_objectid' to='demo_objectid' alias='os'> 
                                <filter type='and'> 
                                    <condition attribute='demo_objectsyncid' operator='eq' uitype='objectsyncid' value='${objectSynchId}' /> 
                                </filter> 
                            </link-entity> 
                        </entity> 
                    </fetch>`;
    fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
    let response = await XRMAPI.WebApi.retrieveMultipleRecords(
        Entities.FIELDS_META_DATA_ENTITY,
        fetchXml
    );

    return response;
}

let getSyncGroupInfo = async (synchGroupId) => {
    var fetchXml = `<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>  
                        <entity name='${Entities.SYNC_GROUP_ENTITY}'> 
                            <attribute name='demo_name'/>
                            <link-entity name='${Entities.CONNECTION_ENTITY}' from='demo_connectionid' to='demo_source' alias='source'> 
                                <attribute name='demo_name'/>
                            </link-entity> 
                            <link-entity name='${Entities.CONNECTION_ENTITY}' from='demo_connectionid' to='demo_destination' alias='destination'> 
                                <attribute name='demo_name'/>
                            </link-entity> 
                            <filter type='and'> 
                                <condition attribute='demo_syncgroupid' operator='eq' uitype='syncgroupid' value='${synchGroupId}' /> 
                            </filter> 
                        </entity> 
                    </fetch>`;
    fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
    let response = await XRMAPI.WebApi.retrieveMultipleRecords(
        Entities.SYNC_GROUP_ENTITY,
        fetchXml
    );
    return response;
}

let getFieldsSynchByObjectSynchId = async (objectSynchId) => {
    var fetchXml = `<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>  
                        <entity name='${Entities.FIELD_SYNC_ENTITY}'> 
                            <attribute name='demo_fieldsyncid'/> 
                            <link-entity name='${Entities.FIELDS_META_DATA_ENTITY}' to='demo_fieldid' from='demo_fieldmetadataid' alias='fm'>
                                <attribute name='demo_fieldmetadataid'/> 
                                <attribute name='demo_name'/>
                                <attribute name='demo_displayname'/> 
                            </link-entity>
                            <filter type='and'> 
                                <condition attribute='demo_objectsyncid' operator='eq' uitype='objectsyncid' value='${objectSynchId}' /> 
                            </filter> 
                        </entity> 
                    </fetch>`;
    fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
    let response = await XRMAPI.WebApi.retrieveMultipleRecords(
        Entities.FIELD_SYNC_ENTITY,
        fetchXml
    );
    return response;
}

const BulkInsertAndDeleteFieldSync = async (objectSynchId, addedItems, removedItems, cb) => {
    XRMAPI && XRMAPI.Utility.showProgressIndicator("Saving...");
    //reference -https://community.dynamics.com/crm/b/scaleablesolutionsblog/posts/web-api-bulk-operations

    if (!_.isEmpty(addedItems)) {
        let body = "";
        let entityCollection = new Array();

        _.forEach(addedItems, obj => {
            let _obj = {
                "demo_FieldId@odata.bind": `/demo_fieldmetadatas(${obj.demo_fieldmetadataid})`,
                "demo_name": obj.demo_name,
                "demo_ObjectSyncId@odata.bind": `/demo_objectsyncs(${objectSynchId.slice(1, -1)})`
            };
            entityCollection.push(JSON.stringify(_obj));
        });

        let data = [];
        data.push('--batch_123456');
        data.push('Content-Type: multipart/mixed;boundary=changeset_BBB456');
        data.push('');

        for (let i = 0; i < entityCollection.length; i++) {
            data.push('--changeset_BBB456');
            data.push('Content-Type:application/http');
            data.push('Content-Transfer-Encoding:binary');
            var id = i + 1;
            data.push('Content-ID:' + id);
            data.push('');
            data.push('POST ' + XRMAPI.Page.context.getClientUrl() + `/api/data/v8.1/${Entities.FIELD_SYNC_ENTITY}s HTTP/1.1`);
            data.push('Content-Type:application/json;type=entry');
            data.push('');
            data.push(entityCollection[i]);
        }

        data.push('--changeset_BBB456--');
        data.push('--batch_123456--');
        let payload = data.join('\r\n');
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/mixed;boundary=batch_123456',
                'Accept': 'application/json',
                'Odata-MaxVersion': '4.0',
                'Odata-Version': '4.0'
            },
            data: payload,
            url: XRMAPI.Page.context.getClientUrl() + '/api/data/v8.1/$batch',
        };
        let response = await axios(options);
    }

    if (!_.isEmpty(removedItems)) {
        var data = [];
        data.push('--batch_123456');
        data.push('Content-Type: multipart/mixed;boundary=changeset_BBB456');
        data.push('');

        let i = 0;
        _.forEach(removedItems, obj => {
            i++;
            data.push('--changeset_BBB456');
            data.push('Content-Type:application/http');
            data.push('Content-Transfer-Encoding:binary');
            data.push('Content-ID:' + i);
            data.push('');
            data.push(`DELETE ${XRMAPI.Page.context.getClientUrl()}/api/data/v8.1/${Entities.FIELD_SYNC_ENTITY}s(${obj.demo_fieldsyncid}) HTTP/1.1`);
            data.push('Content-Type:application/json;type=entry');
            data.push('');
            data.push('{}');
        });

        //end of change set
        data.push('--changeset_BBB456--');
        //end of batch
        data.push('--batch_123456--');
        let payload = data.join('\r\n');
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/mixed;boundary=batch_123456',
                'Accept': 'application/json',
                'Odata-MaxVersion': '4.0',
                'Odata-Version': '4.0'
            },
            data: payload,
            url: XRMAPI.Page.context.getClientUrl() + '/api/data/v8.1/$batch',
        };
        let response = await axios(options);
    }
    cb();

    XRMAPI && XRMAPI.Utility.closeProgressIndicator();
}

export const xrmService = {
    getFieldsRelatedToObjectId,
    getFieldsSynchByObjectSynchId,
    BulkInsertAndDeleteFieldSync,
    getSyncGroupInfo,
};