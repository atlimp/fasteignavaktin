import Sqlite3Client from "./dbclient.js";
import { readFile } from 'fs';
import { promisify } from 'util';
import dotenv from 'dotenv';
dotenv.config();

const asyncReadFile = promisify(readFile);

async function main() {
    const buffer = await asyncReadFile('/home/node/app/db/main.sql', 'utf-8');

    const queries = buffer.split(';');

    const client = new Sqlite3Client(process.env.DB_FILENAME);
    
    for (let query of queries) {
        if (query) {
            await client.run(query);
        }
    }

    console.log('created db');
}

main();