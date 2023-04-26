import Zip from './zip';

class Property {
    
    id: number;

    price!: number;

    realEstateValue!: number;

    fireInsuranceValue!: number;

    constructionYear!: number;

    address!: string;

    description!: string;

    zip!: Zip;

    rooms!: number;

    bathrooms!: number;

    bedrooms!: number;

    type!: string;

    created!: Date;

    size!: number;

    latitude!: number;

    longitude!: number;

    image!: string;
    
}

export default Property;