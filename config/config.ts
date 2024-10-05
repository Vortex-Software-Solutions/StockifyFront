export enum Environmet {
    PROD = "prod",
    DEV = "dev",
    LOCAL = "local"
}

export const CONFIG = {
    environment: Environmet.LOCAL,
    prod: {
        baseUrl: 'https://stockifyback-a0ekgfhzbxdzb3g8.eastus-01.azurewebsites.net/api',

    },
    dev: {
        baseUrl: 'http://localhost:5000/api/',
    },
    local: {
        baseUrl: "http://localhost:5000/api/"
    }
}