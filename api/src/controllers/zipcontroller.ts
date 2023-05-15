import NotFoundException from '../exceptions/notfoundexception';
import { IBaseController } from '../interfaces/interfaces';
import { AndOrNone, SQLOperator } from '../model/enums';
import Zip from '../model/zip';
import DatabaseService from '../services/databaseservice';
import { QueryBuilder } from '../util/querybuilder';

class ZipController implements IBaseController {

    async getAllZipCodes(): Promise<Zip[]> {
        const db = new DatabaseService();

        const query = new QueryBuilder()
            .from('ZIPCODE')
            .select('ZIP')
            .select('CITY')
            .select('NEIGHBORHOOD')
            .select('LATITUDE')
            .select('LONGITUDE')
            .build();
            
        const result = await db.get(query.query as string, query.params);

        db.close();
            
        return result.map(x => {
            return {
                zipCode: Number(x.ZIP),
                city: x.CITY,
                neighborhood: x.NEIGHBORHOOD || '',
                latitude: x.LATITUDE,
                longitude: x.LONGITUDE,
            } as Zip;
        });
    }
    
    async getZipCode(zipCode: string): Promise<Zip> {
        const db = new DatabaseService();
        
        const query = new QueryBuilder()
            .from('ZIPCODE')
            .select('ZIP')
            .select('CITY')
            .select('NEIGHBORHOOD')
            .select('LATITUDE')
            .select('LONGITUDE')
            .where('ZIP', SQLOperator.eq, zipCode, AndOrNone.None)
            .build();
            
        const [ result ] = await db.get(query.query as string, query.params);
        
        db.close();
        
        if (!result) {
            throw new NotFoundException(`Zip code ${zipCode}`);
        }
        
        return {
            zipCode: Number(result.ZIP),
            city: result.CITY,
            neighborhood: result.NEIGHBORHOOD || '',
            latitude: result.LATITUDE,
            longitude: result.LONGITUDE,
        } as Zip;
    }
}

export default ZipController;