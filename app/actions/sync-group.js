import { FETCH_SYNC_GROUP_INFO } from '../constants';

import {xrmService} from '../services/xrmAPI';



export const fetchSyncGroupInfo = (syncGroupId) => async dispatch => {
    const { entities } = await xrmService.getSyncGroupInfo(syncGroupId);;
    dispatch({
        type: FETCH_SYNC_GROUP_INFO,
        payload: entities
    })
};