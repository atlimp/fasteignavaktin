import express, { NextFunction, Request, Response, Router } from 'express';
import PropertyController from '../controllers/propertycontroller';
import { catchAllErrors } from '../util/util';
import BadRequestException from '../exceptions/badrequestexception';
import { IBaseRouter, OrderBy } from '../interfaces/interfaces';
import { Order, OrderByCols } from '../model/enums';

class PropertyRouter implements IBaseRouter {

    path = '/properties';
    
    router: Router = express.Router();
    
    constructor() {
        this.initMiddleware();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/area', catchAllErrors(this.validateAreaQuery), catchAllErrors(this.getPropertiesByArea));
        this.router.get('/zip/:zip', catchAllErrors(this.getPropertiesByZip));
        this.router.get('/:id', catchAllErrors(this.getPropertyById));
    }

    initMiddleware() {
    }
    
    async getPropertiesByZip(req: Request, res: Response) {
        const { zip } = req.params;
        const {
            offset: offsetIn,
            limit: limitIn,
            orderBy: orderByColIn = 'created',
            asc_desc: asc_descIn = 'desc',
        } = req.query;

        const offset = Number(offsetIn) || 0;
        const limit = Number(limitIn) || 20;

        let colName = OrderByCols.created;
        let order = Order.desc;

        if (Object.keys(OrderByCols).includes(orderByColIn as keyof typeof OrderByCols)) {
            colName = OrderByCols[orderByColIn as keyof typeof OrderByCols];
        }

        if (Object.keys(Order).includes(asc_descIn  as keyof typeof Order)) {
            order = Order[asc_descIn as keyof typeof Order];
        }

        const controller = new PropertyController();

        const result = await controller.getPropertiesByZip(zip, offset, limit, { colName, order });

        return res.status(200).json(result);
    }

    async validateAreaQuery(req: Request, res: Response, next: NextFunction) {
        const {
            latMin: latMinIn,
            latMax: latMaxIn,
            lonMin: lonMinIn,
            lonMax: lonMaxIn,
        } = req.query;

        const latMin = Number(latMinIn);
        const latMax = Number(latMaxIn);
        const lonMin = Number(lonMinIn);
        const lonMax = Number(lonMaxIn);

        const validationErrors = [];

        if (!latMin)
            validationErrors.push('Missing required query parameter latMin');
        if (!latMax)
            validationErrors.push('Missing required query parameter latMax');
        if (!lonMin)
            validationErrors.push('Missing required query parameter lonMin');
        if (!lonMax)
            validationErrors.push('Missing required query parameter lonMax');
        

        if (validationErrors.length) {
            throw new BadRequestException(validationErrors);
        }

        next();
    }

    async getPropertiesByArea(req: Request, res: Response) {
        const { 
            offset: offsetIn,
            limit: limitIn,
            latMin: latMinIn,
            latMax: latMaxIn,
            lonMin: lonMinIn,
            lonMax: lonMaxIn,
            orderBy: orderByColIn = 'created',
            asc_desc: asc_descIn = 'desc',
        } = req.query;

        let colName = OrderByCols.created;
        let order = Order.desc;

        if (Object.keys(OrderByCols).includes(orderByColIn as keyof typeof OrderByCols)) {
            colName = OrderByCols[orderByColIn as keyof typeof OrderByCols];
        }

        if (Object.keys(Order).includes(asc_descIn  as keyof typeof Order)) {
            order = Order[asc_descIn as keyof typeof Order];
        }

        const latMin = Number(latMinIn);
        const latMax = Number(latMaxIn);
        const lonMin = Number(lonMinIn);
        const lonMax = Number(lonMaxIn);

        const offset = Number(offsetIn) || 0;
        const limit = Number(limitIn) || 20;


        const controller = new PropertyController();

        const result = await controller.getPropertiesByArea(latMin, latMax, lonMin, lonMax, offset, limit, { colName, order });

        return res.status(200).json(result);
    }

    async getPropertyById(req: Request, res: Response) {
        const { id } = req.params;

        const controller = new PropertyController();

        const result = await controller.getPropertyById(id);

        return res.status(200).json(result);
    }
}

export default PropertyRouter;