/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {createPlugin} from "@mapstore/utils/PluginsUtils";
import {connect} from "react-redux";
import User from "../components/User";
import security from "@mapstore/reducers/security";

const LoginState = connect((state) => ({
    user: state.security && state.security.user,
    error: state.security && state.security.loginError,
    bsStyle: "primary",
    className: "square-button georchestra-login"
}))(User);

const Empty = () => {
    return null;
};


export default createPlugin('Login', {
    component: Empty,
    containers: {
        OmniBar: {
            name: "login",
            position: 3,
            tool: LoginState,
            priority: 1,
            doNotHide: true
        }
    },
    reducers: {
        security
    }
});
