// bar chart with a stackBy and viewBy attributes

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
            localIdentifier: 'amountMeasure',
            format: '#,##0.00'
        }
    ],
    attributes: [
        {
            displayForm: {
                uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1024'
            },
            localIdentifier: 'regionAttribute'
        },
        {
            displayForm: {
                uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1027'
            },
            localIdentifier: 'departmentAttribute'
        }
    ]
};

export const resultSpec = {
    dimensions: [
        {
            name: 'Amount',
            itemIdentifiers: [
                'departmentAttribute',
                'metricGroup'
            ]
        },
        {
            name: 'Region',
            itemIdentifiers: [
                'regionAttribute'
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
                name: 'Amount',
                headers: [
                    {
                        attributeHeader: {
                            uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1027',
                            identifier: 'department.identifier',
                            localIdentifier: 'departmentAttribute',
                            name: 'Department',
                            items: [
                                {
                                    attributeHeaderItem: {
                                        uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1027/elements?id=1226',
                                        identifier: 'department.identifier.1226',
                                        name: 'Direct Sales'
                                    }
                                },
                                {
                                    attributeHeaderItem: {
                                        uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1027/elements?id=1234',
                                        identifier: 'department.identifier.1234',
                                        name: 'Inside Sales'
                                    }
                                }
                            ]
                        }
                    },
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
                                        localIdentifier: 'amount-1',
                                        name: 'Amount',
                                        format: '#,##0.00'
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            {
                name: 'Region',
                headers: [
                    {
                        attributeHeader: {
                            uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1024',
                            identifier: 'region.identifier',
                            localIdentifier: 'regionAttribute',
                            name: 'Region',
                            items: [
                                {
                                    attributeHeaderItem: {
                                        uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1024/elements?id=1225',
                                        identifier: 'region.identifier.1226',
                                        name: 'East Coast'
                                    }
                                },
                                {
                                    attributeHeaderItem: {
                                        uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1024/elements?id=1237',
                                        identifier: 'region.identifier.1234',
                                        name: 'West Coast'
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
                '21978695.46',
                '6038400.96'
            ],
            [
                '58427629.5',
                '30180730.62'
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
