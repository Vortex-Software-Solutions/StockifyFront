export enum Environmet {
    PROD = "prod",
    DEV = "dev",
    LOCAL = "local"
}

export const CONFIG = {
    environment: Environmet.LOCAL,
    prod: {
        baseUrl: 'https://api-stockify.vortexsoftware.net/api/',
    },
    dev: {
        baseUrl: 'http://localhost:5000/api/',
    },
    local: {
        baseUrl: "http://localhost:5000/api/"
    }
}