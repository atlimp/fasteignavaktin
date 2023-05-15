export enum Order {
    asc = 'ASC',
    desc = 'DESC',
}

export enum OrderByCols {
    price = 'PRICE',
    realEstateValue = 'REALESTATEVALUE',
    fireInsValue = 'FIREINSVALUE',
    constructionYear = 'CONSTRUCTIONYEAR',
    rooms = 'ROOMS',
    bathrooms = 'BATHROOMS',
    bedrooms = 'BEDROOMS',
    size = 'SIZE',
    pricePerSqMtr = 'PRICEPERSQMTR',
    created = 'CREATED',
}

export enum AndOrNone {
    And = 'AND',
    Or = 'OR',
    None = '',
}

export enum SQLOperator {
    eq = '=',
    gt = '>',
    lt = '<',
}