/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import loadingState from "@mapstore/components/misc/enhancers/loadingState";
const UserInfo = ({user, error}) => <span>{error && "GUEST" || user.role}</span>;
const LoadingUser = loadingState(({ user, error }) => !user && !error)(UserInfo);
const User = ({className, user, error, ...props}) => {
    return <div className={className}><LoadingUser user={user} error={error} {...props} /></div>;
};

export default User;
