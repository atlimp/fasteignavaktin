import HttpException from './/httpexception';

class UnauthorizedException extends HttpException {
    constructor(msg: string) {
        super(401, msg);
    }
}

export default UnauthorizedException;