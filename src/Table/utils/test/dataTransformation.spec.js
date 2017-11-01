import { getHeaders, getRows } from '../dataTransformation';

import {
    EXECUTION_RESPONSE_1A,
    EXECUTION_RESULT_1A,
    TABLE_HEADERS_1A,
    TABLE_ROWS_1A
} from '../../fixtures/1attribute';

import {
    EXECUTION_RESPONSE_2A,
    EXECUTION_RESULT_2A,
    TABLE_HEADERS_2A,
    TABLE_ROWS_2A
} from '../../fixtures/2attributes';

import {
    EXECUTION_RESPONSE_1M,
    EXECUTION_RESULT_1M,
    TABLE_HEADERS_1M,
    TABLE_ROWS_1M
} from '../../fixtures/1measure';

import {
    EXECUTION_RESPONSE_2M,
    EXECUTION_RESULT_2M,
    TABLE_HEADERS_2M,
    TABLE_ROWS_2M
} from '../../fixtures/2measures';

import {
    EXECUTION_RESPONSE_1A_2M,
    EXECUTION_RESULT_1A_2M,
    TABLE_HEADERS_1A_2M,
    TABLE_ROWS_1A_2M
} from '../../fixtures/1attribute2measures';

import {
    EXECUTION_RESPONSE_2A_1M,
    EXECUTION_RESULT_2A_1M,
    TABLE_HEADERS_2A_1M,
    TABLE_ROWS_2A_1M
} from '../../fixtures/2attributes1measure';

import {
    EXECUTION_RESPONSE_2A_3M,
    EXECUTION_RESULT_2A_3M,
    TABLE_HEADERS_2A_3M,
    TABLE_ROWS_2A_3M
} from '../../fixtures/2attributes3measures';

import {
    EXECUTION_RESPONSE_POP,
    EXECUTION_RESULT_POP,
    TABLE_HEADERS_POP,
    TABLE_ROWS_POP
} from '../../fixtures/periodOverPeriod';

describe('Table utils - Data transformation', () => {
    describe('One attribute', () => {
        it('should get headers', () => {
            const headers = getHeaders(EXECUTION_RESPONSE_1A);
            expect(headers).toEqual(TABLE_HEADERS_1A);
        });

        it('should get rows', () => {
            const rows = getRows(EXECUTION_RESULT_1A);
            expect(rows).toEqual(TABLE_ROWS_1A);
        });
    });

    describe('Two attributes', () => {
        it('should get headers', () => {
            const headers = getHeaders(EXECUTION_RESPONSE_2A);
            expect(headers).toEqual(TABLE_HEADERS_2A);
        });

        it('should get rows', () => {
            const rows = getRows(EXECUTION_RESULT_2A);
            expect(rows).toEqual(TABLE_ROWS_2A);
        });
    });

    describe('One measure', () => {
        it('should get headers', () => {
            const headers = getHeaders(EXECUTION_RESPONSE_1M);
            expect(headers).toEqual(TABLE_HEADERS_1M);
        });

        it('should get rows', () => {
            const rows = getRows(EXECUTION_RESULT_1M);
            expect(rows).toEqual(TABLE_ROWS_1M);
        });
    });

    describe('Two measures', () => {
        it('should get headers', () => {
            const headers = getHeaders(EXECUTION_RESPONSE_2M);
            expect(headers).toEqual(TABLE_HEADERS_2M);
        });

        it('should get rows', () => {
            const rows = getRows(EXECUTION_RESULT_2M);
            expect(rows).toEqual(TABLE_ROWS_2M);
        });
    });

    describe('One attributes and two measures', () => {
        it('should get headers', () => {
            const headers = getHeaders(EXECUTION_RESPONSE_1A_2M);
            expect(headers).toEqual(TABLE_HEADERS_1A_2M);
        });

        it('should get rows', () => {
            const rows = getRows(EXECUTION_RESULT_1A_2M);
            expect(rows).toEqual(TABLE_ROWS_1A_2M);
        });
    });

    describe('Two attributes and one measure', () => {
        it('should get headers', () => {
            const headers = getHeaders(EXECUTION_RESPONSE_2A_1M);
            expect(headers).toEqual(TABLE_HEADERS_2A_1M);
        });

        it('should get rows', () => {
            const rows = getRows(EXECUTION_RESULT_2A_1M);
            expect(rows).toEqual(TABLE_ROWS_2A_1M);
        });
    });

    describe('Two attributes and three measures', () => {
        it('should get headers', () => {
            const headers = getHeaders(EXECUTION_RESPONSE_2A_3M);
            expect(headers).toEqual(TABLE_HEADERS_2A_3M);
        });

        it('should get rows', () => {
            const rows = getRows(EXECUTION_RESULT_2A_3M);
            expect(rows).toEqual(TABLE_ROWS_2A_3M);
        });
    });

    describe('PoP', () => {
        it('should get headers', () => {
            const headers = getHeaders(EXECUTION_RESPONSE_POP);
            expect(headers).toEqual(TABLE_HEADERS_POP);
        });

        it('should get rows', () => {
            const rows = getRows(EXECUTION_RESULT_POP);
            expect(rows).toEqual(TABLE_ROWS_POP);
        });
    });

    describe('Exceptions', () => {
        it('should throw exception if number of dimensions is equal zero', () => {
            expect(() => {
                getHeaders({
                    executionResponse: {
                        dimensions: []
                    }
                });
            }).toThrow('Number of dimensions must be equal two');
        });

        it('should throw exception if number of dimensions is equal one', () => {
            expect(() => {
                getHeaders({
                    executionResponse: {
                        dimensions: [
                            { name: 'First dimension', headers: [] }
                        ]
                    }
                });
            }).toThrow('Number of dimensions must be equal two');
        });

        it('should throw exception if number of dimensions is equal three', () => {
            expect(() => {
                getHeaders({
                    executionResponse: {
                        dimensions: [
                            { name: 'First dimension', headers: [] },
                            { name: 'Second dimension', headers: [] },
                            { name: 'Third dimension', headers: [] }
                        ]
                    }
                });
            }).toThrow('Number of dimensions must be equal two');
        });
    });
});
