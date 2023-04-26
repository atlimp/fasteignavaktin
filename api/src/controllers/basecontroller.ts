import { IBaseController } from '../interfaces/interfaces';

class BaseController implements IBaseController {

    async ping(): Promise<string> {
        return 'pong';
    }
}

export default BaseController;