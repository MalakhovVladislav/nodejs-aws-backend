import { ClientConfig } from "pg"

const config: ClientConfig = {
    user: process.env.PG_USERNAME,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: +process.env.PG_PORT,
}

export default config