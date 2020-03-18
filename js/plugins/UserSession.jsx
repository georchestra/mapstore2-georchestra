/*
 * Copyright 2020, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import {connect} from "react-redux";
import {createPlugin} from "@mapstore/utils/PluginsUtils";
import usersession from "@mapstore/reducers/usersession";
import {saveUserSessionEpic, autoSaveSessionEpic, loadUserSessionEpic, removeUserSessionEpic,
    reloadOriginalConfigEpic} from "../epics/usersession";
import Message from "@mapstore/components/I18N/Message";
import {Glyphicon} from "react-bootstrap";
import {toggleControl} from "@mapstore/actions/controls";
import {removeUserSession} from "@mapstore/actions/usersession";
import ConfirmModal from "@mapstore/components/resources/modals/ConfirmModal";

const ResetUserSession = connect((state) => ({
    enabled: state?.controls?.resetUserSession?.enabled ?? false
}), {
    onClose: toggleControl.bind(null, 'resetUserSession', null),
    onConfirm: removeUserSession
})(({enabled = false, onClose, onConfirm}) => {
    const confirm = () => {
        onClose();
        onConfirm();
    };

    return (<ConfirmModal onClose={onClose}
        onConfirm={confirm} show={enabled} buttonSize="large">
        <Message msgId="userSession.confirmRemove"/></ConfirmModal>);
});

const hasSession = (state) => state?.usersession?.session;

export default createPlugin('UserSession', {
    component: ResetUserSession,
    containers: {
        BurgerMenu: {
            name: 'UserSession',
            position: 1500,
            text: <Message msgId="userSession.remove" />,
            icon: <Glyphicon glyph="trash" />,
            action: toggleControl.bind(null, 'resetUserSession', null),
            selector: (state) => {
                return { style: hasSession(state) ? {} : {display: "none"} };
            },
            priority: 2,
            doNotHide: true
        }
    },
    reducers: {
        usersession
    },
    epics: {
        saveUserSessionEpic, autoSaveSessionEpic, loadUserSessionEpic, removeUserSessionEpic, reloadOriginalConfigEpic
    }
});
