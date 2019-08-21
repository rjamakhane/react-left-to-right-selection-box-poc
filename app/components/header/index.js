import React, { Fragment } from 'react';

//css
import './header.scss';


const Header = (props) => {
    const { title, actions } = props;
    return (
        <Fragment>
            <div className="header">
                <h4 className="section-title">{title}</h4>
                <div class="btn-group">
                    {actions()}
                </div>
            </div>
            <div class="spacer"></div>
        </Fragment>
    )
}

export default Header;