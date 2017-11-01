// bar chart with just a single metric

export const afm = {
    measures: [
        {
            definition: {
                measure: {
                    item: {
                        uri: '/gdc/md/FoodMartDemo/obj/8334'
                    }
                }
            },
            alias: 'measure alias 1',
            localIdentifier: 'amount-1',
            format: '#,##0.00'
        }
    ],
    attributes: [
        {
            displayForm: {
                uri: '/gdc/md/FoodMartDemo/obj/124'
            },
            localIdentifier: 'departmentAttribute'
        }
    ]
};

export const resultSpec = {
    dimensions: [
        {
            name: 'x',
            itemIdentifiers: [
                'departmentAttribute'
            ]
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
                headers: [
                    {
                        attributeHeader: {
                            uri: '/gdc/md/FoodMartDemo/obj/124',
                            identifier: 'department.identifier',
                            localIdentifier: 'departmentAttribute',
                            name: 'Department',
                            items: [
                                {
                                    attributeHeaderItem: {
                                        id: '/gdc/md/FoodMartDemo/obj/124/elements?id=3200',
                                        name: 'Cost of Goods Sold',
                                        type: 'element'
                                    }
                                },
                                {
                                    attributeHeaderItem: {
                                        id: '/gdc/md/FoodMartDemo/obj/124/elements?id=3100',
                                        name: 'Gross Sales',
                                        type: 'element'
                                    }
                                },
                                {
                                    attributeHeaderItem: {
                                        id: '/gdc/md/FoodMartDemo/obj/124/elements?id=4400',
                                        name: 'Lease',
                                        type: 'element'
                                    }
                                },
                                {
                                    attributeHeaderItem: {
                                        id: '/gdc/md/FoodMartDemo/obj/124/elements?id=6000',
                                        name: 'Salaries',
                                        type: 'element'
                                    }
                                }
                            ]
                        }
                    }
                ]
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
                '-12958511.8099999',
                '25315434.8199999',
                '-2748323.76',
                '-7252542.67'
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
