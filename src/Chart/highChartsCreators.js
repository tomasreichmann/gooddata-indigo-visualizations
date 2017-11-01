import { merge, get } from 'lodash';
import invariant from 'invariant';
import {
    DEFAULT_SERIES_LIMIT,
    DEFAULT_CATEGORIES_LIMIT,
    getCommonConfiguration
} from './highcharts/commonConfiguration';
import { getLineConfiguration } from './highcharts/lineConfiguration';
import { getBarConfiguration } from './highcharts/barConfiguration';
import { getColumnConfiguration } from './highcharts/columnConfiguration';
import { getCustomizedConfiguration } from './highcharts/customConfiguration';
import { getPieConfiguration } from './highcharts/pieConfiguration';
import { LINE_CHART, BAR_CHART, COLUMN_CHART, PIE_CHART } from '../VisualizationTypes';

const chartConfigurationMap = {
    [LINE_CHART]: getLineConfiguration,
    [BAR_CHART]: getBarConfiguration,
    [COLUMN_CHART]: getColumnConfiguration,
    [PIE_CHART]: getPieConfiguration
};

export function getHighchartsOptions(chartOptions, afm) {
    const getConfigurationByType = chartConfigurationMap[chartOptions.type];
    invariant(getConfigurationByType, `visualisation type ${chartOptions.type} is invalid (valid types: ${Object.keys(chartConfigurationMap).join(', ')}).`);
    return merge({},
        getCommonConfiguration(chartOptions, afm),
        getConfigurationByType(),
        getCustomizedConfiguration(chartOptions)
    );
}

// Deprecated in favour of getHighchartsOptions
export function getLineChartConfiguration(chartOptions, afm) {
    return merge({},
        getCommonConfiguration(chartOptions, afm),
        getLineConfiguration(),
        getCustomizedConfiguration(chartOptions)
    );
}

// Deprecated in favour of getHighchartsOptions
export function getColumnChartConfiguration(chartOptions, afm) {
    return merge({},
        getCommonConfiguration(chartOptions, afm),
        getColumnConfiguration(),
        getCustomizedConfiguration(chartOptions)
    );
}

// Deprecated in favour of getHighchartsOptions
export function getBarChartConfiguration(chartOptions, afm) {
    return merge({},
        getCommonConfiguration(chartOptions, afm),
        getBarConfiguration(),
        getCustomizedConfiguration(chartOptions)
    );
}

// Deprecated in favour of getHighchartsOptions
export function getPieChartConfiguration(chartOptions, afm) {
    return merge({},
        getCommonConfiguration(chartOptions, afm),
        getPieConfiguration(),
        getCustomizedConfiguration(chartOptions)
    );
}

export function isDataOfReasonableSize(chartData, limits) {
    const seriesLimit = get(limits, 'series', DEFAULT_SERIES_LIMIT);
    const categoriesLimit = get(limits, 'categories', DEFAULT_CATEGORIES_LIMIT);
    return chartData.series.length <= seriesLimit &&
        chartData.categories.length <= categoriesLimit;
}
