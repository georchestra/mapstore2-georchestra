/*
 * Copyright 2023, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {Observable} from "rxjs";
import { LOGIN_REQUIRED } from '@mapstore/actions/security';
import { LOCATION_CHANGE } from 'connected-react-router';

const CAS_REDIRECT_PATH = 'casRedirectPath';
const goToPage = (path) => {
    window.location.replace(path);
};
const redirectToLoginPage = (action$) =>
    action$.ofType(LOGIN_REQUIRED)
        .switchMap(() => {
            window.localStorage.setItem(CAS_REDIRECT_PATH, window.location.hash);
            /*
                Note: After login, the user is not redirected back to the previously requested resource as the CAS skips the hash part.
                Hence, the side effect is performed by `casRedirectOnLogin` epic to redirect back to the same resource requested
            */
            goToPage('/mapstore/?login');
            return Observable.empty();
        });

const casRedirectOnLogin = (action$) =>
    action$.ofType(LOCATION_CHANGE)
        .filter(({payload} = {}) => payload?.location?.pathname === '/' && window.localStorage.getItem(CAS_REDIRECT_PATH))
        .switchMap(() => {
            const redirectPath = window.localStorage.getItem(CAS_REDIRECT_PATH);
            /*
                Once the redirection is performed, redirect path is removed
            */
            window.localStorage.removeItem(CAS_REDIRECT_PATH);
            goToPage(redirectPath);
            return Observable.empty();
        });

export default {
    redirectToLoginPage,
    casRedirectOnLogin
};
