import express, { Request, Response, Router } from 'express';
import BaseController from '../controllers/basecontroller';
import { IBaseRouter } from '../interfaces/interfaces';
import { catchAllErrors } from '../util/util';

class BaseRouter implements IBaseRouter {

    path = '/';
    
    router: Router = express.Router();
    
    constructor() {
        this.initMiddleware();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', catchAllErrors(this.ping));
    }

    initMiddleware() {
    }
    
    async ping(req: Request, res: Response) {
        const controller = new BaseController();

        const result = await controller.ping();

        return res.status(200).json(result);
    }
}

export default BaseRouter;