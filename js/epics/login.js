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
import { isLoggedIn } from "@mapstore/selectors/security";

const CAS_REDIRECT_PATH = 'casRedirectPath';
const goToPage = (path) => {
    window.location.replace(path);
};
const redirectToLoginPage = (action$) =>
    action$.ofType(LOGIN_REQUIRED)
        .switchMap(() => {
            window.sessionStorage.setItem(CAS_REDIRECT_PATH, window.location.hash);
            /*
                Note: After login, the user is not redirected back to the previously requested resource as the CAS skips the hash part.
                Hence, the side effect is performed by `casRedirectOnLogin` epic to redirect back to the same resource requested
            */
            goToPage('/mapstore/?login');
            return Observable.empty();
        });

const casRedirectOnLogin = (action$, state) =>
    action$.ofType(LOCATION_CHANGE)
        .filter(({payload} = {}) => payload?.location?.pathname === '/' && window.sessionStorage.getItem(CAS_REDIRECT_PATH))
        .switchMap(() => {
            if (isLoggedIn(state.getState())) {
                const redirectPath = window.sessionStorage.getItem(CAS_REDIRECT_PATH);
                /*
                    Once the redirection is performed, redirect path is removed
                */
                window.sessionStorage.removeItem(CAS_REDIRECT_PATH);
                goToPage(redirectPath);
            } else {
                /*
                    Remove redirect path when user manually redirect and/or skips login.
                    i.e auto redirect is removed in this process to preclude any unforeseen redirections
                */
                window.sessionStorage.removeItem(CAS_REDIRECT_PATH);
            }

            return Observable.empty();
        });

export default {
    redirectToLoginPage,
    casRedirectOnLogin
};
