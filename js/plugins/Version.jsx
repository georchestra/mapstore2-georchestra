/*
 * Copyright 2021, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { versionSelector } from "@mapstore/selectors/version";
import Message from "@mapstore/components/I18N/Message";
import version from "@mapstore/reducers/version";

/**
 * Version Plugin
 * Shows current GeOrchestra and MapStore submodule version in settings panel
 * @class  Version
 * @memberof plugins
 * @static
 *
 */
const Version = connect((state) => ({
    version: versionSelector(state)
}))(
    class extends React.Component {
        static propTypes = {
            version: PropTypes.string
        };

        static defaultProps = {
            version: "DEV"
        };

        renderUrl = (baseUrl, hash, type = "commit") => {
            const parse = type === "commits";
            return (<span style={{ paddingLeft: 4 }}>
                <a target="_blank" href={`${baseUrl?.replace(".git", "")}/${type}/${hash}`}>
                    {parse ? hash : `(${hash?.substr(0, 8)})`}
                </a>
            </span>);
        };

        render() {
            const [
                hashRepo = "",
                branchRepo = "",
                urlRepo = "",
                hashSubmodule = "",
                urlSubmodule = ""
                // eslint-disable-next-line no-undef
            ] = __VERSIONINFO__ || [];
            const _hashSubmodule = hashSubmodule.trim().split(" ")[0];
            const versionSubmodule = this.props.version || "";
            return (
                <table className={"application-version"}>
                    <tr>
                        <th className={" version-label"}>
                            <Message msgId="version.label" />
                        </th>
                    </tr>
                    <tr>
                        <td className={"version-modules"}>
                            <Message msgId="version.repo" />
                        </td>
                        <td>
                            <span>:
                                {this.renderUrl(urlRepo, branchRepo, "commits")}
                                {this.renderUrl(urlRepo, hashRepo)}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className={"version-modules"}>
                            <Message msgId="version.submodule" />
                        </td>
                        <td>
                            <span>:
                                {this.renderUrl(urlSubmodule, versionSubmodule, "commits")}
                                {this.renderUrl(urlSubmodule, _hashSubmodule)}
                            </span>
                        </td>
                    </tr>
                </table>
            );
        }
    }
);

import assign from "object-assign";

class Empty extends React.Component {
    render() {
        return null;
    }
}

export default {
    VersionPlugin: assign(Empty, {
        Settings: {
            tool: <Version key="version" />,
            position: 4
        }
    }),
    reducers: {
        version
    }
};
