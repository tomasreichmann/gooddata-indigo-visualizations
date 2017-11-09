import { range } from 'lodash';
import { immutableSet } from '../../utils/common';
import {
    isNegativeValueIncluded,
    validateData,
    isPopMeasure,
    findInDimensionHeaders,
    findMeasureGroupInDimensions,
    findAttributeInDimension,
    normalizeColorToRGB,
    getColorPalette,
    getSeriesItemData,
    getSeries,
    getDrillContext,
    getDrillableSeries,
    customEscape,
    generateTooltipFn,
    getChartOptions,
    PIE_CHART_LIMIT,
    VIEW_BY_DIMENSION_INDEX,
    STACK_BY_DIMENSION_INDEX
} from '../chartOptionsBuilder';
import { DEFAULT_CATEGORIES_LIMIT } from '../highcharts/commonConfiguration';

import * as fixtures from '../../../stories/test_data/fixtures';

import {
    DEFAULT_COLOR_PALETTE
} from '../transformation';

export function mockChartOptions(
    dataSet = fixtures.barChartWithStackByAndViewByAttributes,
    config = {
        type: 'column'
    },
    drillableItems = []
) {
    const {
        executionRequest: { afm, resultSpec },
        executionResponse: { dimensions },
        executionResult: { data, headerItems }
    } = dataSet;
    return getChartOptions(
        afm,
        resultSpec,
        dimensions,
        data,
        headerItems,
        config,
        drillableItems
    );
}

function getMVS(dataSet) {
    const {
        executionResponse: { dimensions },
        executionResult: { headerItems }
    } = dataSet;
    const measureGroup = findMeasureGroupInDimensions(dimensions);
    const viewByAttribute = findAttributeInDimension(
        dimensions[VIEW_BY_DIMENSION_INDEX],
        headerItems[VIEW_BY_DIMENSION_INDEX]
    );
    const stackByAttribute = findAttributeInDimension(
        dimensions[STACK_BY_DIMENSION_INDEX],
        headerItems[STACK_BY_DIMENSION_INDEX]
    );
    return [
        measureGroup,
        viewByAttribute,
        stackByAttribute
    ];
}

function getSeriesItemDataParameters(dataSet, seriesIndex) {
    const seriesItem = dataSet.executionResult.data[seriesIndex];
    return [
        seriesItem,
        seriesIndex,
        ...getMVS(dataSet)
    ];
}

describe('chartOptionsBuilder', () => {
    const barChartWithStackByAndViewByAttributesOptions = mockChartOptions();

    const barChartWith3MetricsAndViewByAttributeOptions =
        mockChartOptions(fixtures.barChartWith3MetricsAndViewByAttribute);

    const pieChartOptionsWithNegativeValue = mockChartOptions({
        ...fixtures.pieChartWithMetricsOnly,
        executionResult: {
            ...fixtures.pieChartWithMetricsOnly.executionResult,
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
        ...fixtures.pieChartWithMetricsOnly
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
            const chartOptions = mockChartOptions(fixtures.barChartWith3MetricsAndViewByAttribute);
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
            const chartOptions = mockChartOptions(fixtures.barChartWith3MetricsAndViewByAttribute,
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
            const chartOptions = mockChartOptions(fixtures.pieChartWithMetricsOnly,
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
            const measureItem = fixtures
                .barChartWithPopMeasureAndViewByAttribute
                .executionResponse
                .dimensions[1]
                .headers[0]
                .measureGroupHeader
                .items[0];
            const afm = fixtures.barChartWithPopMeasureAndViewByAttribute.executionRequest.afm;
            expect(
                isPopMeasure(measureItem, afm)
            ).toEqual(true);
        });

        it('should return false if measureItem was defined as a simple measure', () => {
            const measureItem = fixtures
                .barChartWithPopMeasureAndViewByAttribute
                .executionResponse
                .dimensions[1]
                .headers[0]
                .measureGroupHeader
                .items[1];
            const afm = fixtures.barChartWithPopMeasureAndViewByAttribute.executionRequest.afm;

            expect(
                isPopMeasure(measureItem, afm)
            ).toEqual(false);
        });
    });

    describe('findInDimensionHeaders', () => {
        it('should call supplied callback for all headers in all dimensions until it returns a non null value', () => {
            const mockCallback = jest.fn();
            mockCallback.mockReturnValue(null);
            const sampleDimensions = fixtures.barChartWithStackByAndViewByAttributes.executionResponse.dimensions;
            const headerCount = sampleDimensions[0].headers.length + sampleDimensions[1].headers.length;
            const returnValue = findInDimensionHeaders(sampleDimensions, mockCallback);
            expect(returnValue).toBeNull();
            expect(mockCallback).toHaveBeenCalledTimes(headerCount);
        });
        it('should return the first non-null value of it`s callback value', () => {
            const mockCallback = jest.fn();
            mockCallback.mockReturnValue(42);
            const sampleDimensions = fixtures.barChartWithStackByAndViewByAttributes.executionResponse.dimensions;
            const returnValue = findInDimensionHeaders(sampleDimensions, mockCallback);
            expect(returnValue).toBe(42);
            expect(mockCallback).toHaveBeenCalledTimes(1);
        });
    });

    describe('findMeasureGroupInDimensions', () => {
        it('should return the measure group header', () => {
            const sampleDimensions = fixtures.barChartWithStackByAndViewByAttributes.executionResponse.dimensions;
            const returnValue = findMeasureGroupInDimensions(sampleDimensions);
            const expectedValue = sampleDimensions[0].headers[1].measureGroupHeader;
            expect(returnValue).toBe(expectedValue);
        });
        it('should throw an error if measureGroup is not the last header on it\'s dimension', () => {
            const sampleDimensions = fixtures.barChartWithStackByAndViewByAttributes.executionResponse.dimensions;
            const invalidDimensions = [
                {
                    ...sampleDimensions[0],
                    headers: [
                        ...sampleDimensions[0].headers,
                        ...sampleDimensions[1].headers
                    ]
                }
            ];
            expect(findMeasureGroupInDimensions.bind(this, invalidDimensions)).toThrow();
        });
    });

    describe('findAttributeInDimension', () => {
        const dimensions = fixtures.barChartWithStackByAndViewByAttributes.executionResponse.dimensions;
        const headerItems = fixtures
            .barChartWithStackByAndViewByAttributes
            .executionResult
            .headerItems;
        it('should return the view by attribute header with header items', () => {
            const returnValue = findAttributeInDimension(
                dimensions[VIEW_BY_DIMENSION_INDEX],
                headerItems[VIEW_BY_DIMENSION_INDEX]
            );
            const expectedValue = {
                ...dimensions[VIEW_BY_DIMENSION_INDEX].headers[0].attributeHeader,
                items: headerItems[VIEW_BY_DIMENSION_INDEX][0]
            };
            expect(returnValue).toEqual(expectedValue);
        });
        it('should return the stack by attribute header with header items', () => {
            const returnValue = findAttributeInDimension(
                dimensions[STACK_BY_DIMENSION_INDEX],
                headerItems[STACK_BY_DIMENSION_INDEX]
            );
            const expectedValue = {
                ...dimensions[STACK_BY_DIMENSION_INDEX].headers[0].attributeHeader,
                items: headerItems[STACK_BY_DIMENSION_INDEX][0]
            };
            expect(returnValue).toEqual(expectedValue);
        });
    });

    describe('normalizeColorToRGB', () => {
        it('should just return the original color it is not in hex format', () => {
            const color = 'rgb(255, 255, 255)';
            expect(
                normalizeColorToRGB(color)
            ).toEqual(color);
        });
        it('should return color in rgb format if supplied color is in hex format', () => {
            const color = '#ffffff';
            const expectedColor = 'rgb(255, 255, 255)';
            expect(
                normalizeColorToRGB(color)
            ).toEqual(expectedColor);
        });
    });

    describe('getColorPalette', () => {
        it('should just return the original palette if there are no pop measures shorten to cover all legend items', () => {
            const [measureGroup, viewByAttribute, stackByAttribute] = getMVS(fixtures.barChartWithoutAttributes);
            const afm = fixtures.barChartWithoutAttributes.executionRequest.afm;
            const type = 'column';
            expect(
                getColorPalette(
                    DEFAULT_COLOR_PALETTE,
                    measureGroup,
                    viewByAttribute,
                    stackByAttribute,
                    afm,
                    type
                )
            ).toEqual(DEFAULT_COLOR_PALETTE.slice(0, measureGroup.items.length));
        });
        it('should return a palette with a lighter color for each pop measure based on it`s source measure', () => {
            const [measureGroup, viewByAttribute, stackByAttribute] =
                getMVS(fixtures.barChartWithPopMeasureAndViewByAttribute);
            const afm = fixtures.barChartWithPopMeasureAndViewByAttribute.executionRequest.afm;
            const type = 'column';

            const originalColorLightness = 0;
            const originalColor = `rgb(${originalColorLightness},${originalColorLightness},${originalColorLightness})`;
            const lighterModifier = 0.6;
            const lighterColorLightness = Math.floor((255 - originalColorLightness) * lighterModifier);
            const lighterColor = `rgb(${lighterColorLightness},${lighterColorLightness},${lighterColorLightness})`;

            const customPalette = [originalColor, originalColor];
            const updatedPalette =
                getColorPalette(customPalette, measureGroup, viewByAttribute, stackByAttribute, afm, type);
            expect(updatedPalette).toEqual([lighterColor, originalColor]);
        });
    });

    describe('getSeriesItemData', () => {
        describe('in usecase of bar chart with pop measure and view by attribute', () => {
            const parameters = getSeriesItemDataParameters(fixtures.barChartWithPopMeasureAndViewByAttribute, 0);
            const seriesItemData = getSeriesItemData(
                ...parameters,
                'column',
                DEFAULT_COLOR_PALETTE
            );

            it('should fill correct pointData name', () => {
                expect(
                    seriesItemData.map(pointData => pointData.name)
                ).toEqual([
                    'Amount previous year',
                    'Amount previous year',
                    'Amount previous year',
                    'Amount previous year',
                    'Amount previous year',
                    'Amount previous year'
                ]);
            });

            it('should parse all pointData values', () => {
                expect(
                    seriesItemData.map(pointData => pointData.y)
                ).toEqual([
                    null,
                    2773426.95,
                    8656468.2,
                    29140409.09,
                    60270072.2,
                    15785080.1
                ]);
            });

            it('should enable markers for all non-null pointData values', () => {
                expect(
                    seriesItemData.map(pointData => pointData.marker.enabled)
                ).toEqual([
                    false,
                    true,
                    true,
                    true,
                    true,
                    true
                ]);
            });
        });

        describe('in usecase of pie chart with metrics only', () => {
            const parameters = getSeriesItemDataParameters(fixtures.pieChartWithMetricsOnly, 0);
            const seriesItemData = getSeriesItemData(
                ...parameters,
                'pie',
                DEFAULT_COLOR_PALETTE
            );

            it('should fill correct pointData name', () => {
                expect(
                    seriesItemData.map(pointData => pointData.name)
                ).toEqual([
                    'Lost',
                    'Won',
                    'Expected'
                ]);
            });

            it('should fill correct pointData color', () => {
                expect(
                    seriesItemData.map(pointData => pointData.color)
                ).toEqual([
                    DEFAULT_COLOR_PALETTE[0],
                    DEFAULT_COLOR_PALETTE[1],
                    DEFAULT_COLOR_PALETTE[2]
                ]);
            });

            it('should fill correct pointData legendIndex', () => {
                expect(
                    seriesItemData.map(pointData => pointData.legendIndex)
                ).toEqual([0, 1, 2]);
            });

            it('should fill correct pointData format', () => {
                expect(
                    seriesItemData.map(pointData => pointData.format)
                ).toEqual(['#,##0.00', '#,##0.00', '#,##0.00']);
            });
        });

        describe('in usecase of pie chart with an attribute', () => {
            const parameters = getSeriesItemDataParameters(fixtures.barChartWithViewByAttribute, 0);
            const seriesItemData = getSeriesItemData(
                ...parameters,
                'pie',
                DEFAULT_COLOR_PALETTE
            );

            it('should fill correct pointData name', () => {
                expect(
                    seriesItemData.map(pointData => pointData.name)
                ).toEqual([
                    'Direct Sales',
                    'Inside Sales'
                ]);
            });

            it('should fill correct pointData color', () => {
                expect(
                    seriesItemData.map(pointData => pointData.color)
                ).toEqual([
                    DEFAULT_COLOR_PALETTE[0],
                    DEFAULT_COLOR_PALETTE[1]
                ]);
            });

            it('should fill correct pointData legendIndex', () => {
                expect(
                    seriesItemData.map(pointData => pointData.legendIndex)
                ).toEqual([0, 1]);
            });

            it('should fill correct pointData format', () => {
                expect(
                    seriesItemData.map(pointData => pointData.format)
                ).toEqual(['#,##0.00', '#,##0.00']);
            });
        });
    });

    describe('getSeries', () => {
        describe('in usecase of bar chart with 3 measures and view by attribute', () => {
            const dataSet = fixtures.barChartWith3MetricsAndViewByAttribute;
            const mVS = getMVS(dataSet);
            const type = 'column';
            const seriesData = getSeries(
                dataSet.executionResult.data,
                ...mVS,
                type,
                DEFAULT_COLOR_PALETTE
            );

            it('should return number of series equal to the count of measures', () => {
                expect(seriesData.length).toBe(3);
            });

            it('should fill correct series name', () => {
                expect(seriesData.map(seriesItem => seriesItem.name)).toEqual([
                    'Lost',
                    'Won',
                    'Expected'
                ]);
            });

            it('should fill correct series color', () => {
                expect(seriesData.map(seriesItem => seriesItem.color)).toEqual([
                    DEFAULT_COLOR_PALETTE[0],
                    DEFAULT_COLOR_PALETTE[1],
                    DEFAULT_COLOR_PALETTE[2]
                ]);
            });

            it('should fill correct series legendIndex', () => {
                expect(seriesData.map(seriesItem => seriesItem.legendIndex)).toEqual([0, 1, 2]);
            });

            it('should fill correct series data', () => {
                const expectedData = [0, 1, 2].map(((seriesIndex) => {
                    return getSeriesItemData(
                        ...getSeriesItemDataParameters(dataSet, seriesIndex),
                        type,
                        DEFAULT_COLOR_PALETTE
                    );
                }));
                expect(seriesData.map(seriesItem => seriesItem.data)).toEqual(expectedData);
            });
        });

        describe('in usecase of bar chart with stack by and view by attributes', () => {
            const dataSet = fixtures.barChartWithStackByAndViewByAttributes;
            const mVS = getMVS(dataSet);
            const type = 'column';
            const seriesData = getSeries(
                dataSet.executionResult.data,
                ...mVS,
                type,
                DEFAULT_COLOR_PALETTE
            );

            it('should return number of series equal to the count of stack by attribute values', () => {
                expect(seriesData.length).toBe(2);
            });

            it('should fill correct series name equal to stack by attribute values', () => {
                expect(seriesData.map(seriesItem => seriesItem.name)).toEqual([
                    'East Coast',
                    'West Coast'
                ]);
            });

            it('should fill correct series color', () => {
                expect(seriesData.map(seriesItem => seriesItem.color)).toEqual([
                    DEFAULT_COLOR_PALETTE[0],
                    DEFAULT_COLOR_PALETTE[1]
                ]);
            });

            it('should fill correct series legendIndex', () => {
                expect(seriesData.map(seriesItem => seriesItem.legendIndex)).toEqual([0, 1]);
            });

            it('should fill correct series data', () => {
                const expectedData = [0, 1].map(((seriesIndex) => {
                    return getSeriesItemData(
                        ...getSeriesItemDataParameters(dataSet, seriesIndex),
                        type,
                        DEFAULT_COLOR_PALETTE
                    );
                }));
                expect(seriesData.map(seriesItem => seriesItem.data)).toEqual(expectedData);
            });
        });
    });

    describe('getDrillContext', () => {
        it('should return correct drillContex for bar chart with stack by and view by attributes', () => {
            const dataSet = fixtures.barChartWithStackByAndViewByAttributes;
            const [measureGroup, viewByAttribute, stackByAttribute] = getMVS(dataSet);
            const measure = measureGroup.items[0].measureHeaderItem;

            const viewByItem = {
                ...viewByAttribute.items[0].attributeHeaderItem,
                attribute: viewByAttribute
            };

            const stackByItem = {
                ...stackByAttribute.items[0].attributeHeaderItem,
                attribute: stackByAttribute
            };

            const drillContext = getDrillContext(stackByItem, viewByItem, measure);
            expect(drillContext).toEqual([
                {
                    id: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1024/elements?id=1225',
                    identifier: 'label.owner.region',
                    uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1024',
                    value: 'East Coast'
                },
                {
                    id: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1027/elements?id=1226',
                    identifier: 'label.owner.department',
                    uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1027',
                    value: 'Direct Sales'
                },
                {
                    id: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1279',
                    identifier: 'ah1EuQxwaCqs',
                    uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1279',
                    value: 'Amount'
                }
            ]);
        });

        it('should return correct drillContex for pie chart measures only', () => {
            const dataSet = fixtures.pieChartWithMetricsOnly;
            const [measureGroup] = getMVS(dataSet);
            const measure = measureGroup.items[0].measureHeaderItem;

            const viewByItem = null;
            const stackByItem = null;

            const drillContext = getDrillContext(stackByItem, viewByItem, measure);
            expect(drillContext).toEqual([
                {
                    id: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1283',
                    identifier: 'af2Ewj9Re2vK',
                    uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1283',
                    value: 'Lost'
                }
            ]);
        });
    });

    describe('getDrillableSeries', () => {
        describe('in usecase of bar chart with 3 measures and view by attribute', () => {
            const dataSet = fixtures.barChartWith3MetricsAndViewByAttribute;
            const mVS = getMVS(dataSet);
            const type = 'column';
            const seriesWithoutDrillability = getSeries(
                dataSet.executionResult.data,
                ...mVS,
                type,
                DEFAULT_COLOR_PALETTE
            );

            describe('with no drillable items', () => {
                const noDrillableItems = [];
                const noDrillableSeriesData = getDrillableSeries(
                    seriesWithoutDrillability,
                    noDrillableItems,
                    ...mVS,
                    type
                );
                it('should return the same number of items as seriesWithoutDrillability', () => {
                    expect(noDrillableSeriesData.length).toBe(seriesWithoutDrillability.length);
                });

                it('should return new series array with isDrillable false', () => {
                    expect(noDrillableSeriesData).not.toBe(seriesWithoutDrillability);
                    expect(noDrillableSeriesData
                        .map(seriesItem => seriesItem.isDrillable)).toEqual([false, false, false]);
                });

                it('should return new pointData items drilldown false and no drillContext', () => {
                    expect(noDrillableSeriesData
                        .map(seriesItem => seriesItem.data.map(({ drilldown, drillContext }) => {
                            return { drilldown, drillContext };
                        }))
                    ).toEqual([
                        [{ drillContext: undefined, drilldown: false }, { drillContext: undefined, drilldown: false }, { drillContext: undefined, drilldown: false }, { drillContext: undefined, drilldown: false }, { drillContext: undefined, drilldown: false }], // eslint-disable-line max-len
                        [{ drillContext: undefined, drilldown: false }, { drillContext: undefined, drilldown: false }, { drillContext: undefined, drilldown: false }, { drillContext: undefined, drilldown: false }, { drillContext: undefined, drilldown: false }], // eslint-disable-line max-len
                        [{ drillContext: undefined, drilldown: false }, { drillContext: undefined, drilldown: false }, { drillContext: undefined, drilldown: false }, { drillContext: undefined, drilldown: false }, { drillContext: undefined, drilldown: false }] // eslint-disable-line max-len
                    ]);
                });
            });

            describe('with first and last drillable measures', () => {
                const twoDrillableMeasuresItems = [
                    { uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1283' },
                    { uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1285' }
                ];
                const twoDrillableMeasuresSeriesData = getDrillableSeries(
                    seriesWithoutDrillability,
                    twoDrillableMeasuresItems,
                    ...mVS,
                    type
                );
                it('should return the same number of items as seriesWithoutDrillability', () => {
                    expect(twoDrillableMeasuresSeriesData.length).toBe(seriesWithoutDrillability.length);
                });

                it('should return new series array with isDrillable true for the first and last measure ', () => {
                    expect(twoDrillableMeasuresSeriesData
                        .map(seriesItem => seriesItem.isDrillable)).toEqual([true, false, true]);
                });

                it('should assign new pointData items with drilldown true in the first and last serie', () => {
                    expect(twoDrillableMeasuresSeriesData
                        .map(seriesItem => seriesItem.data.map(pointData => pointData.drilldown))
                    ).toEqual([
                        [true, true, true, true, true],
                        [false, false, false, false, false],
                        [true, true, true, true, true]
                    ]);
                });

                it('should assign correct drillContext to pointData with drilldown true', () => {
                    expect(twoDrillableMeasuresSeriesData
                        .map(seriesItem => seriesItem.data[0].drillContext)
                    ).toEqual([
                        [
                            {
                                id: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1283',
                                identifier: 'af2Ewj9Re2vK',
                                uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1283',
                                value: 'Lost'
                            },
                            {
                                id: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/158/elements?id=2008',
                                identifier: 'created.aag81lMifn6q',
                                uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/158',
                                value: '2008'
                            }
                        ],
                        undefined,
                        [
                            {
                                id: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1285',
                                identifier: 'alUEwmBtbwSh',
                                uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1285',
                                value: 'Expected'
                            },
                            {
                                id: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/158/elements?id=2008',
                                identifier: 'created.aag81lMifn6q',
                                uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/158',
                                value: '2008'
                            }
                        ]
                    ]);
                });
            });
        });

        describe('in usecase of bar chart with stack by and view by attributes', () => {
            const dataSet = fixtures.barChartWithStackByAndViewByAttributes;
            const mVS = getMVS(dataSet);
            const type = 'column';
            const seriesData = getSeries(
                dataSet.executionResult.data,
                ...mVS,
                type,
                DEFAULT_COLOR_PALETTE
            );

            it('should return number of series equal to the count of stack by attribute values', () => {
                expect(seriesData.length).toBe(2);
            });

            it('should fill correct series name equal to stack by attribute values', () => {
                expect(seriesData.map(seriesItem => seriesItem.name)).toEqual([
                    'East Coast',
                    'West Coast'
                ]);
            });

            it('should fill correct series color', () => {
                expect(seriesData.map(seriesItem => seriesItem.color)).toEqual([
                    DEFAULT_COLOR_PALETTE[0],
                    DEFAULT_COLOR_PALETTE[1]
                ]);
            });

            it('should fill correct series legendIndex', () => {
                expect(seriesData.map(seriesItem => seriesItem.legendIndex)).toEqual([0, 1]);
            });

            it('should fill correct series data', () => {
                const expectedData = [0, 1].map(((seriesIndex) => {
                    return getSeriesItemData(
                        ...getSeriesItemDataParameters(dataSet, seriesIndex),
                        type,
                        DEFAULT_COLOR_PALETTE
                    );
                }));
                expect(seriesData.map(seriesItem => seriesItem.data)).toEqual(expectedData);
            });
        });
    });

    describe('customEscape', () => {
        it('should encode non work characters', () => {
            const source = 'qwertzuiopasdfghjklyxcvbnm1234567890/(!`?:_';
            const expected = 'qwertzuiopasdfghjklyxcvbnm1234567890&#47;&#40;&#33;&#96;&#63;&#58;_';
            expect(customEscape(source)).toBe(expected);
        });
        it('should encode some characters into named html entities', () => {
            const source = '&"<>';
            const expected = '&amp;&quot;&lt;&gt;';
            expect(customEscape(source)).toBe(expected);
        });
        it('should keep &lt; and &gt; untouched (unescape -> escape)', () => {
            const source = '&lt;&gt;';
            const expected = '&lt;&gt;';
            expect(customEscape(source)).toBe(expected);
        });
    });

    describe('generateTooltipFn', () => {
        const dataSet = fixtures.barChartWithViewByAttribute;
        const mVS = getMVS(dataSet);
        const viewByAttribute = mVS[1];
        const pointData = {
            y: 1,
            format: '# ###',
            name: 'point',
            category: 'category',
            series: {
                name: 'series'
            }
        };

        function getValues(string) {
            const test = />([^<]+)<\/td>/g;
            const result = string.match(test).map(match => match.slice(1, -5));
            return (result && result.length) >= 2 ? Array.from(result) : null;
        }

        describe('unescaping angle brackets and htmlescaping the whole value', () => {
            const tooltipFn = generateTooltipFn(viewByAttribute, 'column');

            it('should keep &lt; and &gt; untouched (unescape -> escape)', () => {
                const tooltip = tooltipFn({
                    ...pointData,
                    series: {
                        name: '&lt;series&gt;'
                    }
                });
                expect(getValues(tooltip)).toEqual(['Department', 'category', '&lt;series&gt;', ' 1']);
            });

            it('should escape other html chars in series name and have output properly escaped', () => {
                const tooltip = tooltipFn({
                    ...pointData,
                    series: {
                        name: '"&\'&lt;'
                    }
                });
                expect(getValues(tooltip)).toEqual(['Department', 'category', '&quot;&amp;&#39;&lt;', ' 1']);
            });

            it('should unescape brackets and htmlescape category', () => {
                const tooltip = tooltipFn({
                    ...pointData,
                    category: '&gt;"&\'&lt;'
                });
                expect(getValues(tooltip)).toEqual(['Department', '&gt;&quot;&amp;&#39;&lt;', 'series', ' 1']);
            });
        });

        it('should render correct values in usecase of bar chart without attribute', () => {
            const tooltipFn = generateTooltipFn(null, 'column');
            const tooltip = tooltipFn(pointData);
            expect(getValues(tooltip)).toEqual(['series', ' 1']);
        });

        it('should render correct values in usecase of pie chart with an attribute', () => {
            const tooltipFn = generateTooltipFn(viewByAttribute, 'pie');
            const tooltip = tooltipFn(pointData);
            expect(getValues(tooltip)).toEqual(['Department', 'category', 'series', ' 1']);
        });

        it('should render correct values in usecase of pie chart with measures', () => {
            const tooltipFn = generateTooltipFn(null, 'pie');
            const tooltip = tooltipFn(pointData);
            expect(getValues(tooltip)).toEqual(['point', ' 1']);
        });
    });

    describe('getChartOptions', () => {
        const dataSet = fixtures.barChartWith3MetricsAndViewByAttribute;
        const dataSetWithoutMeasureGroup = immutableSet(dataSet, 'executionResponse.dimensions[1].headers', []);
        const chartOptionsWithCustomOptions = mockChartOptions(dataSet, {
            xLabel: 'xLabel',
            yLabel: 'yLabel',
            yFormat: 'yFormat',
            type: 'line',
            legendLayout: 'vertical'
        });

        it('should throw if measure group is missing in dimensions', () => {
            expect(mockChartOptions.bind(this, dataSetWithoutMeasureGroup)).toThrow();
        });

        it('should throw if chart type is of unknown type', () => {
            expect(mockChartOptions.bind(this, dataSetWithoutMeasureGroup, { type: 'bs' })).toThrow();
        });

        it('should assign showInPercent true only if at least one measure`s format includes a "%" sign', () => {
            const dataSetWithPercentFormat = immutableSet(dataSet, 'executionResponse.dimensions[1].headers[0].measureGroupHeader.items[0].measureHeaderItem.format', '0.00 %');
            const chartOptions = mockChartOptions(dataSetWithPercentFormat);
            expect(mockChartOptions(dataSet).showInPercent).toBe(false); // false by default
            expect(chartOptions.showInPercent).toBe(true); // true if format includes %
        });

        it('should assign custom xLabel', () => {
            expect(chartOptionsWithCustomOptions.title.x).toBe('xLabel');
        });

        it('should assign custom yLabel', () => {
            expect(chartOptionsWithCustomOptions.title.y).toBe('yLabel');
        });

        it('should assign custom yFormat', () => {
            expect(chartOptionsWithCustomOptions.title.yFormat).toBe('yFormat');
        });

        it('should assign custom legend format', () => {
            expect(chartOptionsWithCustomOptions.legendLayout).toBe('vertical');
        });

        describe('in usecase of bar chart with 3 metrics', () => {
            const chartOptions = mockChartOptions(fixtures.barChartWith3MetricsAndViewByAttribute);

            it('should assign a default legend format of horizontal', () => {
                expect(chartOptions.legendLayout).toBe('horizontal');
            });

            it('should assign stacking option to null', () => {
                expect(chartOptions.stacking).toBe(null);
            });

            it('should assign X axis name by default to view by attribute name', () => {
                expect(chartOptions.title.x).toEqual('Year (Created)');
            });

            it('should assign Y axis name to empty string in case of multiple measures', () => {
                expect(chartOptions.title.y).toBe('');
            });

            it('should assign Y axis format based on the first measure`s format', () => {
                expect(chartOptions.title.yFormat).toEqual('#,##0.00');
            });

            it('should assign number of series equal to number of measures', () => {
                expect(chartOptions.data.series.length).toBe(3);
            });

            it('should assign categories equal to view by attribute values', () => {
                expect(chartOptions.data.categories).toEqual(['2008', '2009', '2010', '2011', '2012']);
            });

            it('should assign 3 colors from default colorPalette', () => {
                expect(chartOptions.colorPalette).toEqual(DEFAULT_COLOR_PALETTE.slice(0, 3));
            });

            it('should assign correct tooltip function', () => {
                const mVS = getMVS(dataSet);
                const viewByAttribute = mVS[1];
                const pointData = {
                    y: 1,
                    format: '# ###',
                    name: 'point',
                    category: 'category',
                    series: {
                        name: 'series'
                    }
                };
                const tooltip = chartOptions.actions.tooltip(pointData);
                const expectedTooltip = generateTooltipFn(viewByAttribute, 'column')(pointData);
                expect(tooltip).toBe(expectedTooltip);
            });
        });

        describe('in usecase of stack bar chart', () => {
            const chartOptions = mockChartOptions(fixtures.barChartWithStackByAndViewByAttributes);

            it('should assign stacking normal', () => {
                expect(chartOptions.stacking).toBe('normal');
            });

            it('should assign X axis name to view by attribute name', () => {
                expect(chartOptions.title.x).toEqual('Department');
            });

            it('should assign Y axis name to measure name', () => {
                expect(chartOptions.title.y).toBe('Amount');
            });

            it('should assign Y axis format based on the first measure`s format', () => {
                expect(chartOptions.title.yFormat).toEqual('#,##0.00');
            });

            it('should assign number of series equal to number of stack by attribute values', () => {
                expect(chartOptions.data.series.length).toBe(2);
            });

            it('should assign categories equal to view by attribute values', () => {
                expect(chartOptions.data.categories).toEqual(['Direct Sales', 'Inside Sales']);
            });

            it('should assign correct tooltip function', () => {
                const mVS = getMVS(fixtures.barChartWithStackByAndViewByAttributes);
                const viewByAttribute = mVS[1];
                const pointData = {
                    y: 1,
                    format: '# ###',
                    name: 'point',
                    category: 'category',
                    series: {
                        name: 'series'
                    }
                };
                const tooltip = chartOptions.actions.tooltip(pointData);
                const expectedTooltip = generateTooltipFn(viewByAttribute, 'column')(pointData);
                expect(tooltip).toBe(expectedTooltip);
            });
        });

        describe('in usecase of pie chart with attribute', () => {
            const chartOptions = mockChartOptions(fixtures.barChartWithViewByAttribute, { type: 'pie' });

            it('should assign stacking normal', () => {
                expect(chartOptions.stacking).toBe(null);
            });

            it('should assign X axis name to view by attribute name', () => {
                expect(chartOptions.title.x).toEqual('Department');
            });

            it('should assign Y axis name to measure name', () => {
                expect(chartOptions.title.y).toBe('Amount');
            });

            it('should assign Y axis format based on the first measure`s format', () => {
                expect(chartOptions.title.yFormat).toEqual('#,##0.00');
            });

            it('should always assign 1 series', () => {
                expect(chartOptions.data.series.length).toBe(1);
            });

            it('should assign categories equal to view by attribute values', () => {
                expect(chartOptions.data.categories).toEqual(['Direct Sales', 'Inside Sales']);
            });

            it('should assign correct tooltip function', () => {
                const mVS = getMVS(fixtures.barChartWithStackByAndViewByAttributes);
                const viewByAttribute = mVS[1];
                const pointData = {
                    y: 1,
                    format: '# ###',
                    name: 'point',
                    category: 'category',
                    series: {
                        name: 'series'
                    }
                };
                const tooltip = chartOptions.actions.tooltip(pointData);
                const expectedTooltip = generateTooltipFn(viewByAttribute, 'column')(pointData);
                expect(tooltip).toBe(expectedTooltip);
            });
        });

        describe('in usecase of pie chart with measures only', () => {
            const chartOptions = mockChartOptions(fixtures.pieChartWithMetricsOnly, { type: 'pie' });

            it('should assign stacking normal', () => {
                expect(chartOptions.stacking).toBe(null);
            });

            it('should assign X an empty string', () => {
                expect(chartOptions.title.x).toEqual('');
            });

            it('should assign Y an empty string', () => {
                expect(chartOptions.title.y).toBe('');
            });

            it('should assign Y axis format based on the first measure`s format', () => {
                expect(chartOptions.title.yFormat).toEqual('#,##0.00');
            });

            it('should always assign 1 series', () => {
                expect(chartOptions.data.series.length).toBe(1);
            });

            it('should assign categories with names of measures', () => {
                expect(chartOptions.data.categories).toEqual(['Lost', 'Won', 'Expected']);
            });

            it('should assign correct tooltip function', () => {
                const pointData = {
                    y: 1,
                    format: '# ###',
                    name: 'point',
                    category: 'category',
                    series: {
                        name: 'series'
                    }
                };
                const tooltip = chartOptions.actions.tooltip(pointData);
                const expectedTooltip = generateTooltipFn(null, 'pie')(pointData);
                expect(tooltip).toBe(expectedTooltip);
            });
        });

        describe('in usecase of bar chart with pop measure', () => {
            const chartOptions = mockChartOptions(fixtures.barChartWithPopMeasureAndViewByAttribute, { type: 'column' });

            it('should assign stacking normal', () => {
                expect(chartOptions.stacking).toBe(null);
            });

            it('should assign X an view by attribute value', () => {
                expect(chartOptions.title.x).toEqual('Year (Created)');
            });

            it('should assign Y an empty string', () => {
                expect(chartOptions.title.y).toBe('');
            });

            it('should assign Y axis format based on the first measure`s format', () => {
                expect(chartOptions.title.yFormat).toEqual('$#,##0.00');
            });

            it('should always assign number of series equal to number of measures', () => {
                expect(chartOptions.data.series.length).toBe(2);
            });

            it('should assign categories ', () => {
                expect(chartOptions.data.categories).toEqual(['2008', '2009', '2010', '2011', '2012', '2013']);
            });

            it('should assign updated color for pop measure', () => {
                expect(chartOptions.colorPalette).toEqual(['rgb(153,230,209)', 'rgb(0,193,141)']);
            });

            it('should assign correct tooltip function', () => {
                const mVS = getMVS(fixtures.barChartWithPopMeasureAndViewByAttribute);
                const viewByAttribute = mVS[1];
                const pointData = {
                    y: 1,
                    format: '# ###',
                    name: 'point',
                    category: 'category',
                    series: {
                        name: 'series'
                    }
                };
                const tooltip = chartOptions.actions.tooltip(pointData);
                const expectedTooltip = generateTooltipFn(viewByAttribute, 'column')(pointData);
                expect(tooltip).toBe(expectedTooltip);
            });
        });
    });
});
