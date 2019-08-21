import React, { Component, useEffect, useState } from 'react';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { connect } from 'react-redux';

//service
import { xrmService } from '../../services/xrmAPI';

//actions
import { fetchSyncGroupInfo } from '../../actions/sync-group';

const SyncGroupInfo = (props) => {
    const {
        fetchSyncGroupInfo,
        data
    } = props;

    useEffect(() => {
        let syncGroupId = window.parent.Xrm && window.parent.Xrm.Page.data.entity.attributes.get('demo_syncgroupid').getValue()[0].id.slice(1, -1);
        // let response = await xrmService.getSyncGroupInfo(syncGroupId);
        fetchSyncGroupInfo(syncGroupId);
    }, [])

    console.log(data);
    return (
        <div>
            <h4>{data.length && data[0]['source.demo_name']} <ArrowForwardIos/> {data.length && data[0]['destination.demo_name']}</h4>
        </div>
    )
}

let mapStateToProps = ({ syncGroupState }) => ({
    data: syncGroupState.data
});

export default connect(mapStateToProps, { fetchSyncGroupInfo })(SyncGroupInfo);
