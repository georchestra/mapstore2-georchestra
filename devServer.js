const port = process.env.MAPSTORE_BACKEND_PORT || 8080;
const protocol = process.env.MAPSTORE_BACKEND_PROTOCOL || "http";
const host = process.env.MAPSTORE_BACKEND_HOST || "localhost";
const GEORCHESTRA_BACKEND_BASE_URL = process.env.GEORCHESTRA_BACKEND_BASE_URL || (protocol + "://" + host + ":" + port);
const MAPSTORE_BACKEND_BASE_URL = process.env.MAPSTORE_BACKEND_BASE_URL || GEORCHESTRA_BACKEND_BASE_URL;
const MAPSTORE_BACKEND_BASE_PATH = process.env.MAPSTORE_BACKEND_BASE_PATH || "/mapstore";
const MAPSTORE_BACKEND_URL = process.env.MAPSTORE_BACKEND_URL || MAPSTORE_BACKEND_BASE_URL + MAPSTORE_BACKEND_BASE_PATH;
var matches = MAPSTORE_BACKEND_URL.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
var domain = matches && matches[1];

const devServer = {
    proxy: {
        "/rest": {
            target: `${MAPSTORE_BACKEND_URL}`,
            secure: false,
            headers: {
                host: `${domain}`,
                // change those for your local instance
                "sec-username": 'admin',
                "sec-roles": 'ADMIN'
            }
        },
        "/?login": {

        },
        "/favicon.ico": {
            target: `${GEORCHESTRA_BACKEND_BASE_URL}`
        },
        "/login": {
            target: `${GEORCHESTRA_BACKEND_BASE_URL}`,
            secure: false,
            headers: {
                changeOrigin: true,
                host: `${domain}`
            },
            // This handles the redirects
            onProxyRes: function(proxyRes, req, res) {
                if ([301, 302, 307, 308].indexOf(proxyRes.statusCode) > -1 && proxyRes.headers.location) {
                    const originalUrl = new URL(req.originalUrl, req.protocol + '://' + req.headers.host);
                    const redirectLocation = new URL(proxyRes.headers.location);

                    // Rewrite the location to devServer origin and the path + query string + hash from response
                    proxyRes.headers.location = originalUrl.origin + "/login" + redirectLocation.search + redirectLocation.hash;
                }
            }
        },
        "/pdf": {
            target: `${MAPSTORE_BACKEND_URL}`,
            secure: false,
            headers: {
                host: `${domain}`
            }
        },
        "/mapstore/pdf": {
            target: `${MAPSTORE_BACKEND_BASE_URL}`,
            secure: false,
            headers: {
                host: `${domain}`
            }
        },
        "/proxy": {
            // proxy of geOrchestra is already configured
            target: `${MAPSTORE_BACKEND_URL}`,
            secure: false,
            headers: {
                host: `${domain}`
            }
        },
        "/geonetwork": {
            target: `${GEORCHESTRA_BACKEND_BASE_URL}/geonetwork`,
            secure: false,
            headers: {
                host: `${domain}`
            }
        },
        "/header": {
            target: `${MAPSTORE_BACKEND_BASE_URL}`,
            secure: false,
            headers: {
                host: `${domain}`
            }
        },
        "/cas": {
            target: `${MAPSTORE_BACKEND_BASE_URL}`,
            secure: false,
            headers: {
                host: `${domain}`
            }
        },
        "/whoami": {
            target: `${GEORCHESTRA_BACKEND_BASE_URL}`,
            secure: false,
            headers: {
                host: `${domain}`,
                // change those for your local instance
                "sec-username": 'testadmin',
                "sec-roles": 'ROLE_MAPSTORE_ADMIN'
            }
        }
    }
};
module.exports = {
    devServer,
    devtool: undefined
};
