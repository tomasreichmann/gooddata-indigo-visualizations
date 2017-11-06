export const EXECUTION_REQUEST_1A_2M = {
    afm: {
        attributes: [
            {
                localIdentifier: '1st_attr_local_identifier',
                displayForm: {
                    uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id'
                }
            }
        ],
        measures: [
            {
                localIdentifier: '1st_measure_local_identifier',
                definition: {
                    measure: {
                        item: {
                            uri: '/gdc/md/project_id/obj/1st_measure_uri_id'
                        }
                    }
                },
                format: '#,##0'
            },
            {
                localIdentifier: '2nd_measure_local_identifier',
                definition: {
                    measure: {
                        item: {
                            uri: '/gdc/md/project_id/obj/2nd_measure_uri_id'
                        }
                    }
                },
                format: '[red]#,##0'
            }
        ]
    },
    resultSpec: {
        dimensions: [
            {
                identifier: 'a',
                itemIdentifiers: ['1st_attr_local_identifier']
            },
            {
                identifier: 'm',
                itemIdentifiers: ['measureGroup']
            }
        ]
    }
};

export const EXECUTION_RESPONSE_1A_2M = {
    dimensions: [
        {
            name: 'a',
            headers: [
                {
                    attributeHeader: {
                        uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id',
                        identifier: '1st_attr_df_identifier',
                        localIdentifier: '1st_attr_local_identifier',
                        name: 'Name'
                    }
                }
            ]
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
                                    name: '# of Open Opps.',
                                    format: '#,##0'
                                }
                            },
                            {
                                measureHeaderItem: {
                                    uri: '/gdc/md/project_id/obj/2nd_measure_uri_id',
                                    identifier: '2nd_measure_identifier',
                                    localIdentifier: '2nd_measure_local_identifier',
                                    name: '# of Opportunities',
                                    format: '[red]#,##0'
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

export const EXECUTION_RESULT_1A_2M = {
    data: [
        [
            '30'
        ],
        [
            '1324'
        ]
    ],
    attributeHeaderItems: [
        [
            [
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id/elements?id=1',
                        name: 'Wile E. Coyote'
                    }
                }
            ]
        ],
        [] // empty array => there are no attributes in second dimension
    ],
    paging: {
        size: [
            3,
            4
        ],
        offset: [
            0,
            0
        ],
        overallSize: [
            3,
            4
        ]
    }
};

export const TABLE_HEADERS_1A_2M = [
    {
        type: 'attribute',
        uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id',
        identifier: '1st_attr_df_identifier',
        localIdentifier: '1st_attr_local_identifier',
        name: 'Name'
    }, {
        type: 'measure',
        uri: '/gdc/md/project_id/obj/1st_measure_uri_id',
        identifier: '1st_measure_identifier',
        localIdentifier: '1st_measure_local_identifier',
        name: '# of Open Opps.',
        format: '#,##0'
    }, {
        type: 'measure',
        uri: '/gdc/md/project_id/obj/2nd_measure_uri_id',
        identifier: '2nd_measure_identifier',
        localIdentifier: '2nd_measure_local_identifier',
        name: '# of Opportunities',
        format: '[red]#,##0'
    }
];

export const TABLE_ROWS_1A_2M = [
    [
        {
            uri: '/gdc/md/project_id/obj/1st_attr_df_uri_id/elements?id=1',
            name: 'Wile E. Coyote'
        },
        '30',
        '1324'
    ]
];
