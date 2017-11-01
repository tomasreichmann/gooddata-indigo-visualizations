import { range } from 'lodash';
import {
    isNegativeValueIncluded,
    validateData,
    isPopMeasure,
    getColorPalette,
    getSeries,
    generateTooltipFn,
    getChartOptions,
    PIE_CHART_LIMIT
} from '../chartOptionsBuilder';
import { DEFAULT_CATEGORIES_LIMIT } from '../highcharts/commonConfiguration';

import * as dataSets from '../../../stories/test_data/dataSets';

import {
    DEFAULT_COLOR_PALETTE
} from '../transformation';

function mockChartOptions(
    dataSet = dataSets.barChartWithStackByAndViewByAttributes,
    config = {
        type: 'column'
    },
    drillableItems = []
) {
    const {
        executionRequest: { afm, resultSpec },
        executionResponse: { dimensions },
        executionResult: { data, attributeHeaderItems }
    } = dataSet;
    return getChartOptions(
        afm,
        resultSpec,
        dimensions,
        data,
        attributeHeaderItems,
        config,
        drillableItems
    );
}

describe('chartOptionsBuilder', () => {
    const barChartWithStackByAndViewByAttributesOptions = mockChartOptions();

    const barChartWith3MetricsAndViewByAttributeOptions =
        mockChartOptions(dataSets.barChartWith3MetricsAndViewByAttribute);

    const pieChartOptionsWithNegativeValue = mockChartOptions({
        ...dataSets.pieChartWithMetricsOnly,
        executionResult: {
            ...dataSets.pieChartWithMetricsOnly.executionResult,
            data: [
                [
                    '-1',
                    '38310753.45',
                    '9011389.956'
                ]
            ]
        }
    }, {
        type: 'pie'
    });

    const pieChartWithMetricsOnlyOptions = mockChartOptions({
        ...dataSets.pieChartWithMetricsOnly
    },
    {
        type: 'pie'
    });

    describe('isNegativeValueIncluded', () => {
        it('should return true if there is at least one negative value in series', () => {
            expect(
                isNegativeValueIncluded(pieChartOptionsWithNegativeValue.data.series)
            ).toBe(true);
        });
        it('should return false if there are no negative values in series', () => {
            expect(
                isNegativeValueIncluded(pieChartWithMetricsOnlyOptions.data.series)
            ).toBe(false);
        });
    });

    describe('validateData', () => {
        it('should be able to validate successfuly', () => {
            const chartOptions = barChartWithStackByAndViewByAttributesOptions;
            const validationResult = validateData({}, chartOptions);

            expect(
                validationResult
            ).toEqual({
                dataTooLarge: false,
                hasNegativeValue: false
            });
        });
        it('should validate with "dataTooLarge: true" against series limit', () => {
            const validationResult = validateData({
                series: 1
            }, barChartWith3MetricsAndViewByAttributeOptions);

            expect(
                validationResult
            ).toEqual({
                dataTooLarge: true,
                hasNegativeValue: false
            });
        });
        it('should validate with "dataTooLarge: true" against categories limit', () => {
            const validationResult = validateData({
                categories: 1
            }, barChartWith3MetricsAndViewByAttributeOptions);

            expect(
                validationResult
            ).toEqual({
                dataTooLarge: true,
                hasNegativeValue: false
            });
        });
        it(`should validate with "dataTooLarge: true" against default chart categories limit of ${DEFAULT_CATEGORIES_LIMIT}`, () => {
            const chartOptions = mockChartOptions(dataSets.barChartWith3MetricsAndViewByAttribute);
            chartOptions.data.categories = range(DEFAULT_CATEGORIES_LIMIT + 1);

            const validationResult = validateData({}, chartOptions);

            expect(
                validationResult
            ).toEqual({
                dataTooLarge: true,
                hasNegativeValue: false
            });
        });
        it('should validate with "dataTooLarge: true" against default pie chart series limit of 1', () => {
            const chartOptions = mockChartOptions(dataSets.barChartWith3MetricsAndViewByAttribute,
                {
                    type: 'pie'
                });
            const validationResult = validateData({}, chartOptions);

            expect(
                validationResult
            ).toEqual({
                dataTooLarge: true,
                hasNegativeValue: false
            });
        });
        it(`should validate with "dataTooLarge: true" against default pie chart categories limit of ${PIE_CHART_LIMIT}`, () => {
            const chartOptions = mockChartOptions(dataSets.pieChartWithMetricsOnly,
                {
                    type: 'pie'
                });
            chartOptions.data.categories = range(PIE_CHART_LIMIT + 1);
            const validationResult = validateData({}, chartOptions);

            expect(
                validationResult
            ).toEqual({
                dataTooLarge: true,
                hasNegativeValue: false
            });
        });
        it('should validate with "hasNegativeValue: true" for pie chart if its series contains a negative value', () => {
            const chartOptions = pieChartOptionsWithNegativeValue;
            const validationResult = validateData({}, chartOptions);

            expect(
                validationResult
            ).toEqual({
                dataTooLarge: false,
                hasNegativeValue: true
            });
        });
    });

    describe('isPopMeasure', () => {
        it('should return true if measureItem was defined as a popMeasure', () => {
            const measureItem = dataSets
                .barChartWithPopMeasureAndViewByAttribute
                .executionResponse
                .dimensions[1]
                .headers[0]
                .measureGroupHeader
                .items[0];
            const afm = dataSets.barChartWithPopMeasureAndViewByAttribute.executionRequest.afm;
            expect(
                isPopMeasure(measureItem, afm)
            ).toEqual(true);
        });

        it('should return false if measureItem was defined as a simple measure', () => {
            const measureItem = dataSets
                .barChartWithPopMeasureAndViewByAttribute
                .executionResponse
                .dimensions[1]
                .headers[0]
                .measureGroupHeader
                .items[1];
            const afm = dataSets.barChartWithPopMeasureAndViewByAttribute.executionRequest.afm;

            expect(
                isPopMeasure(measureItem, afm)
            ).toEqual(false);
        });
    });

    describe('getColorPalette', () => {
        it('should just return the original palette if there are no pop measures', () => {
            const measureGroup = dataSets
                .barChartWithoutAttributes
                .executionResponse
                .dimensions[1]
                .headers;
            const afm = dataSets.barChartWithoutAttributes.executionRequest.afm;
            expect(
                getColorPalette(DEFAULT_COLOR_PALETTE, measureGroup, afm)
            ).toEqual(DEFAULT_COLOR_PALETTE);
        });
        it('should return a palette with a lighter color for each pop measure', () => {
            const measureGroup = dataSets
                .barChartWithPopMeasureAndViewByAttribute
                .executionResponse
                .dimensions[1]
                .headers[0];
            const afm = dataSets.barChartWithPopMeasureAndViewByAttribute.executionRequest.afm;
            const updatedPalette = getColorPalette(DEFAULT_COLOR_PALETTE, measureGroup, afm);
            expect(updatedPalette[0]).not.toEqual(DEFAULT_COLOR_PALETTE[0]);
            expect(updatedPalette.slice(1)).toEqual(DEFAULT_COLOR_PALETTE.slice(1));
        });
    });

    describe('generateTooltipFn', () => {
        const tooltipFnOptions = { categoryAxisLabel: 'category-label' };

        describe('unescaping angle brackets and htmlescaping the whole value', () => {
            const generatedTooltip = generateTooltipFn(tooltipFnOptions);

            it('should keep &lt; and &gt; untouched (unescape -> escape)', () => {
                const tooltip = generatedTooltip({
                    y: 1,
                    series: {
                        name: '&lt;series&gt;'
                    }
                });

                expect(tooltip.includes('&lt;series&gt;')).toEqual(true);
            });

            it('should escape other html chars and have output properly escaped', () => {
                const tooltip = generatedTooltip({
                    y: 1,
                    series: {
                        name: '"&\'&lt;'
                    }
                });

                expect(tooltip.includes('&quot;&amp;&#39;&lt;')).toEqual(true);
            });

            it('should unescape brackets and htmlescape category', () => {
                const tooltip = generatedTooltip({
                    y: 1,
                    category: '&gt;"&\'&lt;',
                    series: {
                        name: 'series'
                    }
                });

                expect(tooltip.includes('&gt;&quot;&amp;&#39;&lt;')).toEqual(true);
            });
        });

        describe('tooltip renders correctly for pie chart attr/metric or multiple metrics', () => {
            it('renders correctly with attribute and metric', () => {
                const pieTooltipFnOptions = {
                    categoryLabel: 'category-label',
                    metricLabel: 'opportunities lost',
                    metricsOnly: false
                };
                const generatedTooltip = generateTooltipFn(pieTooltipFnOptions);

                const tooltip = generatedTooltip({
                    y: 1,
                    name: '"&\'&lt;'
                });

                expect(tooltip.includes('category-label')).toEqual(true);
            });

            it('renders correctly with metrics only', () => {
                const pieTooltipFnOptions = {
                    categoryLabel: 'category-label',
                    metricLabel: 'opportunities lost',
                    metricsOnly: true
                };
                const generatedTooltip = generateTooltipFn(pieTooltipFnOptions);

                const tooltip = generatedTooltip({
                    y: 1,
                    name: 'opportunities'
                });

                expect(tooltip.includes('opportunities')).toEqual(true);
                expect(tooltip.includes('category-label')).toEqual(false);
            });
        });
    });

    describe('getSeries', () => {
        describe('pie chart', () => {
            const oneMetricOneAttributeData = {
                isLoaded: true,
                headers: [
                    {
                        type: 'attrLabel',
                        id: 'date.aag81lMifn6q',
                        uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/15331',
                        title: 'Year (Date)'
                    }, {
                        type: 'metric',
                        id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                        uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                        title: 'Email Click Rate - previous year',
                        format: '#,##0.0%'
                    }
                ],
                rawData: [
                    [{ id: '2013', name: '2013' }, '124'],
                    [{ id: '2014', name: '2014' }, '284'],
                    [{ id: '2015', name: '2015' }, '123'],
                    [{ id: '2016', name: '2016' }, '155'],
                    [{ id: '2017', name: '2017' }, null]
                ],
                isEmpty: false,
                isLoading: false
            };

            it('should be able to rotate color palette', () => {
                const pieConfig = {
                    metricsOnly: false,
                    colorPalette: DEFAULT_COLOR_PALETTE.slice(0, 2)
                };

                const data = getSeries(pieConfig, oneMetricOneAttributeData);

                expect(data).toEqual({
                    series: [{
                        data: [
                            {
                                name: '2014',
                                y: 284,
                                color: DEFAULT_COLOR_PALETTE[0],
                                drillContext: [{
                                    id: '2014',
                                    identifier: 'date.aag81lMifn6q',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/15331',
                                    name: '2014'
                                }, {
                                    type: 'metric',
                                    id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                                    identifier: '',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                                    title: 'Email Click Rate - previous year',
                                    format: '#,##0.0%'
                                }],
                                drilldown: false,
                                legendIndex: 0,
                                format: '#,##0.0%'
                            },
                            {
                                name: '2016',
                                y: 155,
                                color: DEFAULT_COLOR_PALETTE[1],
                                drillContext: [{
                                    id: '2016',
                                    identifier: 'date.aag81lMifn6q',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/15331',
                                    name: '2016'
                                }, {
                                    type: 'metric',
                                    id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                                    identifier: '',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                                    title: 'Email Click Rate - previous year',
                                    format: '#,##0.0%'
                                }],
                                drilldown: false,
                                legendIndex: 1,
                                format: '#,##0.0%'
                            },
                            {
                                name: '2013',
                                y: 124,
                                color: DEFAULT_COLOR_PALETTE[0],
                                drillContext: [{
                                    id: '2013',
                                    identifier: 'date.aag81lMifn6q',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/15331',
                                    name: '2013'
                                }, {
                                    type: 'metric',
                                    id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                                    identifier: '',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                                    title: 'Email Click Rate - previous year',
                                    format: '#,##0.0%'
                                }],
                                drilldown: false,
                                legendIndex: 2,
                                format: '#,##0.0%'
                            },
                            {
                                name: '2015',
                                y: 123,
                                color: DEFAULT_COLOR_PALETTE[1],
                                drillContext: [{
                                    id: '2015',
                                    identifier: 'date.aag81lMifn6q',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/15331',
                                    name: '2015'
                                }, {
                                    type: 'metric',
                                    id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                                    identifier: '',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                                    title: 'Email Click Rate - previous year',
                                    format: '#,##0.0%'
                                }],
                                drilldown: false,
                                legendIndex: 3,
                                format: '#,##0.0%'
                            },
                            {
                                name: '2017',
                                y: null,
                                color: DEFAULT_COLOR_PALETTE[0],
                                drillContext: [{
                                    id: '2017',
                                    identifier: 'date.aag81lMifn6q',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/15331',
                                    name: '2017'
                                }, {
                                    type: 'metric',
                                    id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                                    identifier: '',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                                    title: 'Email Click Rate - previous year',
                                    format: '#,##0.0%'
                                }],
                                drilldown: false,
                                legendIndex: 4,
                                format: '#,##0.0%'
                            }
                        ]
                    }]
                });
            });

            it('should prepare data correctly when provided with one metric and one attribute', () => {
                const pieConfig = {
                    metricsOnly: false,
                    colorPalette: DEFAULT_COLOR_PALETTE.slice(0, 2)
                };

                const data = getSeries(pieConfig, oneMetricOneAttributeData);

                expect(data).toEqual({
                    series: [{
                        data: [
                            {
                                name: '2014',
                                y: 284,
                                color: DEFAULT_COLOR_PALETTE[0],
                                drillContext: [{
                                    id: '2014',
                                    identifier: 'date.aag81lMifn6q',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/15331',
                                    name: '2014'
                                }, {
                                    type: 'metric',
                                    id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                                    identifier: '',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                                    title: 'Email Click Rate - previous year',
                                    format: '#,##0.0%'
                                }],
                                drilldown: false,
                                legendIndex: 0,
                                format: '#,##0.0%'
                            },
                            {
                                name: '2016',
                                y: 155,
                                color: DEFAULT_COLOR_PALETTE[1],
                                drillContext: [{
                                    id: '2016',
                                    identifier: 'date.aag81lMifn6q',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/15331',
                                    name: '2016'
                                }, {
                                    type: 'metric',
                                    id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                                    identifier: '',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                                    title: 'Email Click Rate - previous year',
                                    format: '#,##0.0%'
                                }],
                                drilldown: false,
                                legendIndex: 1,
                                format: '#,##0.0%'
                            },
                            {
                                name: '2013',
                                y: 124,
                                color: DEFAULT_COLOR_PALETTE[0],
                                drillContext: [{
                                    id: '2013',
                                    identifier: 'date.aag81lMifn6q',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/15331',
                                    name: '2013'
                                }, {
                                    type: 'metric',
                                    id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                                    identifier: '',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                                    title: 'Email Click Rate - previous year',
                                    format: '#,##0.0%'
                                }],
                                drilldown: false,
                                legendIndex: 2,
                                format: '#,##0.0%'
                            },
                            {
                                name: '2015',
                                y: 123,
                                color: DEFAULT_COLOR_PALETTE[1],
                                drillContext: [{
                                    id: '2015',
                                    identifier: 'date.aag81lMifn6q',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/15331',
                                    name: '2015'
                                }, {
                                    type: 'metric',
                                    id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                                    identifier: '',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                                    title: 'Email Click Rate - previous year',
                                    format: '#,##0.0%'
                                }],
                                drilldown: false,
                                legendIndex: 3,
                                format: '#,##0.0%'
                            },
                            {
                                name: '2017',
                                y: null,
                                color: DEFAULT_COLOR_PALETTE[0],
                                drillContext: [{
                                    id: '2017',
                                    identifier: 'date.aag81lMifn6q',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/15331',
                                    name: '2017'
                                }, {
                                    type: 'metric',
                                    id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                                    identifier: '',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                                    title: 'Email Click Rate - previous year',
                                    format: '#,##0.0%'
                                }],
                                drilldown: false,
                                legendIndex: 4,
                                format: '#,##0.0%'
                            }
                        ]
                    }]
                });
            });

            it('should prepare data correctly when provided with multiple metrics', () => {
                const pieConfig = {
                    metricsOnly: true,
                    colorPalette: DEFAULT_COLOR_PALETTE
                };

                const pieData = {
                    isLoaded: true,
                    headers: [
                        {
                            type: 'metric',
                            id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                            uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                            title: 'First',
                            format: '#,##0.0%'
                        },
                        {
                            type: 'metric',
                            id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                            uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                            title: 'Next one',
                            format: '#,##0.0%'
                        },
                        {
                            type: 'metric',
                            id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                            uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                            title: 'Next two',
                            format: '#,##0.0%'
                        }
                    ],
                    rawData: [
                        ['123', '456', '789']
                    ],
                    isEmpty: false,
                    isLoading: false
                };

                const data = getSeries(pieConfig, pieData);

                expect(data).toEqual({
                    series: [{
                        data: [
                            {
                                name: 'Next two',
                                y: 789,
                                color: DEFAULT_COLOR_PALETTE[0],
                                drillContext: [{
                                    type: 'metric',
                                    id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                                    identifier: '',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                                    title: 'Next two',
                                    format: '#,##0.0%'
                                }],
                                drilldown: false,
                                legendIndex: 0,
                                format: '#,##0.0%'
                            },
                            {
                                name: 'Next one',
                                y: 456,
                                color: DEFAULT_COLOR_PALETTE[1],
                                drillContext: [{
                                    type: 'metric',
                                    id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                                    identifier: '',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                                    title: 'Next one',
                                    format: '#,##0.0%'
                                }],
                                drilldown: false,
                                legendIndex: 1,
                                format: '#,##0.0%'
                            },
                            {
                                name: 'First',
                                y: 123,
                                color: DEFAULT_COLOR_PALETTE[2],
                                drillContext: [{
                                    type: 'metric',
                                    id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                                    identifier: '',
                                    uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                                    title: 'First',
                                    format: '#,##0.0%'
                                }],
                                drilldown: false,
                                legendIndex: 2,
                                format: '#,##0.0%'
                            }
                        ]
                    }]
                });
            });
        });
    });

    describe('column/bar/line chart options', () => {
        let config;
        let mockData;

        beforeEach(() => {
            config = {
                color: '/metricGroup',
                orderBy: [],
                stacking: false,
                type: 'column',
                where: {},
                x: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/15331',
                y: '/metricValues'
            };

            mockData = {
                isLoaded: true,
                headers: [
                    {
                        type: 'attrLabel',
                        id: 'date.aag81lMifn6q',
                        uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/15331',
                        title: 'Year (Date)'
                    }, {
                        type: 'metric',
                        id: 'metric_yowwuctu6c5lkxql3itj3nz4ec54ax89_16206.generated.pop.5b24b8',
                        uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/808882',
                        title: 'Email Click Rate - previous year',
                        format: '#,##0.0%'
                    }, {
                        type: 'metric',
                        id: 'bHPCwcn7cGns',
                        uri: '/gdc/md/yowwuctu6c5lkxql3itj3nz4ec54ax89/obj/16206',
                        title: 'Email Click Rate',
                        format: '#,##0.0%'
                    }
                ],
                rawData: [
                    [{ id: '2013', name: '2013' }, null, '0.0126946885814334'],
                    [{ id: '2014', name: '2014' }, '0.0126946885814334', '0.0261557203220383'],
                    [{ id: '2015', name: '2015' }, '0.0261557203220383', '0.0348732552824948'],
                    [{ id: '2016', name: '2016' }, '0.0348732552824948', null]
                ],
                isEmpty: false,
                isLoading: false
            };
        });

        it('should get chart data', () => {
            const chartData = getChartOptions(config, mockData);
            expect(chartData).toBeDefined();
        });

        it('should not sort data', () => {
            const chartData = getChartOptions(config, mockData);
            expect(chartData.series[0].name).toEqual('Email Click Rate - previous year');
            expect(chartData.series[1].name).toEqual('Email Click Rate');
        });
    });

    describe('pie chart options', () => {
        describe('metricOnly', () => {
            it('should be true for multiple metrics', () => {
                const data = {
                    headers: [
                        {
                            title: 'm1',
                            type: 'metric'
                        },
                        {
                            title: 'm2',
                            type: 'metric'
                        }
                    ]
                };
                expect(getChartOptions({}, data).metricsOnly).toEqual(true);
            });

            it('should be true for single metric', () => {
                const data = {
                    headers: [
                        {
                            title: 'm1',
                            type: 'metric'
                        }
                    ]
                };
                expect(getChartOptions({}, data).metricsOnly).toEqual(true);
            });

            it('should be false for one metric and one attribute', () => {
                const data = {
                    headers: [
                        {
                            title: 'm1',
                            type: 'metric'
                        }, {
                            title: 'att1',
                            type: 'attrLabel'
                        }
                    ]
                };
                expect(getChartOptions({}, data).metricsOnly).toEqual(false);
            });
        });

        describe('tooltip', () => {
            it('should handle tooltip generation if no metric present', () => {
                const data = {
                    headers: [
                        {
                            title: 'att1',
                            type: 'attrLabel'
                        }
                    ]
                };

                const tooltip = getChartOptions({}, data).actions.tooltip({
                    y: 1234,
                    format: '##'
                });

                expect(tooltip).toMatchSnapshot();
            });
        });
    });
});
