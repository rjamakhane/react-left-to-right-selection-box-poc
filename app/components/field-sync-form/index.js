import React, { useState, useEffect, Fragment } from 'react';
import _ from 'lodash';

import FieldSyncForm from './fieldSynchForm';
import Header from '../header';
import ActionButtons from './actionButtons';

//style
import './style.scss';

const FieldsSync = (props) => {
    return (
        <Fragment>
            <Header 
                title={"Fields Sync Information"}
                actions={
                    () => (
                        <ActionButtons />
                    )
                }
            />
            <FieldSyncForm />
        </Fragment>
    )
}

export default FieldsSync;
