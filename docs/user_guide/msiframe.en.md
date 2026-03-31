# msIframe

`msIframe` is a mapper for simple GET URLs used to configure MapStore2 in an iframe.

It simplifies iframe usage on external websites, for example on communication pages. It reuses a parameter style close to `sViewer`, making map iframe URLs easier to produce.

## KVP parameters

### `c` `{string}`

Context name to use for the iframe. If omitted, the configured `defaultContext` is used.

Example:

```text
http://sdi.georchestra.org/mapstore/msIframe/?c=Iframe
```

### `x` `{integer}`, `y` `{integer}`, `z` `{integer}`

Center the map on `x,y` using the context SRS units and set the zoom factor with `z`.

Example:

```text
http://sdi.georchestra.org/mapstore/msIframe/?x=-366959&y=2951352&z=5
```

### `lb` `{integer}`

Displays the background layer identified by its index. For example, `lb=0` displays the first configured background layer.
If omitted, the default background layer from the context is used.

Example:

```text
http://sdi.georchestra.org/mapstore/msIframe/?lb=1
```

### `layers` `{string}`

Comma-separated list of geOrchestra layer names with namespace.
This is the fastest way to initialize a map because it uses the catalogs defined by the context.

It assumes that:

- layers are provided by one of the context catalogs
- layers are queryable with `INFO_FORMAT=text/html`
- layers have associated HTML templates

Example:

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi
```

It is also possible to override the displayed title in the table of contents by appending `~title`:

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi~An awesome title
```

To select an alternative catalog for a layer, append `*catalogid`:

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi*localgs
```

To select an alternative style, append `**stylename` when no alternative catalog is specified, or use `layer*catalog*style`:

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi**geor_sdi
```

To add a vendor `CQL_FILTER`, append `***cql_filter` when no alternative catalog or style is specified, or use `layer*catalog*style*cql_filter`:

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi*localgs*geor_sdi*title%3DPIGMA
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi***title%3DPIGMA
```

`CQL_FILTER` values must be URL encoded.

### `s` `{string}`

This parameter performs a `GetFeature` request on the specified layer and then a `GetFeatureInfo` request by using a point taken from the geometry of the retrieved feature.

The first coordinate of the geometry of the first returned feature is reused for a standard WMS `GetFeatureInfo` request limited to the specified layer.
A `cql_filter` is required so the same filter can be applied to both the `GetFeature` and `GetFeatureInfo` requests.
If no functional filter is needed, you can use `INCLUDE`.

Use `*` to separate the layer name and the `cql_filter`.

Examples:

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi&s=geor:sdi*id%3D1
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi&s=geor:sdi*INCLUDE
```

Popup rendering issues may occur depending on layer identifier configuration. If needed, configure the identifier with `showInMapPopup` set to `false`.

## Troubleshooting

If the browser developer console shows a message similar to:

```text
Refused to display '' in a frame because it set 'X-Frame-Options' to 'deny'.
```

then the `X-Frame-Options` header needs to be hidden for MapStore requests.

For example in nginx:

```nginx
proxy_hide_header X-Frame-Options;
```
