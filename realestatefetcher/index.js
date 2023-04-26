import { deleteAllRealEstates, insertZipCode, insertRealEstate, getAllZipCodes, getLatestCreated, deleteAllZipCodes } from "./dbservice.js";
import { getAllPostalCodes, getRealEstates } from "./graphql.js";
import Sqlite3Client from './dbclient.js';
import dotenv from 'dotenv';
dotenv.config();

async function insertRealEstateForPostalCode(client, zipCode, lastCreated) {
    let numResults = Infinity;
    let totalResults = 0;
    const limit = 16;
    
    await client.beginTransaction();
    while (numResults >= limit) {

        const realEstates = await getRealEstates(limit, zipCode, lastCreated);
        numResults = realEstates.length;
        totalResults += numResults;
        for (let realEstate of realEstates) {
            let image = '';

            if (realEstate.images && realEstate.images.length > 0) {
                image = realEstate.images[0].big;
            }

            realEstate.image = image;
            await insertRealEstate(client, realEstate);
            lastCreated = realEstate.created;
        }
    } 
    await client.commitTransaction();

    return totalResults;
}

async function insertAllZipCodes(client) {
    const zipCodes = await getAllPostalCodes();

    await client.beginTransaction();
    await Promise.all(zipCodes.map(x => {
        return insertZipCode(client, x);
    }));
    await client.commitTransaction();
}

async function cleanUpTables(client) {
    const zipCodes = await getAllZipCodes(client);
    
    for (let zipCode of zipCodes) {
        await client.beginTransaction();
        await deleteAllRealEstates(client, zipCode);
        await client.commitTransaction();
    }

    await client.beginTransaction();
    await deleteAllZipCodes(client);
    await client.commitTransaction();
}

async function insertRealEstates(client, zipCodes) {
    let sumRecords = 0;

    for (let zipCode of zipCodes) {
        const lastCreated = await getLatestCreated(client, zipCode);
        const numRecords = await insertRealEstateForPostalCode(client, zipCode, lastCreated);
        sumRecords += numRecords;
    }

    console.log(`${sumRecords} records inserted`);
}

async function main(args) {
    const fullSync = args.find(arg => arg === '--full-sync');

    const client = new Sqlite3Client(process.env.DB_FILENAME);

    if (fullSync) {
        await cleanUpTables(client);
        await insertAllZipCodes(client);
    }

    const zipCodes = await getAllZipCodes(client);

    await insertRealEstates(client, zipCodes);

    client.close();
}


main(process.argv);