msIframe - A mapper for simple GET URLs to configure MapStore2
==============================================================

Simples iFrames for MapStore2

What is msIframe ?
------------------

It allow to simplify the use of iframes on external website, an example
is communication purposes. With it, you can use pretty much the same
parameters as for sViewer, what make the map iframe’s URL generation
simpler.

KVP parameters
==============

c {string}
----------

Set the context to use for iframe. If not provided, the
``defaultContext`` config parameter is used. example :

::

   http://sdi.georchestra.org/mapstore/msIframe/?c=Iframe

x {integer} y {integer} z {integer} —————- Center the map on x,y
(context’s SRS units) and set the z zoom factor. example :

::

   http://sdi.georchestra.org/mapstore/msIframe/?x=-366959&y=2951352&z=5

lb {integer}
------------

Displays the #lb background layer. ie lb=0 displays the first preset
background layer. If not provided, the default background layer of the
context is used. example :

::

   http://sdi.georchestra.org/mapstore/msIframe/?lb=1

layers {string}
---------------

Comma-separated list of geOrchestra layer names with namespace
extension. This is the fastest way to set up a map because we use
context’s defined catalogs. It assumes :

-  layers are delivered by one of the context’s catalogs
-  layers are queryable with INFO_FORMAT=text/html
-  layers do have associated HTML templates

example :

::

   http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi

It’s also possible to specify layer’s title to use in TOC instead of
layer’s name by specify it after ~ :

::

   http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi~An awesome title

To specify alternative catalogs for a layer, add “\*catalogid” to the
layer name. example :

::

   http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi*localgs

To specify alternative styles for a layer, add “\**stylename” to the
layer name if no alternative catalog is specified, otherwise use
layer*catalog*style example :

::

   http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi**geor_sdi

To specify a vendor CQL_FILTER for a layer, add “\***cql_filter” to the
layer name if no alternative catalog or style is specified, otherwise
use layer*catalog*style*cql_filter examples :

::

   http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi*localgs*geor_sdi*title%3DPIGMA
   http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi***title%3DPIGMA

**Warming :** CQL_FILTER have to be URL encoded

s {string} (bug with popup not appearing => configure identifier with showInMapPopup to false)
----------------------------------------------------------------------------------------------

It performs a GetFeature request on the specified layer and then a
GetFeatureInfo by taking a point from the retrieved features’s geometry.
With the GetFeature request it takes the first coordinate of the
geometry of the first retrieved feature; that coordinates are then used
for an usual GFI (WMS GetFeatureInfo) request by limiting it to the
specified layer. A cql_filter is also mandatory for that action to
properly filter required data: that filter will be used in both request
(GetFeature and GFI). If you don’t need to apply a filter, you can use
the standard INCLUDE clause (cql_filter=INCLUDE) so the whole dataset
will be queried. Use a ‘\*’ to separate layer name and cql_filter.
examples :

::

   http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi&s=geor:sdi*id%3D1

Troubleshoots
=============

If you get this kind of message in the web browser’s developper console
:

   Refused to display ‘’ in a frame because it set ‘X-Frame-Options’ to
   ‘deny’.

Then you need to hide the X-Frame-Options header for MapStore’s
requests. For example, in nginx add
``proxy_hide_header X-Frame-Options;`` in the mapstore’s location block.
