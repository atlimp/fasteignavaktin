import { IBaseController, OrderBy } from '../interfaces/interfaces';
import DatabaseService from '../services/databaseservice';
import Property from '../model/property';
import { GET_PROPERTY } from '../db/queries';
import NotFoundException from '../exceptions/notfoundexception';
import Zip from '../model/zip';
import { QueryBuilder } from '../util/querybuilder';
import { AndOrNone, Order, OrderByCols, SQLOperator } from '../model/enums';

class PropertyController implements IBaseController {

    async getPropertiesByZip(zip: string, offset: number, limit: number, orderBy: OrderBy): Promise<Property[]> {
        const db = new DatabaseService();

        const query = new QueryBuilder()
            .from('REALESTATE')
            .select('ID')
            .select('ADDRESS')
            .select('PRICE')
            .select('PRICEPERSQMTR')
            .select('ZIP')
            .select('IMAGE')
            .select('CREATED')
            .select('LATITUDE')
            .select('LONGITUDE')
            .select('SIZE')
            .where('ZIP', SQLOperator.eq, zip, AndOrNone.None)
            .orderBy(orderBy)
            .limit(limit)
            .offset(offset)
            .build();

        const results = await db.get(query.query as string, query.params);

        db.close();

        return results.map(x => {
            return {
                id: x.ID,
                address: x.ADDRESS,
                price: x.PRICE,
                pricePerSqMtr: x.PRICEPERSQMTR,
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

    async getPropertiesByArea(latMin: number, latMax: number, lonMin: number, lonMax: number, offset: number, limit: number, orderBy: OrderBy): Promise<Property[]> {
        const db = new DatabaseService();

        const query = new QueryBuilder()
            .from('REALESTATE')
            .select('ID')
            .select('ADDRESS')
            .select('PRICE')
            .select('PRICEPERSQMTR')
            .select('ZIP')
            .select('IMAGE')
            .select('CREATED')
            .select('LATITUDE')
            .select('LONGITUDE')
            .select('SIZE')
            .where('LATITUDE', SQLOperator.gt, latMin, AndOrNone.And)
            .where('LATITUDE', SQLOperator.lt, latMax, AndOrNone.And)
            .where('LONGITUDE', SQLOperator.gt, lonMin, AndOrNone.And)
            .where('LONGITUDE', SQLOperator.lt, lonMax, AndOrNone.None)
            .orderBy(orderBy)
            .limit(limit)
            .offset(offset)
            .build();

        const results = await db.get(query.query as string, query.params);

        db.close();

        return results.map(x => {
            return {
                id: x.ID,
                address: x.ADDRESS,
                price: x.PRICE,
                pricePerSqMtr: x.PRICEPERSQMTR,
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
            pricePerSqMtr: results.PRICEPERSQMTR,
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