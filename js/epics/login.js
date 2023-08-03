/*
 * Copyright 2023, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {Observable} from "rxjs";
import { LOGIN_REQUIRED } from '@mapstore/actions/security';

const goToLoginPage = () => {
    window.location.replace('/?login');
};
const redirectToLoginPage = (action$) =>
    action$.ofType(LOGIN_REQUIRED)
        .switchMap(() => {
        /*
            Note: After login the user is not redirected back to the same resource requested,
            as CAS login currently doesn't support that
        */
            goToLoginPage();
            return Observable.empty();
        });

export default {
    redirectToLoginPage
};
