/**
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from "../Header";


describe('Header', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="wrapper"><iframe id="georchestra-header"></iframe><div id="container"></div></div>';
        setTimeout(done);
    });

    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("wrapper"));
        document.body.innerHTML = '';
        setTimeout(done);
    });

    it('Header does not render', () => {
        const header = ReactDOM.render(<Header />, document.getElementById("container"));
        expect(header).toNotExist();
    });

    it('Header changes the header heignt', (done) => {
        const header = ReactDOM.render(<Header ignoreIFrame height={200} />, document.getElementById("container"));
        expect(header).toNotExist();
        setTimeout(() => {
            try {
                expect(document.getElementById("georchestra-header").style.height).toBe("200px");
            } catch(e) {
                done(e);
            }
            done();
        });
    });

    it('Header changes the container position', (done) => {
        const header = ReactDOM.render(<Header ignoreIFrame height={200} />, document.getElementById("container"));
        expect(header).toNotExist();
        setTimeout(() => {
            try {
                expect(document.getElementById("container").style.top).toBe("200px");
            } catch(e) {
                done(e);
            }
            done();
        });
    });

    it('Header changes the header src', (done) => {
        const header = ReactDOM.render(<Header ignoreIFrame url="http://testurl" />, document.getElementById("container"));
        expect(header).toNotExist();
        setTimeout(() => {
            try {
                expect(document.getElementById("georchestra-header").src).toContain("testurl");
            } catch(e) {
                done(e);
            }
            done();
        });
    });

    it('Header appends the current page id to src', (done) => {
        const header = ReactDOM.render(<Header ignoreIFrame page="currentpage" />, document.getElementById("container"));
        expect(header).toNotExist();
        setTimeout(() => {
            try {
                expect(document.getElementById("georchestra-header").src).toContain("currentpage");
            } catch(e) {
                done(e);
            }
            done();
        });
    });
});
