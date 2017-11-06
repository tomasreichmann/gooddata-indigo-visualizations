import { range } from 'lodash';
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
    generateTooltipFn,
    getChartOptions,
    PIE_CHART_LIMIT,
    VIEW_BY_DIMENSION_INDEX,
    STACK_BY_DIMENSION_INDEX
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

function getMVS(dataSet) {
    const {
        executionResponse: { dimensions },
        executionResult: { attributeHeaderItems }
    } = dataSet;
    const measureGroup = findMeasureGroupInDimensions(dimensions);
    const viewByAttribute = findAttributeInDimension(
        dimensions[VIEW_BY_DIMENSION_INDEX],
        attributeHeaderItems[VIEW_BY_DIMENSION_INDEX]
    );
    const stackByAttribute = findAttributeInDimension(
        dimensions[STACK_BY_DIMENSION_INDEX],
        attributeHeaderItems[STACK_BY_DIMENSION_INDEX]
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

    describe('findInDimensionHeaders', () => {
        it('should call supplied callback for all headers in all dimensions until it returns a non null value', () => {
            const mockCallback = jest.fn();
            mockCallback.mockReturnValue(null);
            const sampleDimensions = dataSets.barChartWithStackByAndViewByAttributes.executionResponse.dimensions;
            const headerCount = sampleDimensions[0].headers.length + sampleDimensions[1].headers.length;
            const returnValue = findInDimensionHeaders(sampleDimensions, mockCallback);
            expect(returnValue).toBeNull();
            expect(mockCallback).toHaveBeenCalledTimes(headerCount);
        });
        it('should return the first non-null value of it`s callback value', () => {
            const mockCallback = jest.fn();
            mockCallback.mockReturnValue(42);
            const sampleDimensions = dataSets.barChartWithStackByAndViewByAttributes.executionResponse.dimensions;
            const returnValue = findInDimensionHeaders(sampleDimensions, mockCallback);
            expect(returnValue).toBe(42);
            expect(mockCallback).toHaveBeenCalledTimes(1);
        });
    });

    describe('findMeasureGroupInDimensions', () => {
        it('should return the measure group header', () => {
            const sampleDimensions = dataSets.barChartWithStackByAndViewByAttributes.executionResponse.dimensions;
            const returnValue = findMeasureGroupInDimensions(sampleDimensions);
            const expectedValue = sampleDimensions[0].headers[1].measureGroupHeader;
            expect(returnValue).toBe(expectedValue);
        });
        it('should throw an error if measureGroup is not the last header on it\'s dimension', () => {
            const sampleDimensions = dataSets.barChartWithStackByAndViewByAttributes.executionResponse.dimensions;
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
        const dimensions = dataSets.barChartWithStackByAndViewByAttributes.executionResponse.dimensions;
        const attributeHeaderItems = dataSets
            .barChartWithStackByAndViewByAttributes
            .executionResult
            .attributeHeaderItems;
        it('should return the view by attribute header with header items', () => {
            const returnValue = findAttributeInDimension(
                dimensions[VIEW_BY_DIMENSION_INDEX],
                attributeHeaderItems[VIEW_BY_DIMENSION_INDEX]
            );
            const expectedValue = {
                ...dimensions[VIEW_BY_DIMENSION_INDEX].headers[0].attributeHeader,
                items: attributeHeaderItems[VIEW_BY_DIMENSION_INDEX][0]
            };
            expect(returnValue).toEqual(expectedValue);
        });
        it('should return the stack by attribute header with header items', () => {
            const returnValue = findAttributeInDimension(
                dimensions[STACK_BY_DIMENSION_INDEX],
                attributeHeaderItems[STACK_BY_DIMENSION_INDEX]
            );
            const expectedValue = {
                ...dimensions[STACK_BY_DIMENSION_INDEX].headers[0].attributeHeader,
                items: attributeHeaderItems[STACK_BY_DIMENSION_INDEX][0]
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
        it('should just return the original palette if there are no pop measures', () => {
            const measureGroup = dataSets
                .barChartWithoutAttributes
                .executionResponse
                .dimensions[1]
                .headers[0]
                .measureGroupHeader;
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
                .headers[0]
                .measureGroupHeader;
            const afm = dataSets.barChartWithPopMeasureAndViewByAttribute.executionRequest.afm;
            const originalColor = 0;
            const lighterModifier = 0.6;
            const lighterColor = Math.floor((255 - originalColor) * lighterModifier);
            const customPalette = [`rgb(${originalColor},${originalColor},${originalColor})`, 'rgb(128,128,128)'];
            const updatedPalette = getColorPalette(customPalette, measureGroup, afm);
            expect(updatedPalette).toEqual([`rgb(${lighterColor},${lighterColor},${lighterColor})`, ...customPalette.slice(1)]);
        });
    });

    describe('getSeriesItemData', () => {
        // const dataSetKeys = Object.keys(dataSets).filter(dataSetKey => dataSetKey !== 'default');

        // function getUseCases(useCaseIds) {
        //     return dataSetKeys.filter(dataSetKey => (useCaseIds.includes(dataSetKey))).map((dataSetKey) => {
        //         const name = dataSetKey.replace(/([A-Z0-9])/g, ' $1').toLowerCase();
        //         const dataSet = dataSets[dataSetKey];
        //         return {
        //             name,
        //             dataSet
        //         };
        //     });
        // }

        describe('in usecase of bar chart with pop measure and view by attribute', () => {
            const parameters = getSeriesItemDataParameters(dataSets.barChartWithPopMeasureAndViewByAttribute, 0);
            const seriesItemData = getSeriesItemData(
                ...parameters,
                'column',
                DEFAULT_COLOR_PALETTE
            );

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
            const parameters = getSeriesItemDataParameters(dataSets.pieChartWithMetricsOnly, 0);
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
            const parameters = getSeriesItemDataParameters(dataSets.barChartWithViewByAttribute, 0);
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
            const dataSet = dataSets.barChartWith3MetricsAndViewByAttribute;
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
            const dataSet = dataSets.barChartWithStackByAndViewByAttributes;
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
            const dataSet = dataSets.barChartWithStackByAndViewByAttributes;
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
            const dataSet = dataSets.pieChartWithMetricsOnly;
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
            const dataSet = dataSets.barChartWith3MetricsAndViewByAttribute;
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
            const dataSet = dataSets.barChartWithStackByAndViewByAttributes;
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

    describe('getChartOptions', () => {
        // categories

    });

    describe.skip('generateTooltipFn', () => {
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

    describe.skip('column/bar/line chart options', () => {
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

    describe.skip('pie chart options', () => {
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
