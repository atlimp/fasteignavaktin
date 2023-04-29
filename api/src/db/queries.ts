// ZIP
export const GET_ALL_ZIPCODES = 'SELECT ZIP, CITY, NEIGHBORHOOD, LATITUDE, LONGITUDE FROM ZIPCODE';
export const GET_ZIPCODE = 'SELECT ZIP, CITY, NEIGHBORHOOD, LATITUDE, LONGITUDE FROM ZIPCODE WHERE ZIP = $zip';

// PROPERTIES
export const GET_PROPERTIES_BY_ZIP = `SELECT 
                                        ID, ADDRESS, PRICE, ZIP, IMAGE, CREATED, LATITUDE, LONGITUDE, SIZE
                                        FROM REALESTATE
                                        WHERE ZIP = $zip
                                        ORDER BY CREATED DESC
                                        LIMIT $limit OFFSET $offset`;

export const GET_PROPERTIES_BY_AREA = `SELECT 
                                        ID, ADDRESS, PRICE, ZIP, IMAGE, CREATED, LATITUDE, LONGITUDE, SIZE
                                        FROM REALESTATE
                                        WHERE LATITUDE <= $latMax AND LATITUDE >= $latMin AND LONGITUDE <= $lonMax AND LONGITUDE >= $lonMin
                                        ORDER BY CREATED DESC
                                        LIMIT $limit OFFSET $offset`;


export const GET_PROPERTY = `SELECT
                                t1.ID, t1.PRICE, t1.REALESTATEVALUE, t1.FIREINSVALUE, t1.CONSTRUCTIONYEAR,
                                t1.ADDRESS, t1.DESCRIPTION, t1.ZIP, t2.CITY, t2.NEIGHBORHOOD, t1.ROOMS,
                                t1.BATHROOMS, t1.BEDROOMS, t1.TYPE, t1.CREATED, t1.SIZE, t1.LATITUDE, t1.LONGITUDE, t1.IMAGE
                                FROM REALESTATE t1 JOIN ZIPCODE t2 ON t1.ZIP = t2.ZIP WHERE t1.ID = $id`;

// OTHER
export const BEGIN_TRANSACTION = 'BEGIN TRANSACTION';
export const COMMIT_TRANSACTION = 'COMMIT';
export const ROLLBACK_TRANSACTION = 'ROLLBACK';