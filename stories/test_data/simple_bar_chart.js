// bar chart with just a single metric

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
            alias: 'Amount',
            localIdentifier: 'measure1',
            format: '#,##0.00'
        }
    ]
};

export const resultSpec = {
    dimensions: [
        {
            name: 'x',
            itemIdentifiers: []
        },
        {
            name: 'y',
            itemIdentifiers: [
                'metricGroup'
            ]
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
                headers: []
            },
            {
                name: 'y',
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
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    executionResult: {
        data: [
            [
                '116625456.54'
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
