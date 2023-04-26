import { GET_ALL_ZIPCODES, GET_ZIPCODE } from '../db/queries';
import NotFoundException from '../exceptions/notfoundexception';
import { IBaseController } from '../interfaces/interfaces';
import Zip from '../model/zip';
import DatabaseService from '../services/databaseservice';

class ZipController implements IBaseController {

    async getAllZipCodes(): Promise<Zip[]> {
        const db = new DatabaseService();

        const result = await db.get(GET_ALL_ZIPCODES);

        db.close();

        return result.map(x => {
            return {
                zipCode: Number(x.ZIP),
                city: x.CITY,
                neighborhood: x.NEIGHBORHOOD || '',
            } as Zip;
        });
    }

    async getZipCode(zipCode: string): Promise<Zip> {
        const db = new DatabaseService();

        const [ result ] = await db.get(GET_ZIPCODE, { $zip: zipCode });

        db.close();

        if (!result) {
            throw new NotFoundException(`Zip code ${zipCode}`);
        }

        return {
            zipCode: Number(result.ZIP),
            city: result.CITY,
            neighborhood: result.NEIGHBORHOOD || '',
        } as Zip;
    }
}

export default ZipController;