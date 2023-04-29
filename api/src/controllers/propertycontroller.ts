import { IBaseController } from '../interfaces/interfaces';
import DatabaseService from '../services/databaseservice';
import Property from '../model/property';
import { GET_PROPERTIES_BY_AREA, GET_PROPERTIES_BY_ZIP, GET_PROPERTY } from '../db/queries';
import NotFoundException from '../exceptions/notfoundexception';
import Zip from '../model/zip';

class PropertyController implements IBaseController {

    async getPropertiesByZip(zip: string, offset: number, limit: number): Promise<Property[]> {
        const db = new DatabaseService();

        const results = await db.get(GET_PROPERTIES_BY_ZIP, { $zip: zip, $offset: offset, $limit: limit });

        db.close();

        return results.map(x => {
            return {
                id: x.ID,
                address: x.ADDRESS,
                price: x.PRICE,
                size: x.SIZE,
                zip: {
                    zipCode: x.ZIP
                },
                image: x.IMAGE,
                created: x.CREATED,
                latitude: x.LATITUDE,
                longitude: x.LONGITUDE,
                url: `https://www.mbl.is/fasteignir/fasteign/${x.ID}/`
            } as Property;
        });
    }

    async getPropertiesByArea(latMin: number, latMax: number, lonMin: number, lonMax: number, offset: number, limit: number): Promise<Property[]> {
        const db = new DatabaseService();

        const results = await db.get(GET_PROPERTIES_BY_AREA, { 
            $latMin: latMin,
            $latMax: latMax,
            $lonMin: lonMin,
            $lonMax: lonMax,
            $offset: offset,
            $limit: limit,
        });

        db.close();

        return results.map(x => {
            return {
                id: x.ID,
                address: x.ADDRESS,
                price: x.PRICE,
                size: x.SIZE,
                zip: {
                    zipCode: x.ZIP
                },
                image: x.IMAGE,
                created: x.CREATED,
                latitude: x.LATITUDE,
                longitude: x.LONGITUDE,
                url: `https://www.mbl.is/fasteignir/fasteign/${x.ID}/`
            } as Property;
        });
    }

    async getPropertyById(id: string): Promise<Property> {
        const db = new DatabaseService();

        const [ results ] = await db.get(GET_PROPERTY, { $id: id });

        if (!results) {
            throw new NotFoundException(`Property ${id}`);
        }

        const zip = { 
            zipCode: results.ZIP,
            city: results.CITY,
            neighborhood: results.NEIGHBORHOOD || '',
        } as Zip;

        return {
            id: results.ID,
            price: results.PRICE,
            realEstateValue: results.REALESTATEVALUE,
            fireInsuranceValue: results.FIREINSVALUE,
            constructionYear: results.CONSTRUCTIONYEAR,
            address: results.ADDRESS,
            description: results.DESCRIPTION,
            zip: zip,
            rooms: results.ROOMS,
            bathrooms: results.BATHROOMS,
            bedrooms: results.BEDROOMS,
            type: results.TYPE,
            created: results.CREATED,
            size: results.SIZE,
            latitude: results.LATITUDE,
            longitude: results.LONGITUDE,
            image: results.IMAGE,
            url: `https://www.mbl.is/fasteignir/fasteign/${results.ID}/`
        } as Property;

        
    }
}

export default PropertyController;