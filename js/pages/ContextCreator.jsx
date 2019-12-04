import React, {useEffect} from "react";
import Page from '@mapstore/product/pages/ContextCreator';
import ConfigUtils from "@mapstore/utils/ConfigUtils";

export default (props) => {
    useEffect(() => {
        ConfigUtils.setConfigProp('mapLayout', { left: { sm: 300, md: 500, lg: 600 }, right: { md: 658 }, bottom: { sm: 130 } });
        return () => {
            ConfigUtils.setConfigProp('mapLayout', { left: { sm: 300, md: 500, lg: 600 }, right: { md: 658 }, bottom: { sm: 30 } });
        };
    }, []);
    return <Page {...props}/>;
};
