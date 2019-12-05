import React /* {useEffect} */ from "react";
import Page from '@mapstore/product/pages/ContextCreator';
// import ConfigUtils from "@mapstore/utils/ConfigUtils";

export default (props) => {
    /* This scauses a wrong effect with the size of the TOC, Catalog and other side panels
    // TODO: fix issues with layout and restore FeatureGrid, and remove css fixes from georchestra.less
    useEffect(() => {
        ConfigUtils.setConfigProp('mapLayout', { left: { sm: 300, md: 500, lg: 600 }, right: { md: 658 }, bottom: { sm: 130 } });
        return () => {
            ConfigUtils.setConfigProp('mapLayout', { left: { sm: 300, md: 500, lg: 600 }, right: { md: 658 }, bottom: { sm: 30 } });
        };
    }, []);
    */
    return <Page {...props}/>;
};
