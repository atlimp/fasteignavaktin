DROP TABLE IF EXISTS REALESTATE;
DROP TABLE IF EXISTS ZIPCODE;

CREATE TABLE ZIPCODE (
    ZIP INT PRIMARY KEY,
    CITY VARCHAR(100),
    NEIGHBORHOOD VARCHAR(100),
    LATITUDE FLOAT,
    LONGITUDE FLOAT
);

CREATE TABLE REALESTATE (
    ID INT PRIMARY KEY,
    PRICE BIGINT,
    PRICEPERSQMTR FLOAT,
    REALESTATEVALUE BIGINT,
    FIREINSVALUE BIGINT,
    CONSTRUCTIONYEAR INT,
    ADDRESS VARCHAR(100),
    DESCRIPTION TEXT,
    ZIP INT,
    ROOMS INT,
    BATHROOMS INT,
    BEDROOMS INT,
    TYPE VARCHAR(10),
    CREATED TIMESTAMP,
    SIZE FLOAT,
    LATITUDE FLOAT,
    LONGITUDE FLOAT,
    IMAGE VARCHAR(500),
    FOREIGN KEY (ZIP) REFERENCES ZIPCODE(ZIP)
);