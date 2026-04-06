# How to embed a MapStore map in a website?

Embedding a map in a website is possible by integrating a MapStore context in the form of an iFrame.

## Create an iFrame with MapStore: msIframe

`msIframe` is a simple GET URL mapping mechanism used to configure MapStore2 within an iframe.

It simplifies the use of iframes on external sites, for example for communication pages. It follows a parameter logic similar to `sViewer`, making iframe URLs easier to generate.

### KVP Parameters

#### `c` `{string}`

Name of the context to use for the iframe. If not provided, the value configured in `defaultContext` is used.

Example:

```text
http://sdi.georchestra.org/mapstore/msIframe/?c=Iframe
````

#### `x` `{integer}`, `y` `{integer}`, `z` `{integer}`

Centers the map on `x,y` in the SRS units of the context and applies the zoom level `z`.

Example:

```text
http://sdi.georchestra.org/mapstore/msIframe/?x=-366959&y=2951352&z=5
```

#### `lb` `{integer}`

Displays the background layer corresponding to its index. For example, `lb=0` displays the first configured background layer.
If this parameter is not provided, the default background layer of the context is used.

Example:

```text
http://sdi.georchestra.org/mapstore/msIframe/?lb=1
```

#### `layers` `{string}`

List of geOrchestra layer names separated by commas, including their namespace.
This is the fastest way to initialize a map as it relies on the catalogs defined in the context.

This assumes that:

* the layers are provided by one of the context catalogs
* the layers are queryable with `INFO_FORMAT=text/html`
* the layers have associated HTML templates

Example:

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi
```

It is also possible to override the title displayed in the table of contents by adding `~title`:

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi~A custom title
```

To select an alternative catalog for a layer, add `*catalogid`:

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi*localgs
```

To select an alternative style, add `**stylename` when no alternative catalog is specified, or use `layer*catalog*style`:

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi**geor_sdi
```

To add a provider `CQL_FILTER`, add `***cql_filter` when no catalog or style is specified, or use `layer*catalog*style*cql_filter`:

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi*localgs*geor_sdi*title%3DPIGMA
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi***title%3DPIGMA
```

`CQL_FILTER` values must be URL-encoded.

#### `s` `{string}`

This parameter executes a `GetFeature` request on the specified layer, then a `GetFeatureInfo` request using a point extracted from the geometry of the retrieved feature.

The first coordinate of the geometry of the first returned feature is reused for a standard WMS `GetFeatureInfo` request limited to the target layer.
A `cql_filter` is required so that the same filter is applied to both the `GetFeature` and `GetFeatureInfo` requests.
If no business filter is needed, you can use `INCLUDE`.

Use `*` to separate the layer name and the `cql_filter`.

Examples:

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi&s=geor:sdi*id%3D1
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi&s=geor:sdi*INCLUDE
```

Popup display issues may occur depending on the layer identifier configuration. If necessary, configure the identifier with `showInMapPopup` set to `false`.

### Troubleshooting

If the browser developer console displays a message similar to:

```text
Refused to display '' in a frame because it set 'X-Frame-Options' to 'deny'.
```

then the `X-Frame-Options` header must be hidden for MapStore requests.

For example with nginx:

```nginx
proxy_hide_header X-Frame-Options;
```

