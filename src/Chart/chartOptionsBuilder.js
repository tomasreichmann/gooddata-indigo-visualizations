import { colors2Object, numberFormat } from '@gooddata/numberjs';

import { uniq, get, intersection, isNumber, cloneDeep } from 'lodash';
import { parseValue } from '../utils/common';
import { DEFAULT_COLOR_PALETTE, _getLighterColor } from './transformation';
import { PIE_CHART } from '../VisualizationTypes';
import { isDataOfReasonableSize } from './highChartsCreators';

import { DEFAULT_CATEGORIES_LIMIT } from './highcharts/commonConfiguration';

export const PIE_CHART_LIMIT = 20;

export function isNegativeValueIncluded(series) {
    return series
        .some(seriesItem => (
            seriesItem.data.some(({ y }) => (y < 0))
        ));
}

export function validateData(limits = {}, chartOptions) {
    const pieChartLimits = {
        series: 1, // pie charts can have just one series
        categories: Math.min(limits.categories || DEFAULT_CATEGORIES_LIMIT, PIE_CHART_LIMIT)
    };
    const isPieChart = chartOptions.type === PIE_CHART;
    return {
        // series and categories limit
        dataTooLarge: !isDataOfReasonableSize(chartOptions.data, isPieChart
            ? pieChartLimits
            : limits),
        // check pie chart for negative values
        hasNegativeValue: isPieChart && isNegativeValueIncluded(chartOptions.data.series)
    };
}

export function isPopMeasure(measureItem, afm) {
    return afm.measures.some((measure) => {
        const popMeasureIdentifier = get(measure, 'definition.popMeasure') ? measure.localIdentifier : null;
        return popMeasureIdentifier && popMeasureIdentifier === measureItem.measureHeaderItem.localIdentifier;
    });
}

export function getColorPalette(colorPalette = DEFAULT_COLOR_PALETTE, measureGroup, afm) {
    const updatedColorPalette = [...colorPalette]; // clone array
    measureGroup.items.forEach((measureItem, measureItemIndex) => {
        if (isPopMeasure(measureItem, afm)) {
            updatedColorPalette[measureItemIndex] =
                _getLighterColor(updatedColorPalette[measureItemIndex], 0.6);
        }
    });
    return updatedColorPalette;
}

export function getSeriesItemData(
    seriesItem,
    seriesIndex,
    measureGroup,
    viewByAttribute,
    stackByAttribute,
    checkIfDrillable,
    type,
    colorPalette
) {
    return seriesItem.map((pointValue, pointIndex) => {
        // by default seriesIndex corresponds to measureGroup label index
        let measureIndex = seriesIndex;
        // by default pointIndex corresponds to viewBy label index
        let viewByIndex = pointIndex;

        // drillContext can have 1 to 3 items
        // viewBy attribute label, stackby label if available
        // last drillContextItem is always current serie measure
        const drillHeaderItems = [];
        if (stackByAttribute) {
            // if there is a stackBy attribute, then seriesIndex corresponds to stackBy label index
            drillHeaderItems.push(stackByAttribute.items[seriesIndex]);
            // pointIndex corresponds to viewBy attribute label (if available)
            viewByIndex = pointIndex;
            // pointIndex also corresponds to measureGroup label
            // but measures do not match a carthesian multiplication of attributes
            // therefore we need to calculate the measure index
            // based on the number of attribute values on the same dimension
            measureIndex = Math.floor(pointIndex / stackByAttribute.items.length);
        }
        if (viewByAttribute) {
            drillHeaderItems.push(viewByAttribute.items[viewByIndex]);
        }
        drillHeaderItems.push(measureGroup.items[measureIndex]);

        const drilldownProps = {
            drilldown: checkIfDrillable(drillHeaderItems)
        };

        if (drilldownProps.drilldown) {
            // mapping of drillHeaderItems to drillContextItems
            // TODO: handle totalHeaderItems that have only name
            // TODO: adapt drillHeaderItems items to match this
            drilldownProps.drillContext = drillHeaderItems.map((wrappedDrillHeaderItem) => {
                const headerType = Object.keys(wrappedDrillHeaderItem)[0];
                const {
                    uri, // header attribute value uri or measure index
                    identifier = '', // header item identifier or measures identifier
                    name // header item text label
                } = wrappedDrillHeaderItem[headerType];
                /*
                    old drillable items sample
                    [
                        // attribute
                        {
                            id: "2012"
                            identifier: "closed.aag81lMifn6q"
                            uri: "/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/324"
                            value: "2012"
                        },
                        // measure
                        {
                            id: "aaYh6Voua2yj"
                            identifier: ""
                            uri: "/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/13465"
                            value: "aaa <b># of Open Opps.</b>"
                        }
                    ]
                */
                return {
                    id: uri, // uri of attribute value
                    value: name, // text label of attribute value or formatted measure value
                    // TODO: get attribute uri and identifier based on attribute value header item
                    identifier, // identifier of attribute or measure
                    uri: undefined // uri of attribute or measure
                };
            });
        }


        const pointData = {
            y: parseValue(pointValue),
            marker: {
                enabled: pointValue !== null
            },
            ...drilldownProps
        };
        if (viewByAttribute) {
            pointData.name = get(viewByAttribute, ['items', viewByIndex, 'attributeHeaderItem', 'name']);
        } else if (!stackByAttribute) {
            pointData.name = get(measureGroup, ['items', pointIndex, 'measureHeaderItem', 'name']);
        }

        // TODO pie chart measure name

        if (type === PIE_CHART) {
            // add color to pie chart points from colorPalette
            pointData.color = colorPalette[pointIndex];
            // Pie charts use pointData viewByIndex as legendIndex if available instead of seriesItem legendIndex
            pointData.legendIndex = viewByAttribute ? viewByIndex : pointIndex;
        }
        const format = measureGroup.items[measureIndex].format;
        if (format) {
            pointData.format = format;
        }
        return pointData;
    });
}


export function getSeries(
    executionResultData,
    measureGroup,
    viewByAttribute,
    stackByAttribute,
    checkIfDrillable,
    type,
    colorPalette,
    measureGroupDimension
) {
    return executionResultData.map((seriesItem, seriesIndex) => {
        const seriesItemData = getSeriesItemData(
            seriesItem,
            seriesIndex,
            measureGroup,
            viewByAttribute,
            stackByAttribute,
            checkIfDrillable,
            type,
            colorPalette,
            measureGroupDimension
        );
        const seriesItemConfig = {
            color: colorPalette[seriesIndex],
            legendIndex: seriesIndex,
            isDrillable: seriesItemData.some(dataItem => dataItem.drilldown),
            data: seriesItemData
        };

        if (stackByAttribute) {
            // if stackBy attribute is available, seriesName is a stackBy attribute value of index seriesIndex
            // this is a limitiation of highcharts and a reason why you can not have multi-measure stacked charts
            seriesItemConfig.name = stackByAttribute.items[seriesIndex].attributeHeaderItem.name;
        } else if (type === PIE_CHART && !viewByAttribute) {
            // Pie charts with measures only have a single series which name can be either a dimension name
            // or concatenation of measure names
            seriesItemConfig.name = measureGroup.items.map((wrappedMeasure) => {
                const measureType = Object.keys(wrappedMeasure)[0];
                const measure = wrappedMeasure[measureType];
                return measure.name;
            }).join(', ');
        } else {
            // otherwise seriesName is a measure name of index seriesIndex
            seriesItemConfig.name = measureGroup.items[seriesIndex].measureHeaderItem.name;
        }

        return seriesItemConfig;
    });
}

export const unEscapeAngleBrackets = str => str && str.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

export function generatePieTooltipFn({ categoryLabel, measureLabel, measuresOnly }) {
    const formatValue = (val, format) => {
        return colors2Object(numberFormat(val, format));
    };
    return (point) => {
        const formattedValue = escape(formatValue(point.y, point.format).label);
        const category = isNumber(point.name) ? '' :
            escape(unEscapeAngleBrackets(point.name));
        const categoryRow = !measuresOnly ? `<tr>
                <td class="title">${escape(categoryLabel)}</td>
                <td class="value">${category}</td>
            </tr>` : '';
        const measureTitle = measuresOnly ? point.name : measureLabel;
        return `
            <table class="tt-values">
                ${categoryRow}
                <tr>
                    <td class="title">${escape(unEscapeAngleBrackets(measureTitle))}</td>
                    <td class="value">${formattedValue}</td>
                </tr>
            </table>`;
    };
}

export function generateTooltipFn({ categoryLabel }) {
    const formatValue = (val, format) => {
        return colors2Object(numberFormat(val, format));
    };

    return (point) => {
        // TODO: merge with generatePieTooltipFn
        const formattedValue = escape(formatValue(point.y, point.format).label);
        const category = isNumber(point.category) ? '' :
            escape(unEscapeAngleBrackets(point.category));

        return `
            <table class="tt-values"><tr>
                <td class="title">${escape(categoryLabel)}</td>
                <td class="value">${category}</td>
            </tr>
            <tr>
                <td class="title">${escape(unEscapeAngleBrackets(point.series.name))}</td>
                <td class="value">${formattedValue}</td>
            </tr></table>`;
    };
}

export function getChartOptions(
    afm,
    resultSpec,
    dimensions,
    executionResultData,
    attributeHeaderItems,
    config,
    drillableItems
) {
    // As a convention, the attribute on the first dimension is a viewBy attribute
    // the attribute on second dimension is a stackBy attribute
    // there should ever only be maximum of one stackBy and one viewBy attribute, so other attributes are thrown away
    let measureGroup = null;
    let measureGroupDimension = null;
    let stackByAttribute = null;
    let viewByAttribute = null;

    // console.log('afm', afm);
    // console.log('resultSpec', resultSpec);
    // console.log('dimensions', dimensions);
    // console.log('executionResultData', executionResultData);
    // console.log('attributeHeaderItems', attributeHeaderItems);

    dimensions.some((dimension, dimensionIndex) => {
        return dimension.headers.some((wrappedHeader) => {
            const headerType = Object.keys(wrappedHeader)[0];
            const header = wrappedHeader[headerType];

            if (headerType === 'attributeHeader') {
                if (dimensionIndex === 0 && viewByAttribute === null) {
                    viewByAttribute = cloneDeep(header);
                    // there is always just one attribute on each dimension, so we can safely pick index 0
                    viewByAttribute.items = attributeHeaderItems[dimensionIndex][0];
                } else if (dimensionIndex === 1 && stackByAttribute === null) {
                    stackByAttribute = cloneDeep(header);
                    // there is always just one attribute on each dimension, so we can safely pick index 0
                    stackByAttribute.items = attributeHeaderItems[dimensionIndex][0];
                }
            } else if (headerType === 'measureGroupHeader' && measureGroup === null) {
                measureGroup = header;
                measureGroupDimension = dimensionIndex;
            }
            // no need to finish the lookup if we already found one measureGroup,
            // one viewByAttribute and one stackByAttribute
            return viewByAttribute && stackByAttribute && viewByAttribute;
        });
    });

    if (!measureGroup) {
        throw new Error('missing measureGroup');
    }

    // console.log('measureGroup', measureGroup);
    // console.log('stackByAttribute', stackByAttribute);
    // console.log('viewByAttribute', viewByAttribute);

    const categories = viewByAttribute
        ? viewByAttribute.items.map(({ attributeHeaderItem }) => (attributeHeaderItem.name))
        : [];

    const measureLocalIdentifiers = uniq(measureGroup.items.map(
        ({ localIdentifier }) => (localIdentifier))
    );
    // by default, points are not drillable
    let checkIfDrillable = () => false;

    const drillableItemLocalIdentifiers = drillableItems.map(drillableItem => (drillableItem.uri));

    if (viewByAttribute && drillableItems.some((drillableItem) => {
        return drillableItem.uri === viewByAttribute.uri
            || drillableItem.identifier === viewByAttribute.identifier;
    })) {
        // if drillableItems contain a viewBy uri, all points are drillable
        checkIfDrillable = () => true;
    } else if (intersection(drillableItemLocalIdentifiers, measureLocalIdentifiers.concat(
        stackByAttribute ? [stackByAttribute.uri] : []
    )).length > 0) {
        // if drillableItems contain a stackBy uri or any measure uris,
        // a point is drillable if it contains a stackby uri or measure uri in it's drillable context or
        checkIfDrillable = (drillContext) => {
            const drillContextUris = drillContext.map(
                drillContextItem => (drillContextItem.id) // id should be renamed to uri IMHO
            );
            return intersection(
                drillContextUris,
                measureLocalIdentifiers.concat(stackByAttribute ? stackByAttribute.uri : [])
            ).length > 0;
        };
    }

    const colorPalette = getColorPalette(config.colorPalette, measureGroup, afm);

    const series = getSeries(
        executionResultData,
        measureGroup,
        viewByAttribute,
        stackByAttribute,
        checkIfDrillable,
        config.type,
        colorPalette,
        measureGroupDimension
    );

    const title = {
        x: get(dimensions, '[0].name', ''),
        y: get(dimensions, '[1].name', '')
    };

    const yFormat = get(resultSpec, ['measures', 0, 'format']);
    if (yFormat) {
        title.yFormat = yFormat;
    }

    return {
        type: config.type,
        stacking: (stackByAttribute && config.type !== 'line') ? 'normal' : null,
        legendLayout: config.legendLayout || 'horizontal',
        colorPalette,
        title,
        showInPercent: get(resultSpec, 'measures', []).some((measure) => {
            return measure.format.includes('%');
        }),
        data: {
            series,
            categories
        },
        actions: {
            tooltip: generateTooltipFn({
                series,
                categories,
                type: config.type
            })
        }
    };
}
