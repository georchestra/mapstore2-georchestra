/*
* Copyright 2019, GeoSolutions Sas.
* All rights reserved.
*
* This source code is licensed under the BSD-style license found in the
* LICENSE file in the root directory of this source tree.
*/

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { compose } from 'recompose';

import ContextGridComponent from '@mapstore/plugins/contextmanager/ContextGrid';

import { userSelector } from '@mapstore/selectors/security';
import { deleteContext, reloadContexts} from '@mapstore/actions/contextmanager';
import { updateAttribute } from '@mapstore/actions/maps';


const Grid = compose(
    connect(createStructuredSelector({
        user: userSelector
    }), {
        onDelete: deleteContext,
        reloadContexts,
        onUpdateAttribute: updateAttribute
    }),
)(ContextGridComponent);

export default Grid;
