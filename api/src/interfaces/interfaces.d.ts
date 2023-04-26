import { Router } from 'express';

export interface IBaseController {
}

export interface IBaseRouter {
    initRoutes(): any;
    initMiddleware(): any;
    path: string;
    router: Router;
}

export interface IBaseService {

}