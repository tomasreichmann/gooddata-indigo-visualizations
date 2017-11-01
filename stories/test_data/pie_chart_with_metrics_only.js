// pie chart with metrics only

export const afm = {
    measures: [
        {
            definition: {
                measure: {
                    item: {
                        uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1279'
                    }
                }
            },
            alias: 'Amount 1',
            localIdentifier: 'amount-1',
            format: '#,##0.00'
        },
        {
            definition: {
                measure: {
                    item: {
                        uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1279'
                    }
                }
            },
            alias: 'Amount 2',
            localIdentifier: 'amount-2',
            format: '#,##0.00'
        },
        {
            definition: {
                measure: {
                    item: {
                        uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1279'
                    }
                }
            },
            alias: 'Amount 3',
            localIdentifier: 'amount-3',
            format: '#,##0.00'
        }
    ]
};

export const resultSpec = {
    dimensions: [
        {
            name: 'x',
            itemIdentifiers: [
                'metricGroup'
            ]
        },
        {
            name: 'y',
            itemIdentifiers: []
        }
    ]
};

export const request = {
    execution: {
        afm,
        resultSpec
    }
};

export const data = {
    executionResponse: {
        links: {
            url: '/gdc/app/PROJECT_ID/executionResults/EXECUTION_ID'
        },
        dimensions: [
            {
                name: 'x',
                headers: [
                    {
                        measureGroupHeader: {
                            items: [
                                {
                                    measureHeaderItem: {
                                        uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1279',
                                        identifier: 'amount.identifier',
                                        localIdentifier: 'amount-1',
                                        name: 'Amount',
                                        format: '#,##0.00'
                                    }
                                },
                                {
                                    measureHeaderItem: {
                                        uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1279',
                                        identifier: 'amount.identifier',
                                        localIdentifier: 'amount-2',
                                        name: 'Amount 2',
                                        format: '#,##0.00'
                                    }
                                },
                                {
                                    measureHeaderItem: {
                                        uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1279',
                                        identifier: 'amount.identifier',
                                        localIdentifier: 'amount-3',
                                        name: 'Amount 3',
                                        format: '#,##0.00'
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            {
                name: 'y',
                headers: []
            }
        ]
    },
    executionResult: {
        data: [
            [
                '116625456.54', '156625456', '106625456'
            ]
        ]
    }
};

export default {
    afm,
    resultSpec,
    request,
    data
};
