import HttpException from './httpexception';

class NotFoundException extends HttpException {
    constructor(resource = '') {
        super(404, `${resource === '' ? 'Resource' : resource} not found`);
    }
}

export default NotFoundException;