import express, { Request, Response, Router } from 'express';
import ZipController from '../controllers/zipcontroller';
import { IBaseRouter } from '../interfaces/interfaces';
import { catchAllErrors } from '../util/util';

class ZipRouter implements IBaseRouter {

    path = '/zip';
    
    router: Router = express.Router();
    
    constructor() {
        this.initMiddleware();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/all', catchAllErrors(this.getAllZipCodes));
        this.router.get('/:zip', catchAllErrors(this.getZipCode));
    }

    initMiddleware() {
    }
    
    async getAllZipCodes(req: Request, res: Response) {
        const controller = new ZipController();

        const result = await controller.getAllZipCodes();

        return res.status(200).json(result);
    }

    async getZipCode(req: Request, res: Response) {
        const { zip } = req.params;

        const controller = new ZipController();

        const result = await controller.getZipCode(zip);

        return res.status(200).json(result);
    }
}

export default ZipRouter;