export interface UnexpectedErrorException {
    kind: "UnexpectedErrorException"
    error: Error
}

export type DataError = UnexpectedErrorException