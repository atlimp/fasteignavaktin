export async function deleteAllZipCodes(client) {
    let query = 'DELETE FROM ZIPCODE';

    await client.run(query);
}

export async function deleteAllRealEstates(client, zipCode) {
    let query = 'DELETE FROM REALESTATE';
    const params = {};
    
    if (zipCode) {
        query += ' WHERE ZIP = $zip';
        params.$zip = zipCode;
    }

    await client.run(query, params);
}

export async function insertZipCode(client, zipCode) {
    const query = 'INSERT INTO ZIPCODE(ZIP, CITY, NEIGHBORHOOD) VALUES($zip, $city, $neighborhood)';

    const params = {
        $zip: zipCode.zip,
        $city: zipCode.city,
        $neighborhood: zipCode.neighborhood,
    };

    await client.run(query, params);
}

export async function insertRealEstate(client, realEstate) {
    const query = 'INSERT INTO REALESTATE(ID, PRICE, REALESTATEVALUE, FIREINSVALUE, CONSTRUCTIONYEAR, ADDRESS, DESCRIPTION, ZIP, ROOMS, BATHROOMS, BEDROOMS, TYPE, CREATED, SIZE, LATITUDE, LONGITUDE, IMAGE) VALUES($id, $price, $realestatevalue, $fireinsvalue, $constryear, $address, $description, $zip, $rooms, $bathrooms, $bedrooms, $type, $created, $size, $lat, $lon, $img)';

    const params = {
        $id: realEstate.id,
        $price: realEstate.price,
        $realestatevalue: realEstate.realestatevalue,
        $fireinsvalue: realEstate.fireinsvalue,
        $constryear: realEstate.constryear,
        $address: realEstate.address,
        $description: realEstate.description,
        $zip: realEstate.zipcode,
        $rooms: realEstate.rooms,
        $bathrooms: realEstate.bathrooms,
        $bedrooms: realEstate.bedrooms,
        $type: realEstate.type,
        $created: realEstate.created,
        $size: realEstate.size,
        $lat: realEstate.latitude,
        $lon: realEstate.longitude,
        $img: realEstate.image,
    };

    await client.run(query, params);    
}

export async function getAllZipCodes(client) {
    const query = 'SELECT ZIP from ZIPCODE';

    const result = await client.get(query);

    return result.map(x => x.ZIP);
}

export async function getLatestCreated(client, zipCode) {
    const query = 'SELECT CREATED FROM REALESTATE WHERE ZIP = $zip ORDER BY CREATED DESC LIMIT 1';
    const params = {
        $zip: zipCode,
    };

    const [ result ] = await client.get(query, params);

    if (!result) {
        return (new Date('1970-01-01T00:00:00')).toISOString();
    }

    return result.CREATED;
}