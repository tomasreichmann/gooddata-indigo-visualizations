import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';

import Table from './Table';
import DrillableItem from '../proptypes/DrillableItem';
import { getHeaders, getRows } from './utils/dataTransformation';
import { getSortInfo, getSortItem } from './utils/sort';

function renderDefaultTable(props) {
    return <Table {...props} />;
}

export default class TableTransformation extends Component {
    static propTypes = {
        afterRender: PropTypes.func,
        config: PropTypes.object,
        drillableItems: PropTypes.arrayOf(PropTypes.shape(DrillableItem)),
        executionRequest: PropTypes.object.isRequired, // TODO specify object
        executionResponse: PropTypes.object.isRequired, // TODO specify object
        executionResult: PropTypes.object.isRequired, // TODO specify object
        height: PropTypes.number,
        onSortChange: PropTypes.func,
        tableRenderer: PropTypes.func,
        width: PropTypes.number
    };

    static defaultProps = {
        afterRender: () => {},
        config: {},
        drillableItems: [],
        height: undefined,
        onSortChange: () => {},
        tableRenderer: renderDefaultTable,
        width: undefined
    };

    render() {
        const {
            config,
            drillableItems,
            executionRequest,
            executionResponse,
            executionResult,
            height,
            onSortChange,
            width
        } = this.props;

        const headers = getHeaders(executionResponse);
        const rows = getRows(executionResult);

        const sortItem = getSortItem(executionRequest);
        const { sortBy, sortDir } = getSortInfo(sortItem, headers);

        const tableProps = {
            ...pick(config, ['rowsPerPage', 'onMore', 'onLess', 'sortInTooltip', 'stickyHeaderOffset']),
            afterRender: this.props.afterRender,
            drillableItems,
            executionRequest,
            headers,
            onSortChange,
            rows,
            sortBy,
            sortDir
        };

        if (height) {
            tableProps.containerHeight = height;
        }

        if (width) {
            tableProps.containerWidth = width;
        }

        return this.props.tableRenderer(tableProps);
    }
}
