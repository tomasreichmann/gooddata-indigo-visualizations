export const stackedBarConfig = { // TODO rewrite to EXECUTION_REQUEST
    type: 'column',
    buckets: {
        measures: [
            {
                measure: {
                    type: 'metric',
                    objectUri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/13465',
                    metricAttributeFilters: [],
                    showInPercent: false,
                    showPoP: false,
                    format: '#,##0',
                    sorts: []
                }
            }
        ],
        categories: [
            {
                category: {
                    type: 'attribute',
                    collection: 'attribute',
                    displayForm: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028'
                }
            },
            {
                category: {
                    type: 'attribute',
                    collection: 'stack',
                    displayForm: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805'
                }
            }
        ],
        filters: [
            {
                listAttributeFilter: {
                    attribute: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1025',
                    displayForm: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028',
                    default: {
                        negativeSelection: true,
                        attributeElements: []
                    }
                }
            },
            {
                listAttributeFilter: {
                    attribute: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1095',
                    displayForm: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805',
                    default: {
                        negativeSelection: true,
                        attributeElements: []
                    }
                }
            }
        ]
    }
};

export const EXECUTION_REQUEST = {
    afm: {},
    resultSpec: {}
};

export const EXECUTION_RESPONSE = {
    dimensions: [
        {
            name: 'a',
            headers: [
                {
                    attributeHeader: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028',
                        identifier: 'label.owner.id.name',
                        localIdentifier: 'owner_name',
                        name: 'Sales Rep (element 1, element 2, element 3, element 4, element 5, element 6, element 7, element 8, element 9, element 10, element 11)'
                    }
                },
                {
                    attributeHeader: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805',
                        identifier: 'label.stage.name.stagename',
                        localIdentifier: 'stage_name',
                        name: 'Stage Name'
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
                                    uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/13465',
                                    identifier: 'aaYh6Voua2yj',
                                    localIdentifier: 'num_of_open_opps',
                                    name: '# of Open Opps.',
                                    format: '#,##0'
                                }
                            }
                        ]
                    }
                }
            ]
        }
    ],
    links: {
        dataResult: '/gdc/app/projects/project_id/executionResults/foo?q=bar&c=baz&dimension=a&dimension=m'
    }
};

export const EXECUTION_RESULT = {
    data: [
        ['13', '11', '3', '2', '2', '2', '8', '11', '7', '1', '2', '8', '11', '9', '1', '3', '3', '11', '9', '4', '3', '1', '2', '5', '12', '6', '2', '5', '6', '11', '10', '1', '3', '4', '13', '5', '7', '1', '1', '2', '9', '7', '5', '2', '4', '4', '5', '8', '9', '2', '2', '6', '7', '9', '5', '1', '1', '3', '11', '11', '7', '2', '6', '5', '7', '8', '9', '1', '2', '3', '8', '5', '9', '3', '1', '4']
    ],
    attributeHeaderItems: [
        [
            [
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1224',
                        name: 'Adam Bradley'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1224',
                        name: 'Adam Bradley'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1224',
                        name: 'Adam Bradley'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1224',
                        name: 'Adam Bradley'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1224',
                        name: 'Adam Bradley'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1224',
                        name: 'Adam Bradley'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1227',
                        name: 'Alejandro Vabiano'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1227',
                        name: 'Alejandro Vabiano'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1227',
                        name: 'Alejandro Vabiano'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1227',
                        name: 'Alejandro Vabiano'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1227',
                        name: 'Alejandro Vabiano'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1228',
                        name: 'Alexsandr Fyodr'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1228',
                        name: 'Alexsandr Fyodr'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1228',
                        name: 'Alexsandr Fyodr'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1228',
                        name: 'Alexsandr Fyodr'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1228',
                        name: 'Alexsandr Fyodr'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1228',
                        name: 'Alexsandr Fyodr'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1229',
                        name: 'Cory Owens'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1229',
                        name: 'Cory Owens'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1229',
                        name: 'Cory Owens'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1229',
                        name: 'Cory Owens'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1229',
                        name: 'Cory Owens'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1229',
                        name: 'Cory Owens'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1230',
                        name: 'Dale Perdadtin'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1230',
                        name: 'Dale Perdadtin'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1230',
                        name: 'Dale Perdadtin'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1230',
                        name: 'Dale Perdadtin'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1230',
                        name: 'Dale Perdadtin'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1231',
                        name: 'Dave Bostadt'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1231',
                        name: 'Dave Bostadt'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1231',
                        name: 'Dave Bostadt'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1231',
                        name: 'Dave Bostadt'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1231',
                        name: 'Dave Bostadt'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1231',
                        name: 'Dave Bostadt'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1232',
                        name: 'Ellen Jones'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1232',
                        name: 'Ellen Jones'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1232',
                        name: 'Ellen Jones'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1232',
                        name: 'Ellen Jones'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1232',
                        name: 'Ellen Jones'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1232',
                        name: 'Ellen Jones'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1233',
                        name: 'Huey Jonas'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1233',
                        name: 'Huey Jonas'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1233',
                        name: 'Huey Jonas'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1233',
                        name: 'Huey Jonas'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1233',
                        name: 'Huey Jonas'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1233',
                        name: 'Huey Jonas'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1235',
                        name: 'Jessica Traven'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1235',
                        name: 'Jessica Traven'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1235',
                        name: 'Jessica Traven'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1235',
                        name: 'Jessica Traven'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1235',
                        name: 'Jessica Traven'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1235',
                        name: 'Jessica Traven'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1236',
                        name: 'John Jovi'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1236',
                        name: 'John Jovi'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1236',
                        name: 'John Jovi'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1236',
                        name: 'John Jovi'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1236',
                        name: 'John Jovi'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1236',
                        name: 'John Jovi'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1238',
                        name: 'Jon Jons'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1238',
                        name: 'Jon Jons'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1238',
                        name: 'Jon Jons'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1238',
                        name: 'Jon Jons'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1238',
                        name: 'Jon Jons'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1238',
                        name: 'Jon Jons'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1239',
                        name: 'Lea Forbes'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1239',
                        name: 'Lea Forbes'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1239',
                        name: 'Lea Forbes'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1239',
                        name: 'Lea Forbes'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1239',
                        name: 'Lea Forbes'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1239',
                        name: 'Lea Forbes'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1240',
                        name: 'Monique Babonas'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1240',
                        name: 'Monique Babonas'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1240',
                        name: 'Monique Babonas'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1240',
                        name: 'Monique Babonas'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1240',
                        name: 'Monique Babonas'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1028/elements?id=1240',
                        name: 'Monique Babonas'
                    }
                }
            ],
            [
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966643',
                        name: 'Interest'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966644',
                        name: 'Discovery'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=1251',
                        name: 'Short List'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966645',
                        name: 'Risk Assessment'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966646',
                        name: 'Conviction'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966647',
                        name: 'Negotiation'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966643',
                        name: 'Interest'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966644',
                        name: 'Discovery'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=1251',
                        name: 'Short List'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966645',
                        name: 'Risk Assessment'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966646',
                        name: 'Conviction'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966643',
                        name: 'Interest'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966644',
                        name: 'Discovery'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=1251',
                        name: 'Short List'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966645',
                        name: 'Risk Assessment'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966646',
                        name: 'Conviction'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966647',
                        name: 'Negotiation'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966643',
                        name: 'Interest'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966644',
                        name: 'Discovery'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=1251',
                        name: 'Short List'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966645',
                        name: 'Risk Assessment'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966646',
                        name: 'Conviction'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966647',
                        name: 'Negotiation'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966643',
                        name: 'Interest'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966644',
                        name: 'Discovery'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=1251',
                        name: 'Short List'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966645',
                        name: 'Risk Assessment'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966647',
                        name: 'Negotiation'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966643',
                        name: 'Interest'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966644',
                        name: 'Discovery'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=1251',
                        name: 'Short List'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966645',
                        name: 'Risk Assessment'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966646',
                        name: 'Conviction'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966647',
                        name: 'Negotiation'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966643',
                        name: 'Interest'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966644',
                        name: 'Discovery'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=1251',
                        name: 'Short List'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966645',
                        name: 'Risk Assessment'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966646',
                        name: 'Conviction'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966647',
                        name: 'Negotiation'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966643',
                        name: 'Interest'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966644',
                        name: 'Discovery'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=1251',
                        name: 'Short List'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966645',
                        name: 'Risk Assessment'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966646',
                        name: 'Conviction'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966647',
                        name: 'Negotiation'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966643',
                        name: 'Interest'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966644',
                        name: 'Discovery'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=1251',
                        name: 'Short List'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966645',
                        name: 'Risk Assessment'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966646',
                        name: 'Conviction'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966647',
                        name: 'Negotiation'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966643',
                        name: 'Interest'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966644',
                        name: 'Discovery'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=1251',
                        name: 'Short List'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966645',
                        name: 'Risk Assessment'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966646',
                        name: 'Conviction'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966647',
                        name: 'Negotiation'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966643',
                        name: 'Interest'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966644',
                        name: 'Discovery'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=1251',
                        name: 'Short List'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966645',
                        name: 'Risk Assessment'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966646',
                        name: 'Conviction'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966647',
                        name: 'Negotiation'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966643',
                        name: 'Interest'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966644',
                        name: 'Discovery'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=1251',
                        name: 'Short List'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966645',
                        name: 'Risk Assessment'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966646',
                        name: 'Conviction'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966647',
                        name: 'Negotiation'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966643',
                        name: 'Interest'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966644',
                        name: 'Discovery'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=1251',
                        name: 'Short List'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966645',
                        name: 'Risk Assessment'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966646',
                        name: 'Conviction'
                    }
                },
                {
                    attributeHeaderItem: {
                        uri: '/gdc/md/tgqkx9leq2tntui4j6fp08tk6epftziu/obj/1805/elements?id=966647',
                        name: 'Negotiation'
                    }
                }
            ]
        ],
        [] // empty array => there are no attributes in second dimension
    ],
    paging: {
        size: [
            1,
            76
        ],
        offset: [
            0,
            0
        ],
        overallSize: [
            1,
            76
        ]
    }
};
