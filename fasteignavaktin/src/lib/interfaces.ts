export interface ZipData {
    zipCode: number;
    city: string;
    neighborhood: string;
}

export interface PropertyData {
    id: number;
    price: number;
    realEstateValue: number;
    fireInsuranceValue: number;
    constructionYear: number;
    address: string;
    description: string;
    zip: ZipData;
    rooms: number;
    bathrooms: number;
    bedrooms: number;
    type: string;
    created: Date;
    size: number;
    latitude: number;
    longitude: number;
    image: string;
    url: string;
}

export interface LatLonBounds {
    latMin: number;
    latMax: number;
    lonMin: number;
    lonMax: number;
}