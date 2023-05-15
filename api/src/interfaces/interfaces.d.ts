import { Router } from 'express';
import { AndOrNone } from '../model/enums';

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

export interface OrderBy {
    colName: string;
    order: string;
}

export interface WhereCol {
    col: string;
    operator: string;
    val: any;
    andOr: AndOrNone;
}