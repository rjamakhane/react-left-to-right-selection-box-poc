import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

//components
import FieldSyncForm from './components/field-sync-form';
import SyncGroupInfo from './components/sync-group-info';

//constant
import { PAGE_PARAMS } from './constants';

// actions
import { updatePageType } from './actions/view';

//css
import './App.scss';


const App = (props) => {
    const { updatePageType, type } = props;
    
    useEffect(() => {
        let searchString = window.location.search;
        // let searchString = `?data=type%3d${PAGE_PARAMS.SYNC_GROUP_INFO}`;
        if (searchString) {
            let vals = searchString.substr(1).split("&");
            for (let i in vals) {
                vals[i] = vals[i].replace(/\+/g, " ").split("=");
                for (var j in vals) {
                    if (vals[j][0].toLowerCase() == "data") {
                        setParameters(vals[j][1]);
                        break;
                    }
                }
            }
        }
    }, [])

    function setParameters(dataValue) {
        if (dataValue !== '') {
            var vals = new Array();
            vals = decodeURIComponent(dataValue).split("&");
            let params = {};
            console.log(vals);
            for (var i in vals) {
                let item = vals[i].replace(/\+/g, " ").split("=");
                console.log(item);
                params[item[0]] = item[1];
            }
            updatePageType(params.type);
        }
    }

    const { loader } = props;
    return (
        <div className="App">
            <LoadingOverlay
                active={loader}
                spinner
                text='Loading...'
                className="loader"
            >
                {(type === PAGE_PARAMS.FIELD_SYCH) && <FieldSyncForm />}
                {(type === PAGE_PARAMS.SYNC_GROUP_INFO) && <SyncGroupInfo />}
            </LoadingOverlay>
        </div>

    );
}

let mapStateToProps = ({ loaderState, viewState }) => ({
    loader: loaderState.loader,
    type: viewState.type
})
export default connect(mapStateToProps, { updatePageType })(App);
