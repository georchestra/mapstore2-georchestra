/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import {connect} from "react-redux";
import Page from "@mapstore/containers/Page";

const AdminPage = ({plugins, match, role}) => {
    return (<Page
        id={role === "ADMIN" ? "admin" : "notallowed"}
        mode="desktop"
        plugins={plugins}
        params={match.params}
    />);
};

export default connect(state => ({
    role: state.security && state.security.user && state.security.user.role || 'GUEST'
}))(AdminPage);
