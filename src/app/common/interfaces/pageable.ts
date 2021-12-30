export interface pageableI<T> {
    content: T[],
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    number: number;
    sort: Sort2;
    size: number;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface Sort {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort2 {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
}
