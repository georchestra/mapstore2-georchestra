/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from "react";
import {connect} from "react-redux";

const AdminPage = () => {
    // redirect to manager page
    useEffect(() => {
        window.location.hash = '#/manager/';
    }, []);
    return (<div>redirecting...</div>);
};

export default connect(state => ({
    role: state.security && state.security.user && state.security.user.role || 'GUEST'
}))(AdminPage);
