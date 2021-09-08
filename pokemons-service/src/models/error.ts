export interface Error {
    data: {
        code: number
        message: string
    }
}

export const badRequestMsg = "Bad Request"
export const internalServerError = "Internal server error"
export const notFoundMsg = "Not found"