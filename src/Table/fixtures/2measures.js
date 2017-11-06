export const EXECUTION_REQUEST_2M = {
    afm: {
        measures: [
            {
                localIdentifier: '1st_measure_local_identifier',
                definition: {
                    measure: {
                        item: {
                            uri: '/gdc/md/project_id/obj/1st_measure_uri_id'
                        }
                    }
                }
            },
            {
                localIdentifier: '2nd_measure_local_identifier',
                definition: {
                    measure: {
                        item: {
                            identifier: '2nd_measure_identifier'
                        }
                    }
                }
            }
        ]
    },
    resultSpec: {
        dimensions: [
            {
                name: 'a',
                itemIdentifiers: []
            },
            {
                name: 'm',
                itemIdentifiers: ['measureGroup']
            }
        ]
    }
};

export const EXECUTION_RESPONSE_2M = {
    dimensions: [
        {
            name: 'a',
            headers: []
        },
        {
            name: 'm',
            headers: [
                {
                    measureGroupHeader: {
                        items: [
                            {
                                measureHeaderItem: {
                                    uri: '/gdc/md/project_id/obj/1st_measure_uri_id',
                                    identifier: '1st_measure_identifier',
                                    localIdentifier: '1st_measure_local_identifier',
                                    name: 'Lost',
                                    format: '$#,##0.00'
                                }
                            },
                            {
                                measureHeaderItem: {
                                    uri: '/gdc/md/project_id/obj/2nd_measure_uri_id',
                                    identifier: '2nd_measure_identifier',
                                    localIdentifier: '2nd_measure_local_identifier',
                                    name: 'Won',
                                    format: '[red]$#,##0.00'
                                }
                            }
                        ]
                    }
                }
            ]
        }
    ],
    links: {
        executionResult: '/gdc/app/projects/project_id/executionResults/foo?q=bar&c=baz&dimension=a&dimension=m'
    }
};

export const EXECUTION_RESULT_2M = {
    data: [
        [
            '42470571.16'
        ],
        [
            '38310753.45'
        ]
    ],
    attributeHeaderItems: [
        [], // empty array => there are no attributes in first dimension
        [] // empty array => there are no attributes in second dimension
    ],
    paging: {
        size: [
            2,
            1
        ],
        offset: [
            0,
            0
        ],
        overallSize: [
            2,
            1
        ]
    }
};

export const TABLE_HEADERS_2M = [
    {
        type: 'measure',
        uri: '/gdc/md/project_id/obj/1st_measure_uri_id',
        identifier: '1st_measure_identifier',
        localIdentifier: '1st_measure_local_identifier',
        name: 'Lost',
        format: '$#,##0.00'
    },
    {
        type: 'measure',
        uri: '/gdc/md/project_id/obj/2nd_measure_uri_id',
        identifier: '2nd_measure_identifier',
        localIdentifier: '2nd_measure_local_identifier',
        name: 'Won',
        format: '[red]$#,##0.00'
    }
];

export const TABLE_ROWS_2M = [
    [
        '42470571.16',
        '38310753.45'
    ]
];
