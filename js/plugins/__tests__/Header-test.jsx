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
import {act} from 'react-dom/test-utils';
import {Header} from '../Header';

describe('Header', () => {
    let container;
    beforeEach(() => {
        // The deployed header owns rendering/layout inside this custom element.
        // Register a local element so tests never fetch the production CDN script.
        if (!customElements.get('geor-header')) {
            customElements.define('geor-header', class extends HTMLElement {});
        }
        container = document.createElement('div');
        document.body.appendChild(container);
    });
    afterEach(() => {
        act(() => ReactDOM.unmountComponentAtNode(container));
        container.remove();
    });
    const render = props => {
        act(() => ReactDOM.render(<Header {...props}/>, container));
        return container.querySelector('geor-header');
    };

    it('renders the geOrchestra header with its default application', () => {
        const header = render({});
        expect(header.getAttribute('active-app')).toBe('mapstore');
        expect(header.getAttribute('legacy-url')).toBe('/header/');
        expect(container.querySelectorAll('#georchestra-header').length).toBe(1);
    });
    it('passes height changes to the header component', () => {
        render({height: 90});
        expect(render({height: 200}).getAttribute('height')).toBe('200');
    });
    it('retains the legacy header URL and mode', () => {
        const header = render({url: '/custom-header/', legacy: true});
        expect(header.getAttribute('legacy-url')).toBe('/custom-header/');
        expect(header.getAttribute('legacy-header')).toBe('true');
    });
    it('selects the current application without rewriting the legacy URL', () => {
        const header = render({page: 'currentpage', url: '/header/'});
        expect(header.getAttribute('active-app')).toBe('currentpage');
        expect(header.getAttribute('legacy-url')).toBe('/header/');
    });
    it('forwards branding and configuration from the deployment', () => {
        const header = render({logoUrl: '/logo.svg', stylesheet: '/brand.css', configFile: '/header.json'});
        expect(header.getAttribute('logo-url')).toBe('/logo.svg');
        expect(header.getAttribute('stylesheet')).toBe('/brand.css');
        expect(header.getAttribute('config-file')).toBe('/header.json');
    });
});
