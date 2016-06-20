import map from 'lodash/map';
import indexOf from 'lodash/indexOf';
import get from 'lodash/get';
import set from 'lodash/set';
import find from 'lodash/find';
import keys from 'lodash/keys';
import includes from 'lodash/includes';
import isNumber from 'lodash/isNumber';
import escape from 'lodash/escape';

import {
    transformData,
    enrichHeaders,
    getChartData,
    getColorPalette
} from './transformation';

import {
    colors2Object,
    numberFormat
} from 'gdc-numberjs/lib/number';

export function propertiesToHeaders(config, _headers) { // TODO export for test only
    let { headers } = enrichHeaders(_headers);
    const res = keys(config).reduce(function(result, field) {
        var fieldContent = get(config, field);
        return set(result, field, find(headers, ['uri', fieldContent]));
    }, {});
    return res;
}

export function getIndices(config, headers) { // TODO export only for test
    var headerUris = map(headers, 'uri');
    var metric = indexOf(headerUris, '/metricValues');
    var category = indexOf(headerUris, config.x);
    var series = indexOf(headerUris, config.color);

    return { metric, category, series };
}

export function isMetricNamesInSeries(config, headers) { // TODO export only for test
    return get(propertiesToHeaders(config, headers), 'color.id') === 'metricNames';
}

export function getLineFamilyChartData(config, rawData) {
    var data = transformData(rawData);

    // prepare series, categories and data
    var indices = getIndices(config, data.headers);

    // configure transformation. Sort data only if metric names not in series.
    var configuration = {
        indices,
        sortSeries: !isMetricNamesInSeries(config, data.headers)
    };

    return getChartData(data, configuration);
}

export function getLegendLayout(config, headers) { // TODO export only for test
    return (isMetricNamesInSeries(config, headers)) ? 'horizontal' : 'vertical';
}

export function getCategoryAxisLabel(config, headers) { // TODO export only for test
    return get(propertiesToHeaders(config, headers), 'x.title', '');
}

export function getMetricAxisLabel(config, headers) {
    var metrics = get(propertiesToHeaders(config, headers), 'color.metrics', []);

    if (!metrics.length) {
        return get(propertiesToHeaders(config, headers), 'y.title', '');
    } else if (metrics.length === 1) {
        return get(metrics, '0.header.title', '');
    }

    return '';
}

export function showInPercent(config, headers) { // TODO export only for test
    return includes(get(propertiesToHeaders(config, headers), 'y.format', ''), '%');
}

const unEscapeAngleBrackets = str => str && str.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

export function generateTooltipFn(options) {
    const { categoryAxisLabel } = options;
    const formatValue = (val, format) => {
        return colors2Object(numberFormat(val, format));
    };

    return function(point) {
        const formattedValue = escape(formatValue(point.y, point.format).label);
        const category = isNumber(point.category) ? '' :
            escape(unEscapeAngleBrackets(point.category));

        return `<table class="tt-values"><tr>
            <td class="title">${escape(categoryAxisLabel)}</td>
            <td class="value">${category}</td>
        </tr>
        <tr>
            <td class="title">${escape(unEscapeAngleBrackets(point.series.name))}</td>
            <td class="value">${formattedValue}</td>
        </tr></table>`;
    };
}

export var DEFAULT_COLOR_PALETTE = [
    'rgb(20,178,226)',
    'rgb(0,193,141)',
    'rgb(229,77,66)',
    'rgb(241,134,0)',
    'rgb(171,85,163)',

    'rgb(250,218,35)',
    'rgb(148,161,174)',
    'rgb(107,191,216)',
    'rgb(181,136,177)',
    'rgb(238,135,128)',

    'rgb(241,171,84)',
    'rgb(133,209,188)',
    'rgb(41,117,170)',
    'rgb(4,140,103)',
    'rgb(181,60,51)',

    'rgb(163,101,46)',
    'rgb(140,57,132)',
    'rgb(136,219,244)',
    'rgb(189,234,222)',
    'rgb(239,197,194)'
];

export function getLineFamilyChartOptions(config, data) {
    const categoryAxisLabel = getCategoryAxisLabel(config, data.headers);
    const metricAxisLabel = getMetricAxisLabel(config, data.headers);

    return {
        type: config.type,
        stacking: config.stacking,
        colorPalette: getColorPalette(data, config.colorPalette || DEFAULT_COLOR_PALETTE),
        legendLayout: getLegendLayout(config, data.headers),
        actions: {
            tooltip: generateTooltipFn({
                categoryAxisLabel
                // TODO: pass formatValue fn here
            })
        },
        title: {
            x: categoryAxisLabel,
            y: metricAxisLabel,
            yFormat: get(propertiesToHeaders(config, data.headers), 'y.format')
        },
        showInPercent: showInPercent(config, data.headers)
    };
}
