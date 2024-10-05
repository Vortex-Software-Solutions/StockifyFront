export interface ErrorResponse {
    data: {
        type: string
        title: string // Mensaje del servidor
        status: number
        traceId: string
    }
}